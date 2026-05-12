# Blog-Artikel erstellen

Du erstellst einen vollständigen, SEO-optimierten deutschen Blogbeitrag für QuickStartAI.
Folge exakt diesem Ablauf — kein Schritt darf übersprungen werden.

## Eingabe

Keyword oder Thema: $ARGUMENTS

---

## Schritt 1 — Keyword-Cluster generieren

Führe das Cluster-Script aus:

```bash
node scripts/generate-keyword-cluster.js Keywords.csv "$ARGUMENTS"
```

Lies die generierte `Keyword-Cluster_*.md` Datei vollständig. Merke dir:
- Alle Keywords (für das `keywords`-Prop)
- SERP Features (FAQ nötig? Video? Featured Snippet?)
- Empfohlene Meta Title + Description
- Pexels-Suchbegriff
- Ziel-URL (slug)

---

## Schritt 2 — Pexels-Bilder suchen

Hole 10 Bilder mit dem Pexels-Suchbegriff aus dem Cluster:

```bash
curl -s -H "Authorization: $PEXEL_API" \
  "https://api.pexels.com/v1/search?query=PEXELS_SUCHBEGRIFF&per_page=10&orientation=landscape" \
  | node -e "const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')); d.photos.forEach((p,i)=>console.log(i+1, p.photographer, p.src.original))"
```

Wähle 3–4 Bilder aus (Qualität, Relevanz, dunkle Farbpalette passend zur Website):
- 1× Hero-Bild (erster eindruck, am stärksten)
- 2–3× In-Article-Bilder (je Hauptabschnitt)

Baue die URLs mit den richtigen Größen:
- 480w: `?auto=compress&cs=tinysrgb&w=480&h=333&fit=crop`
- 940w: `?auto=compress&cs=tinysrgb&w=940&h=650&fit=crop`
- OG: `?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop`

---

## Schritt 3 — Referenzdateien lesen

Lies diese Dateien vollständig, bevor du eine Zeile schreibst:

1. `references/humour.md` — Ton, Humor-Regeln, Anti-Patterns
2. `references/voice.md` — Markenstimme, verbotene Wörter
3. `references/options.md` — Meinungen und Standpunkte von Max

Internalisiere die Stimme: Web- und Backend-Developer, der vor 3 Jahren KI-Nerd wurde.
Direkt, trocken, kein Ausrufezeichen, kein Emoji, Selbstironie ja — Leser-Ironie nein.

---

## Schritt 4 — TSX-Datei erstellen

Erstelle `src/pages/Blog[Slug].tsx` mit exakt dieser Struktur:

```tsx
import BlogTemplate from '../components/BlogTemplate';
// Weitere Imports (Link, Icons aus lucide-react) nach Bedarf

const faqs = [
  { q: '...', a: '...' },
  // 5–7 Fragen aus Google "People Also Ask"
];

const toc = [
  // 6–8 Abschnitte
];

export default function Blog[PascalCaseSlug]() {
  return (
    <BlogTemplate
      slug="[slug]"
      pageTitle="[Title 50–60 Zeichen] | QuickStartAI"
      metaDesc="[150–160 Zeichen]"
      ogDesc="[Variante der metaDesc]"
      ogImage="[OG-URL vom Hero-Bild]"
      publishDate="[YYYY-MM-DD]"
      modifiedDate="[YYYY-MM-DD]"
      publishDateFormatted="[DD. Monat YYYY]"
      keywords="[alle Keywords kommagetrennt]"
      category="KI-Automatisierung"
      readingTime="~10 Min."
      articleTitle={<><strong>[Keyword]</strong>: [Untertitel]</>}
      intro={<>[2–3 Sätze. Stimme: web-dev-turned-KI-Nerd. Direkt, kein Hype.]</>}
      heroImage={{
        src: '[480w URL]',
        srcSet: '[480w URL] 480w, [940w URL] 940w',
        sizes: '(max-width: 768px) 100vw, 940px',
        alt: '[Beschreibend + Keyword]',
        width: 940, height: 650,
        credit: '[Fotograf]',
      }}
      featuredSnippet={{
        primary: '[Eine-Satz-Antwort auf die Kernfrage — Google Featured Snippet Format]',
        secondary: '[2–3 Sätze Ergänzung]',
      }}
      toc={toc}
      faqs={faqs}
      conclusion={<>[Fazit. Letzter Satz muss lächeln lassen.]</>}
    >
      {(_openContact) => (
        <>
          {/* Sections mit id="section-1" bis "section-N", className="mb-16 scroll-mt-24" */}
          {/* Jede Section: aria-labelledby="heading-N", h2 id="heading-N" */}
        </>
      )}
    </BlogTemplate>
  );
}
```

**Pflichtregeln für den Inhalt:**
- Mindestens 1.500 Wörter Fließtext
- 3–5 Developer-Insider-Witze oder schiefe Vergleiche
- 2–3 selbstironische Einschübe (Max, nicht der Leser)
- 1–2 parenthetische Seitengedanken in Klammern
- Mindestens 3 interne Links: `/#features`, `/sales`, `/#usecases`
- Mindestens 2 externe Links mit `rel="noopener noreferrer"`
- Alle In-Article-Bilder: `loading="lazy"`, `width`/`height` gesetzt, beschreibender Alt-Text
- Verboten: Synergie, cutting-edge, revolutionär, disruption, gamechanger, Ausrufezeichen, Emojis

---

## Schritt 5 — App.tsx aktualisieren

```tsx
// Import hinzufügen (alphabetisch sortiert nach den anderen Blog-Imports):
import Blog[PascalCase] from './pages/Blog[PascalCase]';

// Route hinzufügen (nach den anderen Blog-Routen):
<Route path="/blog/[slug]" element={<Blog[PascalCase] />} />
```

---

## Schritt 6 — blogRegistry.ts aktualisieren

Füge den neuen Eintrag in `src/data/blogRegistry.ts` hinzu (neueste Artikel oben):

```ts
{
  slug: '[slug]',
  title: '[Titel wie im Artikel]',
  pageTitle: '[pageTitle wie im TSX]',
  metaDesc: '[metaDesc wie im TSX]',
  excerpt: '[Ein-Satz-Teaser für die /blog Übersichtsseite]',
  category: 'KI-Automatisierung',
  readingTime: '~10 Min.',
  publishDate: '[YYYY-MM-DD]',
  publishDateFormatted: '[DD. Monat YYYY]',
  heroImage: {
    src: '[480w URL]',
    srcSet: '[480w URL] 480w, [800w URL] 800w',
    sizes: '(max-width: 640px) 100vw, 640px',
    alt: '[Alt-Text]',
    width: 800, height: 500,
    credit: '[Fotograf]',
  },
  path: '/blog/[slug]',
},
```

---

## Schritt 7 — Build prüfen

```bash
npx tsc --noEmit && npm run build
```

Beide müssen ohne Fehler durchlaufen. Wenn TypeScript-Fehler auftreten, sofort beheben.

---

## Qualitätskontrolle (intern, nicht ausgeben)

Vor der Fertigmeldung selbst prüfen:

**Inhalt:**
- [ ] Stimme klingt nach Max, nicht nach Produktbroschüre
- [ ] Abschluss lässt lächeln
- [ ] Keine verbotenen Wörter

**SEO:**
- [ ] H1 enthält Haupt-Keyword
- [ ] Featured Snippet vorhanden
- [ ] FAQ mit 5–7 Fragen
- [ ] Interne + externe Links vorhanden

**Technisch:**
- [ ] BlogTemplate verwendet
- [ ] Hero: fetchPriority="high" (via Template), loading="eager" (via Template)
- [ ] In-Article-Bilder: loading="lazy", width/height gesetzt
- [ ] TypeScript sauber
- [ ] Build grün
- [ ] App.tsx Route hinzugefügt
- [ ] blogRegistry.ts Eintrag hinzugefügt

---

Melde dich am Ende mit:
1. URL des neuen Artikels
2. Anzahl Wörter (geschätzt)
3. Welche SERP Features abgedeckt wurden
