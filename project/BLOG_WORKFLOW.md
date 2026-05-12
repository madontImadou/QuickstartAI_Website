# Blog Workflow: Von Keyword zu veröffentlichtem Artikel

Dieses Dokument beschreibt den kompletten Prozess — von Keywords.csv bis zum
live gegangenen, SEO-optimierten Blogbeitrag.

---

## Überblick (ca. 2–3 Stunden je Artikel)

```
1. Keyword auswählen
2. Keyword-Cluster generieren
3. Pexels-Bilder suchen
4. TSX-Datei anlegen (BlogTemplate nutzen)
5. Inhalt schreiben
6. App.tsx + blogRegistry.ts aktualisieren
7. Build prüfen + deployen
```

---

## Schritt 1 — Keyword aus Keywords.csv auswählen

Öffne `Keywords.csv` im Projekt-Root. Priorisierung:
- **Suchvolumen ≥ 500 / Monat**
- **Keyword Difficulty ≤ 40**
- **Intent: Informational** (für Blog-Artikel ideal)

Zeige alle verfügbaren Seed-Keywords:

```bash
node scripts/generate-keyword-cluster.js Keywords.csv
```

---

## Schritt 2 — Keyword-Cluster generieren

```bash
node scripts/generate-keyword-cluster.js Keywords.csv "ki agenten erstellen"
```

Das erzeugt: `Keyword-Cluster_ki-agenten-erstellen.md`

Darin enthalten:
- Alle Keywords mit Volumen, KD, CPC, Intent
- SERP-Features + Empfehlungen (FAQ nötig? Video einplanen? Featured Snippet?)
- Empfohlene Inhaltsstruktur
- Meta Title + Description Vorschlag
- Pexels-Suchbegriff
- TSX Starter-Code
- Checkliste vor Veröffentlichung

---

## Schritt 3 — Pexels-Bilder suchen

API-Key: in `.env` als `PEXEL_API`

```bash
curl -H "Authorization: $PEXEL_API" \
  "https://api.pexels.com/v1/search?query=artificial+intelligence+robot&per_page=10&orientation=landscape"
```

Auswahl-Kriterien:
- Hohe Auflösung (mindestens 1200px breit)
- Technisches, professionelles Motiv — kein Comic-Roboter, kein Stockfoto-Smile
- Passen zum Thema und zur dunklen Farbpalette der Website

Benötigte Versionen (Pexels URL-Params):
- **Hero 480w**: `?auto=compress&cs=tinysrgb&w=480&h=333&fit=crop`
- **Hero 940w**: `?auto=compress&cs=tinysrgb&w=940&h=650&fit=crop`
- **OG Image**: `?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop`
- **In-Article**: dieselben 480w/940w URLs

Fotografen-Namen aus der JSON-Response (`photos[i].photographer`) für den Credit notieren.

---

## Schritt 4 — TSX-Datei anlegen

1. Datei erstellen: `src/pages/BlogPost[Slug].tsx`  
   (Slug in PascalCase, z.B. `BlogPostKiAutomatisierung.tsx`)

2. Den Starter-Code aus dem Cluster-Markdown kopieren und anpassen.

3. **Pflicht: `BlogTemplate` verwenden.** Nie die SEO-Boilerplate selbst schreiben.
   Das Template liefert automatisch:
   - Alle JSON-LD Schemas (Article, FAQPage, BreadcrumbList, Person)
   - OG-Tags, Twitter Card, Canonical-URL
   - Skip-to-content, Sticky CTA, Back-to-top
   - Breadcrumbs (sichtbar + itemScope)
   - Author-Bio + Trust Signals
   - Mid-Article CTA
   - Navigationsleiste

Minimal-Struktur einer neuen Datei:

```tsx
import BlogTemplate from '../components/BlogTemplate';

const faqs = [
  { q: 'Frage aus Google PAA?', a: 'Antwort.' },
  // 5–7 Fragen
];

const toc = [
  'Was ist [Thema]',
  'Wie es funktioniert',
  // ...
];

export default function BlogPostMeinThema() {
  return (
    <BlogTemplate
      slug="mein-thema"                           // URL: /blog/mein-thema
      pageTitle="Mein Thema: Guide 2025 | QuickStartAI"  // 50–60 Zeichen
      metaDesc="..."                              // 150–160 Zeichen
      ogDesc="..."
      ogImage="[PEXELS_OG_URL]"
      publishDate="2025-05-15"                   // ISO
      modifiedDate="2025-05-15"
      publishDateFormatted="15. Mai 2025"
      keywords="keyword 1, keyword 2"
      category="KI-Automatisierung"
      readingTime="~10 Min."
      articleTitle={<><strong>Haupt-Keyword</strong>: Untertitel</>}
      intro={<>Intro-Text. Direkt, trocken, kein Hype.</>}
      heroImage={{
        src: '[480w_URL]',
        srcSet: '[480w_URL] 480w, [940w_URL] 940w',
        sizes: '(max-width: 768px) 100vw, 940px',
        alt: 'Beschreibend + Keyword',
        width: 940, height: 650,
        credit: 'Pexels-Fotograf',
      }}
      featuredSnippet={{ primary: '...', secondary: '...' }}
      toc={toc}
      faqs={faqs}
      conclusion={<>Fazit.</>}
    >
      {(_openContact) => (
        <>
          <section id="section-1" className="mb-16 scroll-mt-24" aria-labelledby="heading-1">
            <h2 id="heading-1" className="text-3xl font-bold text-white mb-6">
              1. Was ist [Thema] wirklich
            </h2>
            {/* Inhalt */}
          </section>
          {/* Weitere Sections mit id="section-2", "section-3" usw. */}
        </>
      )}
    </BlogTemplate>
  );
}
```

---

## Schritt 5 — Inhalt schreiben

### Stimme + Ton (aus `references/humour.md` + `references/voice.md`)

- **Direkt.** Antwort zuerst, Erklärung danach.
- **Trocken.** Kein Ausrufezeichen. Keine Emojis.
- **Developer-Insider.** Max kommt aus Web- und Backend-Entwicklung, 3 Jahre KI-Praxis.
- **Selbstironie.** Auf sich selbst zeigen, nie auf den Leser.
- **Parenthetische Einschübe.** "(Das ist kein Werbeslogan. Das ist Erfahrung.)"
- **Abschluss, der lächeln lässt.**

Verbotene Wörter: Synergie, cutting-edge, revolutionär, disruption, gamechanger

### Humor-Dichte (je 1.500 Wörter)
- 3–5 schiefe Vergleiche oder Dev-Insider-Witze
- 2–3 selbstreferenzielle Einschübe
- 1–2 Klammer-Seitengedanken
- 1 Abschluss-Satz der lächeln lässt

### SEO-Inhalt-Anforderungen
- H1 enthält das Haupt-Keyword
- Featured-Snippet-Box direkt unter H1 (via `featuredSnippet` prop)
- Mindestens 3 interne Links: `/#features`, `/sales`, `/#usecases`
- Mindestens 2 externe Links (Fachdaten: McKinsey, Statista, offizielle API-Docs)
- Alt-Texte: beschreibend + Keyword (nicht keyword-stuffing)

---

## Schritt 6 — Routing + Registry

### 6a) `src/App.tsx`

```tsx
// Import hinzufügen (nach den anderen Blog-Imports):
import BlogPostMeinThema from './pages/BlogPostMeinThema';

// Route hinzufügen (nach den anderen Blog-Routen):
<Route path="/blog/mein-thema" element={<BlogPostMeinThema />} />
```

### 6b) `src/data/blogRegistry.ts`

```ts
{
  slug: 'mein-thema',
  title: 'Mein Thema: Untertitel',
  pageTitle: 'Mein Thema: Guide 2025 | QuickStartAI',
  metaDesc: '...',
  excerpt: 'Ein-Satz-Teaser für die Blog-Übersicht.',
  category: 'KI-Automatisierung',
  readingTime: '~10 Min.',
  publishDate: '2025-05-15',
  publishDateFormatted: '15. Mai 2025',
  heroImage: {
    src: '[480w_URL]',
    srcSet: '[480w_URL] 480w, [800w_URL] 800w',
    sizes: '(max-width: 640px) 100vw, 640px',
    alt: 'Alt-Text für Listing-Karte',
    width: 800, height: 500,
    credit: 'Fotograf',
  },
  path: '/blog/mein-thema',
},
```

---

## Schritt 7 — Build prüfen

```bash
npx tsc --noEmit    # TypeScript-Fehler
npm run build       # Production-Build
```

Beide müssen fehlerfrei durchlaufen.

---

## Hero-Video (optional)

Wenn ein Video vorhanden ist, an `BlogTemplate` übergeben:

```tsx
heroVideo={{
  src: '/videos/mein-thema-hero.mp4',   // Datei in public/videos/
  poster: '[PEXELS_480W_URL]',           // Fallback-Bild
  type: 'video/mp4',
}}
```

Das Video läuft autoplay, muted, loop — PageSpeed-freundlich.  
Empfohlen: max 5 MB, 1280×720 px, H.264.

---

## Keywords.csv erweitern

Neue Keywords einfach als neue Zeilen anhängen (gleiche Spaltenstruktur):

```
de,neues keyword,seed keyword,,,,,VOLUME,KD,CPC,DENSITY,RESULTS,Informational,"SERP Features","TREND",CLICK_POT,,
```

---

## Alle Dateien im Überblick

| Datei | Zweck |
|---|---|
| `Keywords.csv` | Keyword-Datenbank — hier neue Keywords eintragen |
| `scripts/generate-keyword-cluster.js` | Cluster + Starter-Code generieren |
| `Keyword-Cluster_*.md` | Ausgabe des Generators |
| `references/humour.md` | Ton + Humor-Guide |
| `references/voice.md` | Markenstimme |
| `references/options.md` | Meinungen + Standpunkte |
| `src/types/blog.ts` | TypeScript-Interfaces (BlogTemplateProps etc.) |
| `src/components/BlogTemplate.tsx` | Wiederverwendbares Template — **nie umgehen** |
| `src/data/blogRegistry.ts` | Blog-Index-Daten für /blog Listing |
| `src/pages/BlogIndex.tsx` | /blog Übersichtsseite |
| `src/pages/Blog*.tsx` | Individuelle Blog-Artikel |
| `src/App.tsx` | Routing |
