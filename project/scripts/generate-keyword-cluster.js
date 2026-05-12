#!/usr/bin/env node
/**
 * generate-keyword-cluster.js
 *
 * Usage:
 *   node scripts/generate-keyword-cluster.js Keywords.csv "ki agenten erstellen"
 *
 * If no seed keyword is given, groups all unique seeds and prints a summary.
 * Output is written to:  Keyword-Cluster_<slug>.md
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT   = resolve(__dir, '..');

// ── helpers ─────────────────────────────────────────────────────────────────

function slugify(str) {
  return str.toLowerCase().replace(/[äöüß]/g, c => ({ ä:'ae', ö:'oe', ü:'ue', ß:'ss' }[c]))
            .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function pexelsQuery(seed) {
  // Maps German seed keywords to good English Pexels search terms
  const map = {
    'ki agenten erstellen': 'artificial intelligence robot technology',
    'ki automatisierung':   'automation technology business',
    'chatbot erstellen':    'chatbot technology interface',
    'whatsapp bot':         'smartphone messaging app',
  };
  for (const [k, v] of Object.entries(map)) {
    if (seed.toLowerCase().includes(k)) return v;
  }
  return seed.replace(/ki|kI/g, 'ai').replace(/erstellen/g, 'create').trim();
}

function inferArticleTitle(seed) {
  // Very simple headline suggestions based on intent
  const s = seed.toLowerCase();
  if (s.includes('erstellen') || s.includes('bauen')) {
    return `${capitalise(seed)}: Schritt-für-Schritt-Anleitung ${new Date().getFullYear()}`;
  }
  if (s.includes('was ist') || s.includes('erklärt')) {
    return `${capitalise(seed)} – alles was du wissen musst`;
  }
  return `${capitalise(seed)}: Was wirklich funktioniert (und was nicht)`;
}

function capitalise(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── CSV parser ───────────────────────────────────────────────────────────────

function parseCsv(csvPath) {
  const raw   = readFileSync(csvPath, 'utf-8');
  const lines = raw.split('\n').filter(Boolean);
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

  return lines.slice(1).map(line => {
    // Handle quoted fields
    const cols = [];
    let cur = '', inQ = false;
    for (const ch of line) {
      if (ch === '"') { inQ = !inQ; continue; }
      if (ch === ',' && !inQ) { cols.push(cur.trim()); cur = ''; continue; }
      cur += ch;
    }
    cols.push(cur.trim());

    return Object.fromEntries(headers.map((h, i) => [h, cols[i] ?? '']));
  });
}

// ── cluster builder ──────────────────────────────────────────────────────────

function buildCluster(rows, targetSeed) {
  const seed   = targetSeed.toLowerCase();
  const group  = rows.filter(r => r['Seed keyword']?.toLowerCase() === seed || r['Keyword']?.toLowerCase() === seed);

  if (group.length === 0) {
    console.error(`No keywords found for seed: "${targetSeed}"`);
    console.error('Available seeds:', [...new Set(rows.map(r => r['Seed keyword']))].join(', '));
    process.exit(1);
  }

  // Sort by volume desc
  group.sort((a, b) => Number(b['Volume'] || 0) - Number(a['Volume'] || 0));

  const totalVol = group.reduce((s, r) => s + Number(r['Volume'] || 0), 0);
  const avgKD    = (group.reduce((s, r) => s + Number(r['Keyword Difficulty'] || 0), 0) / group.length).toFixed(0);
  const avgCPC   = (group.reduce((s, r) => s + Number(r['CPC (USD)'] || 0), 0) / group.length).toFixed(2);

  // Extract SERP features across all keywords
  const serpFeatures = [...new Set(group.flatMap(r =>
    (r['SERP Features'] || '').split(',').map(f => f.trim()).filter(Boolean)
  ))];

  const intents = [...new Set(group.map(r => r['Intent']).filter(Boolean))];

  const slug        = slugify(targetSeed);
  const title       = inferArticleTitle(targetSeed);
  const metaDesc    = `${capitalise(targetSeed)} – was wirklich funktioniert, welche Methoden es gibt und was die meisten falsch machen. Ein ehrlicher Guide aus der Praxis.`;
  const pexels      = pexelsQuery(targetSeed);
  const articlePath = `/blog/${slug}`;
  const fileName    = `BlogPost_${slug.split('-').map(capitalise).join('')}.tsx`;

  return { group, totalVol, avgKD, avgCPC, serpFeatures, intents, slug, title, metaDesc, pexels, articlePath, fileName, seed: targetSeed };
}

// ── markdown generator ───────────────────────────────────────────────────────

function generateMarkdown(c) {
  const date = new Date().toISOString().split('T')[0];
  const year = new Date().getFullYear();

  const keywordTable = c.group.map(r =>
    `| ${r['Keyword']} | ${r['Volume']} | ${r['Keyword Difficulty']} | ${r['CPC (USD)']} € | ${r['Intent'] || '–'} |`
  ).join('\n');

  const serpList = c.serpFeatures.map(f => `- ${f}`).join('\n');

  return `# Keyword-Cluster: "${c.seed}"
Generiert: ${date}

---

## Übersicht

| Metrik | Wert |
|---|---|
| Keywords im Cluster | ${c.group.length} |
| Gesamt-Suchvolumen | ${c.totalVol.toLocaleString('de')} / Monat |
| Durchschnittl. KD | ${c.avgKD} / 100 |
| Durchschnittl. CPC | ${c.avgCPC} € |
| Search Intent | ${c.intents.join(', ')} |

---

## Keywords

| Keyword | Volumen | KD | CPC | Intent |
|---|---|---|---|---|
${keywordTable}

---

## SERP Features (zu gewinnen)

${serpList || '– keine –'}

**Empfehlungen:**
${c.serpFeatures.includes('AI Overview') ? '- **AI Overview**: Klare Kurzantwort in den ersten 150 Wörtern (Featured-Snippet-Format)' : ''}
${c.serpFeatures.includes('People Also Ask') ? '- **People Also Ask**: FAQ-Sektion mit 5–7 Fragen aus Google PAA' : ''}
${c.serpFeatures.includes('Video Carousel') || c.serpFeatures.includes('Video') ? '- **Video**: Hero-Video oder eingebettetes YouTube-Video einplanen' : ''}
${c.serpFeatures.includes('Image Pack') ? '- **Image Pack**: Mindestens 3 hochwertige Alt-Text-optimierte Bilder' : ''}

---

## Empfohlene Struktur für den Artikel

### Ziel-URL
\`${c.articlePath}\`

### Titel-Vorschlag (50–60 Zeichen)
\`${c.title}\`

### Meta Description (150–160 Zeichen)
\`${c.metaDesc}\`

### Pexels-Suchbegriff (für Bilder)
\`${c.pexels}\`

### Dateiname (neues TSX)
\`src/pages/${c.fileName}\`

---

## Inhaltsstruktur (empfohlen)

Orientiere dich am bestehenden Artikel \`/blog/ki-agenten-erstellen\` als Template-Beispiel.

\`\`\`
H1: [Haupt-Keyword + Nutzversprechen]
├── Featured Snippet / Kurzantwort (Box)
├── Inhaltsverzeichnis
│
├── H2: Was ist [Thema] wirklich (Definition)
├── H2: Wie [Thema] funktioniert (Mechanik)
├── H2: [Typen / Varianten] im Vergleich
├── H2: [Methoden / Wege] im Vergleich
├── H2: Schritt-für-Schritt Anleitung
├── H2: Anwendungsbeispiele nach Branche
├── H2: Warum die meisten [Thema]-Projekte scheitern
│
├── Mid-Article CTA (BlogTemplate liefert das automatisch)
│
├── H2: FAQ (${c.serpFeatures.includes('People Also Ask') ? '7 PAA-Fragen aus Google – Pflicht!' : '5–7 Fragen'})
├── H2: Fazit
│
└── Autor-Bio + Trust Signals (BlogTemplate liefert das automatisch)
\`\`\`

---

## Bilder (Pexels)

Hole Bilder via curl (WebFetch unterstützt keine Auth-Header):

\`\`\`bash
curl -H "Authorization: $PEXEL_API" \\
  "https://api.pexels.com/v1/search?query=${encodeURIComponent(c.pexels)}&per_page=10&orientation=landscape"
\`\`\`

Zieldimensionen:
- **Hero**: 940×650 px (fetch_priority="high", loading="eager")
- **In-Article**: 940×650 px (loading="lazy")

---

## TSX Starter

Füge diese Datei als \`src/pages/${c.fileName}\` ein und ersetze die Platzhalter:

\`\`\`tsx
import BlogTemplate from '../components/BlogTemplate';

const faqs = [
  { q: 'Frage 1?', a: 'Antwort 1.' },
  // Weitere PAA-Fragen aus Google ergänzen
];

const toc = [
  'Was ist [Thema] wirklich',
  'Wie es technisch funktioniert',
  'Typen im Vergleich',
  'Methoden im Vergleich',
  'Schritt-für-Schritt-Anleitung',
  'Anwendungsbeispiele',
  'Warum die meisten scheitern',
];

export default function Blog${c.fileName.replace('.tsx', '').replace('BlogPost_', '')}() {
  return (
    <BlogTemplate
      slug="${c.slug}"
      pageTitle="${c.title} | QuickStartAI"
      metaDesc="${c.metaDesc}"
      ogDesc="[OG-Beschreibung, leicht variiert]"
      ogImage="[PEXELS_HERO_URL]"
      publishDate="${date}"
      modifiedDate="${date}"
      publishDateFormatted="[z.B. 15. Mai ${year}]"
      keywords="${c.group.map(r => r['Keyword']).join(', ')}"
      category="KI-Automatisierung"
      readingTime="~10 Min."
      articleTitle={<><strong>[Haupt-Keyword]</strong>: [Untertitel]</>}
      intro={<>[2–3 Sätze. Direkt, kein Hype. Stimme: web-dev-turned-KI-Nerd.]</>}
      heroImage={{
        src: '[PEXELS_480W_URL]',
        srcSet: '[PEXELS_480W_URL] 480w, [PEXELS_940W_URL] 940w',
        sizes: '(max-width: 768px) 100vw, 940px',
        alt: '[Beschreibender Alt-Text mit Keyword]',
        width: 940,
        height: 650,
        credit: '[Pexels-Fotograf]',
      }}
      featuredSnippet={{
        primary: '[Eine-Satz-Antwort auf die Hauptfrage]',
        secondary: '[2–3 Sätze Ergänzung]',
      }}
      toc={toc}
      faqs={faqs}
      conclusion={<>[Fazit-Text. Letzter Satz: lächeln lassen.]</>}
    >
      {(_openContact) => (
        <>
          {/* Section 1 */}
          <section id="section-1" className="mb-16 scroll-mt-24" aria-labelledby="heading-1">
            <h2 id="heading-1" className="text-3xl font-bold text-white mb-6">
              1. Was ist [Thema] wirklich
            </h2>
            {/* ... Inhalt ... */}
          </section>
          {/* Weitere Sections ... */}
        </>
      )}
    </BlogTemplate>
  );
}
\`\`\`

---

## Checkliste vor Veröffentlichung

### Inhalt
- [ ] Stimme: web-dev-turned-KI-Nerd (Humor, keine Buzzwords, direkt)
- [ ] Mindestens 3 Developer-Insider oder selbstironische Einschübe
- [ ] Parenthetische Einschübe (mindestens 2)
- [ ] Abschluss, der lächeln lässt
- [ ] Verbotene Wörter: Synergie, cutting-edge, revolutionär, disruption, gamechanger

### SEO Onpage
- [ ] H1 enthält Haupt-Keyword
- [ ] Meta Title 50–60 Zeichen
- [ ] Meta Description 150–160 Zeichen
- [ ] Featured-Snippet-Box (Kurzantwort) direkt nach H1
- [ ] FAQ-Sektion mit 5–7 Fragen (Person Also Ask)
- [ ] Interne Links zu /#features, /sales, /#usecases
- [ ] Externe Links mit rel="noopener noreferrer"

### Technisches SEO (via BlogTemplate — automatisch)
- [ ] BlogTemplate verwendet (alle JSON-LD Schemas inklusive)
- [ ] Article Schema mit datePublished + dateModified
- [ ] FAQPage Schema (aus faqs-Array)
- [ ] BreadcrumbList Schema
- [ ] Person/Author Schema
- [ ] OG-Tags + Twitter Card
- [ ] Canonical-URL
- [ ] Breadcrumbs (sichtbar + itemScope)
- [ ] Skip-to-content Link
- [ ] Sticky CTA + Back-to-top
- [ ] Author Bio + Trust Signals

### Bilder
- [ ] Hero: fetchPriority="high", loading="eager", width/height gesetzt
- [ ] In-Article: loading="lazy", width/height gesetzt
- [ ] Alt-Texte beschreibend + Keyword enthalten
- [ ] Pexels-Credit angegeben

### App.tsx
- [ ] Import hinzugefügt: \`import Blog... from './pages/Blog...';\`
- [ ] Route hinzugefügt: \`<Route path="${c.articlePath}" element={<Blog... />} />\`

### blogRegistry.ts
- [ ] Neuen Eintrag in \`src/data/blogRegistry.ts\` hinzugefügt
`;
}

// ── list all seeds ────────────────────────────────────────────────────────────

function listSeeds(rows) {
  const seeds = {};
  for (const r of rows) {
    const s = r['Seed keyword'] || r['Keyword'] || '';
    if (!s) continue;
    seeds[s] = (seeds[s] || 0) + Number(r['Volume'] || 0);
  }
  console.log('\nAvailable seed keywords:\n');
  for (const [s, vol] of Object.entries(seeds).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${vol.toLocaleString().padStart(8)} vol  –  ${s}`);
  }
  console.log('\nUsage: node scripts/generate-keyword-cluster.js Keywords.csv "<seed keyword>"\n');
}

// ── main ─────────────────────────────────────────────────────────────────────

const [,, csvArg, seedArg] = process.argv;

if (!csvArg) {
  console.error('Usage: node scripts/generate-keyword-cluster.js <csv-file> [seed-keyword]');
  process.exit(1);
}

const csvPath = resolve(ROOT, csvArg);
const rows    = parseCsv(csvPath);

if (!seedArg) {
  listSeeds(rows);
  process.exit(0);
}

const cluster  = buildCluster(rows, seedArg);
const md       = generateMarkdown(cluster);
const outFile  = resolve(ROOT, `Keyword-Cluster_${slugify(seedArg)}.md`);

writeFileSync(outFile, md, 'utf-8');
console.log(`\nCluster generated: ${outFile}`);
console.log(`  Keywords: ${cluster.group.length}`);
console.log(`  Total volume: ${cluster.totalVol.toLocaleString('de')} / month`);
console.log(`  Avg KD: ${cluster.avgKD}`);
console.log(`  Target URL: ${cluster.articlePath}`);
console.log(`  New file: src/pages/${cluster.fileName}`);
console.log('\nNext: follow BLOG_WORKFLOW.md to create the article.\n');
