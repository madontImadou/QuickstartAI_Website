import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  Settings,
  BookOpen,
  AlertTriangle,
  Cpu,
  Database,
  Wrench,
} from 'lucide-react';
import BlogTemplate from '../components/BlogTemplate';

const faqs = [
  {
    q: 'Was ist ein KI-Agent genau?',
    a: 'Ein KI-Agent ist Software, die eigenständig Aufgaben ausführt, Entscheidungen trifft und auf externe Systeme zugreift — ohne bei jedem Schritt manuelles Eingreifen zu brauchen. Er nutzt ein Sprachmodell, eine Wissensbasis und Tool-Zugriffe (APIs, CRM, Kalender), um echte Aktionen auszuführen. Kein Regelwerk. Keine fixen Skripte. Kontextbasiert.',
  },
  {
    q: 'Was kann ein KI-Agent tun?',
    a: 'Leads qualifizieren, Termine buchen, Support-Anfragen beantworten, Bestellstatus abrufen, CRM befüllen, Anrufe entgegennehmen, Dokumente zusammenfassen, interne Prozesse anstoßen. Kurzfassung: alles, was repetitiv ist, klar definiert werden kann und nicht zwingend menschliches Urteilsvermögen erfordert.',
  },
  {
    q: 'Wie erstelle ich einen KI-Agenten ohne Programmierkenntnisse?',
    a: 'Mit einer No-Code-Plattform. Du lädst deine Wissensbasis hoch (Dokumente, URLs, FAQs), konfigurierst Kanäle (WhatsApp, Website, Telefon) und definierst, welche Aktionen der Agent ausführen darf. Keine einzige Zeile Code nötig. Mit QuickStartAI ist ein erster Agent in unter 24 Stunden live.',
  },
  {
    q: 'Wie unterscheidet sich ein KI-Agent von einem normalen Chatbot?',
    a: 'Ein Chatbot folgt fixen Entscheidungsbäumen und gibt vordefinierte Antworten. Ein KI-Agent versteht natürliche Sprache, zieht Kontext aus einer Wissensbasis und führt echte Aktionen aus — er bucht Termine, aktualisiert CRM-Einträge, schickt Follow-up-Mails. Ein Chatbot antwortet. Ein Agent handelt.',
  },
  {
    q: 'Wie unterscheidet sich ein KI-Agent von traditionellen KI-Modellen?',
    a: 'Traditionelle KI-Modelle (Klassifikatoren, Predictive Models) lösen eine definierte Aufgabe mit Trainingsdaten. Ein KI-Agent ist generalistischer: Er nutzt ein LLM als Reasoning-Engine, kombiniert das mit Kontext und Tools, und kann flexibel auf neue Situationen reagieren — ohne neu trainiert zu werden.',
  },
  {
    q: 'Was kostet es, einen KI-Agenten zu erstellen?',
    a: 'No-Code-Plattformen starten ab 0 € (Freemium) bis einige Hundert Euro pro Monat. Ein Done-for-You-Setup liegt typischerweise zwischen 1.500 und 10.000 €, je nach Komplexität. Wenn eine Agentur nicht erklären kann, wie der Agent konkret Geld spart oder verdient — nicht kaufen.',
  },
  {
    q: 'Ist ein selbst erstellter KI-Agent DSGVO-konform?',
    a: 'Das hängt von der genutzten Plattform ab. Achte auf EU-Datenhaltung, Auftragsverarbeitungsverträge (AVV) und Transparenz gegenüber Nutzern. Professionelle Anbieter wie QuickStartAI stellen DSGVO-Konformität sicher und liefern AVV auf Anfrage.',
  },
];

const toc = [
  'Was ist ein KI-Agent wirklich',
  'Wie ein KI-Agent technisch funktioniert',
  'Die 5 Typen von KI-Agenten',
  'KI-Agenten erstellen: 4 Methoden im Vergleich',
  'Schritt-für-Schritt: So geht es in der Praxis',
  'Anwendungsbeispiele nach Branche',
  'Warum die meisten KI-Agenten scheitern',
];

export default function BlogKIAgentenErstellen() {
  return (
    <BlogTemplate
      slug="ki-agenten-erstellen"
      pageTitle="KI Agenten erstellen: Anleitung für 2025 | QuickStartAI"
      metaDesc="KI Agenten erstellen ohne Code: Was wirklich funktioniert, welche Methoden es gibt und warum die meisten Projekte scheitern. Von einem Praktiker erklärt."
      ogDesc="Wie du in unter 24 Stunden deinen ersten KI-Agenten live bringst – ohne Programmierkenntnisse und ohne leere Versprechen. Ein ehrlicher Guide aus der Praxis."
      ogImage="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop"
      publishDate="2025-05-12"
      modifiedDate="2025-05-12"
      publishDateFormatted="12. Mai 2025"
      keywords="KI Agenten erstellen, KI Agent erstellen, KI-Agenten, AI Agents, No-Code KI Agent"
      category="KI-Automatisierung"
      readingTime="~10 Min."
      articleTitle={
        <><strong>KI Agenten erstellen</strong>: Was wirklich funktioniert (und was nicht)</>
      }
      intro={
        <>
          <strong className="text-white">KI-Agenten erstellen</strong> klingt nach etwas, wofür man jahrelange KI-Theorie braucht.
          Ich habe keinen Informatikabschluss — ich komme aus der Web- und Backend-Entwicklung.
          Was ich habe: drei Jahre echte Praxis. Das reicht. Und was du brauchst, steht
          hier — inklusive der Dinge, über die andere Artikel lieber schweigen.
        </>
      }
      heroImage={{
        src: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=480&h=333&fit=crop',
        srcSet: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=480&h=333&fit=crop 480w, https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=940&h=650&fit=crop 940w',
        sizes: '(max-width: 768px) 100vw, 940px',
        alt: 'KI Agenten erstellen – Roboterhand greift in digitales Netzwerk, Symbol für KI-Technologie',
        width: 940,
        height: 650,
        credit: 'Tara Winstead',
      }}
      aboveFoldSecondaryText="4 Methoden im Vergleich"
      aboveFoldSecondaryHref="#section-4"
      featuredSnippet={{
        primary: 'Ein KI-Agent ist Software, die eigenständig Aufgaben ausführt und dabei auf externe Systeme zugreift — Kalender, CRM, APIs.',
        secondary: 'Um einen zu erstellen, brauchst du: ein Sprachmodell (LLM), eine Wissensbasis, Tool-Zugriffe auf deine Systeme und eine Plattform oder ein Framework, das das orchestriert. Mit modernen No-Code-Plattformen geht das in unter 24 Stunden live. Ohne eine einzige Zeile Code.',
      }}
      toc={toc}
      faqs={faqs}
      conclusion={
        <>
          <p className="text-gray-300 leading-relaxed mb-4">
            <strong className="text-white">KI-Agenten erstellen</strong> ist nicht das schwierige. Das Schwierige ist, sie vernünftig
            zu deployen — mit guter Wissensbasis, klarer Eskalationslogik und dem Willen,
            nach Go-live weiter zu optimieren.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            Unternehmen, die einen fokussierten Use Case wirklich live bringen, sehen ROI.
            Unternehmen, die sechs Monate Strategie betreiben und dann einen halbfertigen
            Prototypen deployen — meistens nicht.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Ein funktionierender KI-Agent diese Woche ist wertvoller als eine AI-Roadmap
            in sechs Monaten. Das ist keine Meinung. Das ist Erfahrung.
            (Zwei verschiedene Dinge, die zufällig gleich klingen.)
          </p>
        </>
      }
    >
      {(_openContact) => (
        <>
          {/* Section 1 */}
          <section id="section-1" className="mb-16 scroll-mt-24" aria-labelledby="heading-1">
            <h2 id="heading-1" className="text-3xl font-bold text-white mb-6">
              1. Was ist ein KI-Agent wirklich
            </h2>

            <p className="text-gray-300 leading-relaxed mb-4">
              Ein <strong className="text-white">KI-Agent</strong> ist kein Roboter. Er sitzt in keiner Fabrikhalle. Ehrlich gesagt ist er eher wie ein sehr gut trainierter Praktikant, der nie Urlaub nimmt, sich nie beim Mittagessen beschwert und nie vergisst, das CRM zu aktualisieren. (Ich meine das als Kompliment.)
            </p>

            <p className="text-gray-300 leading-relaxed mb-6">
              Technisch gesehen ist ein KI-Agent Software, die ein Large Language Model als Reasoning-Engine nutzt, um eigenständig Entscheidungen zu treffen und Aktionen auszuführen. Er liest Kontext, wählt das passende Tool, führt es aus, wertet das Ergebnis aus — und macht weiter. Ohne menschlichen Trigger bei jedem Schritt.
            </p>

            <p className="text-gray-300 leading-relaxed mb-8">
              Das Wichtigste: Ein KI-Agent ist kein Chatbot. Das ist kein Marketingsatz.
              Das ist ein technischer Unterschied, der über Erfolg oder Misserfolg entscheidet.
              Unternehmen, die das nicht verstehen, kaufen teure Demo-Ware und wundern sich sechs Monate später, warum nichts funktioniert.
            </p>

            <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6 mb-8" role="table" aria-label="Vergleich KI-Agent vs Chatbot">
              <h3 className="text-white font-semibold mb-5 text-lg">KI-Agent vs. Chatbot: Der entscheidende Unterschied</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm" aria-label="Merkmalsvergleich">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th scope="col" className="text-left text-gray-400 pb-3 pr-6 font-medium">Merkmal</th>
                      <th scope="col" className="text-left text-gray-400 pb-3 pr-6 font-medium">Chatbot</th>
                      <th scope="col" className="text-left text-[#e2642a] pb-3 font-medium">KI-Agent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                    {[
                      ['Sprachverständnis',    'Keywords, feste Regeln',       'Natürliche Sprache, Kontext'],
                      ['Antwortlogik',         'Vordefinierte Skripte',        'Dynamisch, situationsabhängig'],
                      ['Aktionen',             'Nur antworten',                'Buchen, aktualisieren, eskalieren'],
                      ['Integrationen',        'Keine oder begrenzt',          'CRM, Kalender, APIs, Datenbanken'],
                      ['Fehlerbehandlung',     'Fallback-Text',                'Übergabe mit Kontext an Menschen'],
                      ['Lernfähigkeit',        'Nur über Reprogrammierung',    'Über Wissensbasis aktualisierbar'],
                    ].map(([m, c, a], i) => (
                      <tr key={i}>
                        <td className="text-gray-300 py-3 pr-6 font-medium">{m}</td>
                        <td className="text-gray-500 py-3 pr-6">{c}</td>
                        <td className="text-white py-3">{a}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-6">
              Wenn dein "KI-Agent" keine Aktionen ausführen kann — keine APIs nutzt, keine
              Systeme aktualisiert, nichts bucht — dann ist das kein KI-Agent.
              Das ist Autocomplete mit Branding.
            </p>

            <p className="text-gray-300 leading-relaxed">
              Unsere <Link to="/#features" className="text-[#e2642a] hover:text-orange-400 transition-colors underline underline-offset-2">KI-Agenten auf WhatsApp, Website und Telefon</Link> führen echte Aktionen aus: Termine buchen, Leads qualifizieren, CRM befüllen — vollautomatisch.
            </p>

            <div className="rounded-2xl overflow-hidden mt-8">
              <img
                src="https://images.pexels.com/photos/8566526/pexels-photo-8566526.jpeg?auto=compress&cs=tinysrgb&w=480&h=333&fit=crop"
                srcSet="https://images.pexels.com/photos/8566526/pexels-photo-8566526.jpeg?auto=compress&cs=tinysrgb&w=480&h=333&fit=crop 480w, https://images.pexels.com/photos/8566526/pexels-photo-8566526.jpeg?auto=compress&cs=tinysrgb&w=940&h=650&fit=crop 940w"
                sizes="(max-width: 768px) 100vw, 940px"
                alt="Humanoider Roboter mit digitalem Gesicht – Symbol für moderne KI-Agenten-Technologie"
                width="940"
                height="650"
                className="w-full h-64 object-cover object-top"
                loading="lazy"
              />
              <p className="text-xs text-gray-600 mt-1 text-right">Foto: Kindel Media · Pexels</p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="section-2" className="mb-16 scroll-mt-24" aria-labelledby="heading-2">
            <h2 id="heading-2" className="text-3xl font-bold text-white mb-6">
              2. Wie ein KI-Agent technisch funktioniert
            </h2>

            <p className="text-gray-300 leading-relaxed mb-2">
              Hier ist der Teil, den die meisten Artikel überspringen — weil er technisch klingt.
              Er ist es nicht wirklich. (Ich komme aus der Web- und Backend-Entwicklung — nicht aus der Uni. Ich kann das beurteilen.)
            </p>
            <p className="text-gray-300 leading-relaxed mb-8">
              Jeder KI-Agent besteht aus denselben fünf Bausteinen. Laut aktuellem{' '}
              <a
                href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e2642a] hover:text-orange-400 transition-colors underline underline-offset-2"
                aria-label="McKinsey State of AI Report (öffnet in neuem Tab)"
              >
                McKinsey State of AI Report
              </a>{' '}
              nutzen bereits über 65 % der Unternehmen generative KI in mindestens einem Geschäftsbereich. Was sie unterscheidet: wie gut die Architektur gebaut ist.
            </p>

            <div className="space-y-4 mb-8">
              {[
                {
                  icon: <Cpu className="w-5 h-5 text-[#e2642a]" aria-hidden="true" />,
                  title: 'LLM (das Gehirn)',
                  desc: 'Das Sprachmodell — GPT-4o, Claude, Gemini oder ein Open-Source-Modell. Es versteht die Eingabe, entscheidet welches Tool zu nutzen ist und formuliert die Antwort. Das Modell ist nicht das System. Es ist ein Baustein davon.',
                },
                {
                  icon: <Database className="w-5 h-5 text-[#e2642a]" aria-hidden="true" />,
                  title: 'Wissensbasis (das Gedächtnis)',
                  desc: 'Deine Daten: Produktinfos, FAQs, interne Dokumente, Website-Inhalte. Der Agent greift darauf zu, bevor er antwortet. Ohne gute Wissensbasis halluziniert das Modell. 90 % der "KI-Probleme" sind eigentlich Wissensbasis-Probleme.',
                },
                {
                  icon: <Wrench className="w-5 h-5 text-[#e2642a]" aria-hidden="true" />,
                  title: 'Tools & APIs (die Hände)',
                  desc: 'Was der Agent tatsächlich tun kann: Kalender-Zugriff, CRM-Updates, E-Mail senden, Datenbank abfragen, Webhook auslösen. Ohne Tools hat der Agent nur eine Meinung. Mit Tools hat er Wirkung.',
                },
                {
                  icon: <BookOpen className="w-5 h-5 text-[#e2642a]" aria-hidden="true" />,
                  title: 'Prompting & Kontext (die Persönlichkeit)',
                  desc: 'Wie der Agent instruiert wird: Tonalität, Grenzen, Eskalationsregeln, Markensprache. Schlechtes Prompting ist der zweithäufigste Grund warum Agenten versagen. (Der häufigste ist schlechte Daten.)',
                },
                {
                  icon: <Settings className="w-5 h-5 text-[#e2642a]" aria-hidden="true" />,
                  title: 'Orchestrierung (der Ablauf)',
                  desc: 'Was passiert wann: Wann wird Tool A aufgerufen, wann an einen Menschen übergeben, wann eine Follow-up-Nachricht ausgelöst. Die Logik, die alles zusammenhält. Das ist der Teil, bei dem die meisten Implementierungen kaputtgehen.',
                },
              ].map((item, i) => (
                <div key={i} className="flex space-x-4 bg-gray-800/40 border border-gray-700/40 rounded-xl p-5">
                  <div className="w-10 h-10 bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-gray-300 leading-relaxed">
              Der lustige Teil ist: Die teuersten Systeme brechen meistens genau an diesen
              Stellen auseinander — nicht weil die KI schlecht ist, sondern weil niemand
              die Orchestrierung vernünftig gebaut hat.
            </p>
          </section>

          {/* Section 3 */}
          <section id="section-3" className="mb-16 scroll-mt-24" aria-labelledby="heading-3">
            <h2 id="heading-3" className="text-3xl font-bold text-white mb-6">
              3. Die 5 Typen von KI-Agenten
            </h2>

            <p className="text-gray-300 leading-relaxed mb-8">
              Nicht jeder Agent ist gleich. Welcher Typ für dein Business passt, hängt davon ab,
              was du automatisieren willst. Hier die fünf relevanten Kategorien:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                {
                  num: '01', title: 'Konversationeller Agent',
                  tag: 'Häufigster Einstieg', tagColor: 'bg-[#e2642a]/20 text-[#e2642a]',
                  desc: 'Antwortet auf Fragen, qualifiziert Leads, bucht Termine. Der klassische Kundenservice-Agent auf WhatsApp, Website oder Telefon. Geringer Aufwand, schneller ROI.',
                },
                {
                  num: '02', title: 'Copilot / Assistent',
                  tag: 'Intern', tagColor: 'bg-blue-500/20 text-blue-400',
                  desc: 'Unterstützt Mitarbeiter: E-Mails vorformulieren, CRM-Notizen erstellen, Dokumente zusammenfassen. Kein Außenkontakt, aber massiver Effizienzgewinn intern.',
                },
                {
                  num: '03', title: 'Autonomer Agent',
                  tag: 'Fortgeschritten', tagColor: 'bg-purple-500/20 text-purple-400',
                  desc: 'Führt mehrstufige Aufgaben eigenständig aus — ohne Trigger bei jedem Schritt. Hoher Aufwand in der Einrichtung, hohe Wirkung im Betrieb.',
                },
                {
                  num: '04', title: 'RAG-Agent (Wissens-Agent)',
                  tag: 'Dokumentenbasiert', tagColor: 'bg-green-500/20 text-green-400',
                  desc: 'Greift auf große Dokumentenmengen zu und beantwortet spezifische Fragen. Ideal für interne Wissensdatenbanken, Compliance-Dokumente, Produkthandbücher.',
                },
                {
                  num: '05', title: 'Multi-Agent-System',
                  tag: 'Komplex', tagColor: 'bg-yellow-500/20 text-yellow-400',
                  desc: 'Mehrere spezialisierte Agenten arbeiten zusammen. Skaliert gut, braucht aber solide Architektur. Nichts für den ersten Tag.',
                },
              ].map((type) => (
                <div key={type.num} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black text-gray-700" aria-hidden="true">{type.num}</span>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${type.tagColor}`}>
                      {type.tag}
                    </span>
                  </div>
                  <h3 className="text-white font-bold mb-2">{type.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{type.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-300 leading-relaxed">
              Empfehlung für den Einstieg: konversationeller Agent, klarer Use Case, ein Kanal.
              Wer mit Multi-Agent-Systemen anfängt, hat sich meistens selbst einen
              komplizierteren Job gebaut, als er hatte.
            </p>
          </section>

          {/* Section 4 */}
          <section id="section-4" className="mb-16 scroll-mt-24" aria-labelledby="heading-4">
            <h2 id="heading-4" className="text-3xl font-bold text-white mb-6">
              4. KI-Agenten erstellen: 4 Methoden im Vergleich
            </h2>

            <div className="rounded-2xl overflow-hidden mb-8">
              <img
                src="https://images.pexels.com/photos/16380905/pexels-photo-16380905.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Smartphone mit KI-Chatbot-App – KI-Agent per No-Code erstellen ohne Programmierkenntnisse"
                width="940"
                height="650"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <p className="text-xs text-gray-600 mt-1 text-right">Foto: Sanket Mishra · Pexels</p>
            </div>

            <p className="text-gray-300 leading-relaxed mb-8">
              Es gibt grundsätzlich vier Wege. Welcher passt, hängt von drei Fragen ab:
              Wie viel technisches Know-how ist intern vorhanden? Wie schnell soll es live gehen?
              Und wie viel Kontrolle brauchst du langfristig?
            </p>

            <div className="space-y-5">
              {[
                {
                  num: '01', title: 'No-Code-Plattform',
                  badge: 'Empfohlen für den Einstieg', badgeColor: 'bg-[#e2642a]/20 text-[#e2642a]',
                  time: 'Live in: Stunden bis 1 Tag',
                  pros: ['Kein Code', 'Fertige Integrationen', 'Günstig', 'Schnell live'],
                  cons: ['Weniger Flexibilität bei Spezialfällen'],
                  desc: 'Plattformen wie QuickStartAI, Voiceflow oder Botpress bieten visuelle Builder. Du lädst deine Wissensbasis hoch, konfigurierst Kanäle und der Agent ist einsatzbereit. Für die meisten KMUs ist das der richtige Einstieg.',
                  link: null,
                },
                {
                  num: '02', title: 'Automatisierungstools (Make.com, n8n)',
                  badge: 'Für technisch affine Teams', badgeColor: 'bg-blue-500/20 text-blue-400',
                  time: 'Live in: 1–3 Tage',
                  pros: ['Sehr flexibel', 'Viele Integrationen', 'Low-Code', 'Günstig'],
                  cons: ['Kein natives Konversations-UI', 'Schlechter für Echtzeit-Chats'],
                  desc: 'Make.com und n8n verbinden KI-Module (OpenAI, Claude) mit Webhooks, Datenbanken und externen APIs. Gut für interne Prozessautomatisierung. Weniger geeignet als Primärkanal für Kundenkommunikation.',
                  link: null,
                },
                {
                  num: '03', title: 'KI-Framework (LangChain, AutoGPT)',
                  badge: 'Für Entwickler', badgeColor: 'bg-purple-500/20 text-purple-400',
                  time: 'Live in: Wochen bis Monate',
                  pros: ['Maximale Kontrolle', 'Open Source', 'Custom Logic', 'Skalierbar'],
                  cons: ['Hoher Aufwand', 'Braucht Entwickler-Ressourcen'],
                  desc: 'Frameworks wie LangChain geben vollständige Kontrolle über Agentenlogik, Memory-Management und Tool-Calling. Sinnvoll wenn die Anforderungen wirklich komplex sind. Neunmal von zehn ist das Overengineering.',
                  link: null,
                },
                {
                  num: '04', title: 'Done-for-You Service',
                  badge: 'Kein interner Aufwand', badgeColor: 'bg-green-500/20 text-green-400',
                  time: 'Live in: 24–72 Stunden',
                  pros: ['Komplett-Setup', 'Experten-Training', 'Laufende Optimierung', 'Kein IT-Aufwand'],
                  cons: ['Externe Abhängigkeit (anfangs)'],
                  desc: 'Ein Anbieter richtet alles ein — Plattform, Wissensbasis, Integrationen, Training.',
                  link: { to: '/sales', text: 'Unsere Done-for-You Pakete und Preise ansehen' },
                },
              ].map((method) => (
                <div key={method.num} className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-3 flex-wrap gap-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl font-black text-gray-700" aria-hidden="true">{method.num}</span>
                      <div>
                        <h3 className="text-xl font-bold text-white">{method.title}</h3>
                        <span className="text-xs text-gray-500">{method.time}</span>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${method.badgeColor}`}>
                      {method.badge}
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-3 text-sm">{method.desc}</p>
                  {method.link && (
                    <p className="text-sm mb-3">
                      <Link to={method.link.to} className="text-[#e2642a] hover:text-orange-400 transition-colors underline underline-offset-2">
                        {method.link.text}
                      </Link>
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {method.pros.map((p, i) => (
                      <span key={i} className="flex items-center space-x-1 bg-gray-700/50 text-gray-300 text-xs px-3 py-1 rounded-full">
                        <CheckCircle className="w-3 h-3 text-[#e2642a]" aria-hidden="true" />
                        <span>{p}</span>
                      </span>
                    ))}
                    {method.cons.map((c, i) => (
                      <span key={i} className="flex items-center space-x-1 bg-gray-700/30 text-gray-500 text-xs px-3 py-1 rounded-full">
                        <span aria-hidden="true">–</span>
                        <span>{c}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5 */}
          <section id="section-5" className="mb-16 scroll-mt-24" aria-labelledby="heading-5">
            <h2 id="heading-5" className="text-3xl font-bold text-white mb-6">
              5. Schritt-für-Schritt: So geht es in der Praxis
            </h2>

            <p className="text-gray-300 leading-relaxed mb-8">
              Ich habe in den letzten drei Jahren genug Agenten gebaut und deployed um zu wissen:
              Der Prozess ist kürzer als gedacht. Die Fehler passieren immer an denselben Stellen.
              Hier der Ablauf, der funktioniert:
            </p>

            <ol className="space-y-5" aria-label="Schritt-für-Schritt Anleitung KI-Agent erstellen">
              {[
                {
                  step: '01', title: 'Use Case scharf definieren',
                  content: 'Nicht: "Wir wollen KI einsetzen." Sondern: "Wir wollen, dass eingehende WhatsApp-Anfragen automatisch qualifiziert werden und bei Interesse direkt ein Termin gebucht wird." Ein fokussierter Agent liefert messbare Ergebnisse. Ein generalistischer liefert generische Antworten.',
                  extra: null,
                },
                {
                  step: '02', title: 'Wissensbasis aufbauen',
                  content: 'Alle relevanten Inhalte zusammentragen: FAQs, Produktbeschreibungen, Preise, Prozesse, interne Richtlinien. Dokumente, URLs, manuelle Einträge. Die Qualität der Wissensbasis bestimmt die Qualität des Agenten. Das ist keine Metapher.',
                  extra: null,
                },
                {
                  step: '03', title: 'Plattform wählen und Kanäle verbinden',
                  content: null,
                  extra: (
                    <p className="text-gray-300 leading-relaxed">
                      Basierend auf Use Case und Ressourcen (siehe Abschnitt 4) die passende Plattform wählen. Dann Kanäle verbinden:{' '}
                      <a
                        href="https://business.whatsapp.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#e2642a] hover:text-orange-400 transition-colors underline underline-offset-2"
                        aria-label="WhatsApp Business API (öffnet in neuem Tab)"
                      >
                        WhatsApp Business API
                      </a>
                      , Website-Widget, Telefon-Integration. Danach: CRM anbinden, Kalender verbinden, Helpdesk konfigurieren — was der Agent tatsächlich braucht.
                    </p>
                  ),
                },
                {
                  step: '04', title: 'Eskalationslogik definieren',
                  content: 'Wann übergibt der Agent an einen Menschen — mit welchem Kontext, auf welchem Kanal, mit welcher Dringlichkeit. Dieser Schritt wird meistens übersprungen. Das ist der häufigste Grund warum Kunden am Ende frustriert sind.',
                  extra: null,
                },
                {
                  step: '05', title: 'Testen mit realen Szenarien',
                  content: 'Nicht nur Standardfragen testen. Edge Cases. Unklare Anfragen. Beschwerden. Sprach-Varianten. Wenn der Agent dabei konsistent performt, ist er bereit. Wenn nicht: Wissensbasis erweitern, Prompting anpassen, nochmal.',
                  extra: null,
                },
                {
                  step: '06', title: 'Live schalten und Daten auswerten',
                  content: 'Go live. Konversationen analysieren. Welche Fragen beantwortet der Agent falsch? Was fehlt in der Wissensbasis? Ein Agent, der nach Go-live nie angefasst wird, wird schlechter — nicht besser.',
                  extra: null,
                },
              ].map((step, i) => (
                <li key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-[#e2642a] text-sm font-bold">Schritt {step.step}</span>
                    <h3 className="text-white font-bold text-lg">{step.title}</h3>
                  </div>
                  {step.content && <p className="text-gray-300 leading-relaxed">{step.content}</p>}
                  {step.extra}
                </li>
              ))}
            </ol>
          </section>

          {/* Section 6 */}
          <section id="section-6" className="mb-16 scroll-mt-24" aria-labelledby="heading-6">
            <h2 id="heading-6" className="text-3xl font-bold text-white mb-6">
              6. Anwendungsbeispiele nach Branche
            </h2>

            <div className="rounded-2xl overflow-hidden mb-8">
              <img
                src="https://images.pexels.com/photos/7947841/pexels-photo-7947841.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Business-Strategie und Prozessautomatisierung – KI-Agenten für Unternehmen verschiedener Branchen"
                width="940"
                height="650"
                className="w-full h-56 object-cover"
                loading="lazy"
              />
              <p className="text-xs text-gray-600 mt-1 text-right">Foto: RDNE Stock project · Pexels</p>
            </div>

            <p className="text-gray-300 leading-relaxed mb-4">
              KI-Agenten funktionieren dort, wo repetitive Kommunikation und klare Prozesse
              aufeinandertreffen.
            </p>
            <p className="text-gray-300 leading-relaxed mb-8">
              Das ist in mehr Branchen der Fall als man denkt. Weitere{' '}
              <Link
                to="/#usecases"
                className="text-[#e2642a] hover:text-orange-400 transition-colors underline underline-offset-2"
              >
                Anwendungsfälle und Branchenbeispiele
              </Link>{' '}
              findest du auf der Hauptseite.
            </p>

            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  title: 'E-Commerce & Onlineshops',
                  metric: '70 % weniger Support-Tickets',
                  items: ['Bestellstatus direkt im Chat abrufen', 'Rückgabeprozesse automatisch starten', 'Produktfragen mit Wissensbasis beantworten', 'Proaktive Versandbenachrichtigungen'],
                },
                {
                  title: 'Lead-Generierung & Sales',
                  metric: '62 % schnellere Lead-Response',
                  items: ['Inbound-Leads sofort qualifizieren', 'Budget, Bedarf, Timeline abfragen', 'Demo-Termin direkt im Chat buchen', 'CRM automatisch befüllen'],
                },
                {
                  title: 'Gesundheit, Klinik & Beratung',
                  metric: '100 % automatisierte Terminbuchung',
                  items: ['Terminbuchung ohne Telefonanruf', 'Erinnerungen und Vorab-Infos automatisch versenden', 'Häufige Fragen zu Leistungen beantworten', 'Triage und Weiterleitung nach Dringlichkeit'],
                },
                {
                  title: 'Immobilien & Finanzdienstleistungen',
                  metric: 'Schnellere Abschlüsse',
                  items: ['Interessenten-Qualifizierung 24/7', 'Besichtigungstermine direkt vereinbaren', 'Exposés automatisch versenden', 'Finanzierungsanfragen vorqualifizieren'],
                },
              ].map((uc, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
                  <div className="text-[#e2642a] text-sm font-bold mb-1">{uc.metric}</div>
                  <h3 className="text-white font-bold text-lg mb-4">{uc.title}</h3>
                  <ul className="space-y-2">
                    {uc.items.map((item, j) => (
                      <li key={j} className="flex items-start space-x-2 text-gray-300 text-sm">
                        <ArrowRight className="w-4 h-4 text-[#e2642a] mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7 */}
          <section id="section-7" className="mb-16 scroll-mt-24" aria-labelledby="heading-7">
            <h2 id="heading-7" className="text-3xl font-bold text-white mb-6">
              7. Warum die meisten KI-Agenten scheitern
            </h2>

            <div className="bg-gray-800/40 border border-[#e2642a]/20 rounded-2xl p-6 mb-8" role="note">
              <p className="text-gray-300 leading-relaxed">
                Das hier ist der Abschnitt, den andere Artikel weglassen. Weil er unbequem ist.
                Die Europäische KI-Verordnung (EU AI Act) und{' '}
                <a
                  href="https://gdpr-info.eu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e2642a] hover:text-orange-400 transition-colors underline underline-offset-2"
                  aria-label="DSGVO Informationen (öffnet in neuem Tab)"
                >
                  DSGVO-Anforderungen
                </a>{' '}
                machen solide Implementierungen wichtiger denn je. Wer auf Demo-Ware setzt, hat ein Problem — nicht nur technisch, sondern auch rechtlich.
              </p>
            </div>

            <p className="text-gray-300 leading-relaxed mb-4">
              Die meisten KI-Agenten scheitern nicht, weil die Technologie schlecht ist.
            </p>
            <p className="text-gray-300 leading-relaxed mb-8">
              Sie scheitern, weil sie nie wirklich deployt werden. Oder weil sie deployt werden
              und drei Tage später kaputtgehen, weil sich ein CRM-Feld geändert hat.
            </p>

            <div className="space-y-4 mb-8">
              {[
                {
                  title: 'Demo-Ware statt Produktionssystem',
                  desc: 'Viele KI-Agenturen bauen Prototypen und nennen es Produkt. Ein Agent, der in der Präsentation perfekt funktioniert, aber bei echten Kundenanfragen abbricht — das ist kein Agent. Das ist ein teures Diashow.',
                },
                {
                  title: 'Schlechte oder fehlende Wissensbasis',
                  desc: '90 % der Antwortfehler entstehen nicht durch das Modell, sondern durch schlechten Kontext. Wenn der Agent keine verlässlichen Daten hat, erfindet er welche. Das nennt man Halluzination. Das Problem liegt fast immer in der Wissensbasis.',
                },
                {
                  title: 'Keine Eskalationslogik',
                  desc: 'Wenn dein Agent nicht weiß, wann er an einen Menschen übergeben soll — und wie — dann frustriert er Kunden mit dringenden oder komplexen Anliegen. Eskalation ist kein Fehler im System. Sie ist ein Feature.',
                },
                {
                  title: 'Kein Monitoring nach Go-live',
                  desc: 'Ein Agent, der nach dem Launch nie optimiert wird, wird schlechter. Nicht besser. Neue Fragen tauchen auf. Das Business ändert sich. Die Wissensbasis veraltet.',
                },
                {
                  title: 'Zu viel auf einmal',
                  desc: 'Multi-Channel, Multi-Agent, Multi-Integration — ab Tag eins. Das Ergebnis ist fast immer dasselbe: nichts davon funktioniert wirklich gut. Besser: ein Use Case, ein Kanal, live in dieser Woche.',
                },
              ].map((item, i) => (
                <div key={i} className="flex space-x-4 bg-gray-800/40 border border-gray-700/40 rounded-xl p-5">
                  <div className="w-10 h-10 bg-red-900/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6">
              <p className="text-white font-medium leading-relaxed mb-3">Was tatsächlich funktioniert:</p>
              <ul className="space-y-2" aria-label="Erfolgsfaktoren für KI-Agenten">
                {[
                  'Saubere Prozesse vor dem Deployment',
                  'Gute Wissensbasis, regelmäßig aktualisiert',
                  'Klare Eskalationsregeln mit Kontext-Übergabe',
                  'Monitoring-Setup vom ersten Tag an',
                  'Fokussierter Start, dann schrittweiser Ausbau',
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-2 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#e2642a] flex-shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </section>
        </>
      )}
    </BlogTemplate>
  );
}
