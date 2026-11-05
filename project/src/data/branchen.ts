import {
  BookOpen,
  Calendar,
  CalendarClock,
  Car,
  ClipboardList,
  GraduationCap,
  type LucideIcon,
  MessageCircle,
  Moon,
  RefreshCw,
  Send,
  Truck,
  Users,
} from 'lucide-react';

interface IconCard {
  icon: LucideIcon;
  title: string;
  text: string;
}

export interface BrancheContent {
  label: string;
  path: string;
  /** Icon im Branchen-Menü */
  navIcon: LucideIcon;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroAccent: string;
  heroText: string;
  heroPoints: string[];
  image: string;
  imageAlt: string;
  problemTitle: string;
  problems: IconCard[];
  howTitle: string;
  tryLines: string[];
  exampleTitle: string;
  exampleRows: [string, string][];
  featuresTitle: string;
  features: IconCard[];
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  closingTitle: string;
}

// Neue Branche: Eintrag hier ergänzen und Foto in public/ ablegen. Navigation,
// Route und Testanruf funktionieren automatisch, Sarah fragt selbst nach der Branche.
export const branchenPages: BrancheContent[] = [
  {
    label: 'Umzugsunternehmen',
    path: '/branchen/umzugsunternehmen',
    navIcon: Truck,
    metaTitle: 'KI-Telefonassistent für Umzugsunternehmen | QuickStartAI',
    metaDescription:
      'Die KI-Rezeptionistin für Umzugsunternehmen: nimmt jede Anfrage rund um die Uhr an und erfasst alle Daten fürs Angebot. Jetzt Testanruf anfordern.',
    eyebrow: 'Für Umzugsunternehmen',
    heroTitle: 'Ihr Team trägt Möbel.',
    heroAccent: 'Ihre KI nimmt die Anfrage an.',
    heroText:
      'Die KI-Rezeptionistin geht bei jedem Anruf ran, fragt alles ab, was Sie fürs Angebot brauchen, und gibt die Anfrage direkt an Ihr Büro weiter.',
    heroPoints: [
      'Rund um die Uhr erreichbar, auch am Wochenende',
      'Alle Angebotsdaten in einem Gespräch erfasst',
      'In der Regel innerhalb von 24 Stunden startklar',
    ],
    image: '/umzug-hero.webp',
    imageAlt: 'Lächelnder Umzugshelfer im Overall mit Klemmbrett zwischen Umzugskartons',
    problemTitle: 'Wer nicht rangeht, verliert den Auftrag an die nächste Firma.',
    problems: [
      {
        icon: Truck,
        title: 'Das Team ist im Einsatz',
        text: 'Während Ihre Leute Möbel tragen, klingelt im Büro das Telefon. Der Anrufer probiert es bei der nächsten Firma.',
      },
      {
        icon: Calendar,
        title: 'Die Leitung glüht zum Monatsende',
        text: 'Viele Umzüge fallen auf dieselben Tage. Genau dann kommen die meisten Anfragen und die wenigste Zeit fürs Telefon.',
      },
      {
        icon: Moon,
        title: 'Kunden planen nach Feierabend',
        text: 'Abends und am Wochenende kümmern sich viele um ihren Umzug. Ihr Büro ist dann längst geschlossen.',
      },
    ],
    howTitle: 'Eine Anfrage am Telefon, fertig für Ihr Angebot.',
    tryLines: [
      'Was kostet ein Umzug von München nach Berlin?',
      'Haben Sie Ende des Monats noch Kapazität?',
      'Können Sie auch die Küche abbauen?',
    ],
    exampleTitle: 'Neue Umzugsanfrage',
    exampleRows: [
      ['Name', 'Familie Schneider'],
      ['Auszug', 'München, 2. OG, kein Aufzug'],
      ['Einzug', 'Berlin, EG'],
      ['Größe', '3 Zimmer, ca. 75 qm'],
      ['Wunschtermin', '28. des Monats'],
      ['Zusatzleistungen', 'Küchenmontage, Halteverbotszone'],
    ],
    featuresTitle: 'Die Telefonarbeit, die Ihr Büro jeden Tag aufhält.',
    features: [
      {
        icon: ClipboardList,
        title: 'Anfragen vollständig aufnehmen',
        text: 'Start und Ziel, Wohnungsgröße, Etage, Aufzug, Wunschtermin und Zusatzleistungen. Nichts wird vergessen.',
      },
      {
        icon: MessageCircle,
        title: 'Fragen zu Ihren Leistungen beantworten',
        text: 'Packservice, Möbelmontage, Halteverbotszone oder Einlagerung: Sie antwortet mit den Infos Ihrer Firma.',
      },
      {
        icon: Calendar,
        title: 'Besichtigungen vereinbaren',
        text: 'Bei größeren Umzügen schlägt sie Termine für die Besichtigung vor und trägt sie in Ihren Kalender ein.',
      },
      {
        icon: RefreshCw,
        title: 'Änderungen entgegennehmen',
        text: 'Neuer Termin oder ein zusätzliches Möbelstück? Das Anliegen wird erfasst und an Ihr Büro weitergegeben.',
      },
      {
        icon: Send,
        title: 'Alles strukturiert übergeben',
        text: 'Nach jedem Gespräch liegt die Anfrage übersichtlich bei Ihnen. So können Sie direkt das Angebot erstellen.',
      },
      {
        icon: Users,
        title: 'An Ihr Team weiterleiten',
        text: 'Wenn ein Mensch gefragt ist, zum Beispiel bei einer Beschwerde, nimmt sie das Anliegen auf und veranlasst den Rückruf.',
      },
    ],
    faqTitle: 'Häufige Fragen von Umzugsunternehmen',
    faqs: [
      {
        question: 'Nennt die KI meinen Kunden Preise?',
        answer:
          'Nur wenn Sie das möchten. Standardmäßig erklärt sie, wovon der Preis abhängt, und nimmt die Anfrage für Ihr Angebot auf. Festpreise sagt sie nicht zu.',
      },
      {
        question: 'Merken die Anrufer, dass sie mit einer KI sprechen?',
        answer:
          'Ja. Sie stellt sich als KI-Rezeptionistin Ihrer Firma vor und bestätigt das auch auf Nachfrage. Wie natürlich das klingt, hören Sie am besten im Testanruf.',
      },
      {
        question: 'Bleibt meine Telefonnummer erhalten?',
        answer:
          'Ja. Sie leiten Anrufe auf die Empfangssoftware weiter, zum Beispiel immer oder nur dann, wenn niemand rangeht. Das legen wir gemeinsam fest.',
      },
      {
        question: 'Wie bekomme ich die Anfragen?',
        answer:
          'Das richten wir passend zu Ihrem Ablauf ein, etwa per E-Mail oder direkt in Ihrer Software. Im Gespräch klären wir, was Sie heute nutzen.',
      },
      {
        question: 'Wie aufwändig ist die Einrichtung?',
        answer:
          'Das Setup übernehmen wir gemeinsam mit Ihnen. Nach der Einrichtung ist die Empfangssoftware in der Regel innerhalb von 24 Stunden startklar.',
      },
    ],
    closingTitle: 'Keine Umzugsanfrage mehr verpassen.',
  },
  {
    label: 'Fahrschulen',
    path: '/branchen/fahrschulen',
    navIcon: Car,
    metaTitle: 'KI-Telefonassistent für Fahrschulen | QuickStartAI',
    metaDescription:
      'Die KI-Rezeptionistin für Fahrschulen: beantwortet Fragen zu Klassen und Kursen und nimmt Anmeldungen rund um die Uhr auf. Jetzt Testanruf anfordern.',
    eyebrow: 'Für Fahrschulen',
    heroTitle: 'Sie sitzen in der Fahrstunde.',
    heroAccent: 'Ihre KI geht ans Telefon.',
    heroText:
      'Die KI-Rezeptionistin beantwortet Fragen zu Klassen und Kursen, nimmt neue Fahrschüler auf und gibt alles geordnet an Sie weiter.',
    heroPoints: [
      'Rund um die Uhr erreichbar, auch während der Fahrstunde',
      'Neue Anmeldungen vollständig aufgenommen',
      'In der Regel innerhalb von 24 Stunden startklar',
    ],
    image: '/fahrschule-hero.webp',
    imageAlt: 'Lächelnde junge Fahrerin am Steuer, daneben eine Person auf dem Beifahrersitz',
    problemTitle: 'Wer nicht rangeht, verliert den Fahrschüler an die nächste Fahrschule.',
    problems: [
      {
        icon: GraduationCap,
        title: 'Fahrlehrer können nicht rangehen',
        text: 'Am Steuer und im Theorieunterricht bleibt das Telefon aus. Interessenten erreichen nur die Mailbox und rufen die nächste Fahrschule an.',
      },
      {
        icon: Moon,
        title: 'Die Bürozeiten sind kurz',
        text: 'Viele Fahrschulen haben nur wenige Stunden geöffnet. Ihre Fahrschüler melden sich aber nach Schule und Arbeit.',
      },
      {
        icon: MessageCircle,
        title: 'Immer wieder dieselben Fragen',
        text: 'Was kostet Klasse B, wann startet der nächste Kurs, was brauche ich für die Anmeldung? Das kostet jeden Tag Zeit.',
      },
    ],
    howTitle: 'Ein Anruf, und die Anmeldung liegt bei Ihnen.',
    tryLines: [
      'Was kostet der Führerschein Klasse B?',
      'Wann startet der nächste Theoriekurs?',
      'Kann ich auch einen Intensivkurs machen?',
    ],
    exampleTitle: 'Neue Anmeldung',
    exampleRows: [
      ['Name', 'Lena Hoffmann'],
      ['Klasse', 'B'],
      ['Alter', '19 Jahre'],
      ['Vorkenntnisse', 'Keine'],
      ['Sehtest & Erste Hilfe', 'Sehtest erledigt, Kurs offen'],
      ['Wunschstart', 'Nächster Theoriekurs'],
    ],
    featuresTitle: 'Die Telefonarbeit, die Ihnen neben den Fahrstunden fehlt.',
    features: [
      {
        icon: ClipboardList,
        title: 'Anmeldungen aufnehmen',
        text: 'Führerscheinklasse, Alter, Vorkenntnisse und Wunschstart. Alles, was Sie für den nächsten Schritt brauchen.',
      },
      {
        icon: MessageCircle,
        title: 'Standardfragen beantworten',
        text: 'Klassen, Kosten, Sehtest, Erste Hilfe oder begleitetes Fahren: Sie antwortet mit den Infos Ihrer Fahrschule.',
      },
      {
        icon: BookOpen,
        title: 'Über Kurse informieren',
        text: 'Interessenten erfahren, wann der nächste Theoriekurs beginnt und ob es Intensivkurse gibt.',
      },
      {
        icon: CalendarClock,
        title: 'Fahrstunden-Änderungen erfassen',
        text: 'Absagen und Verlegungswünsche nimmt sie auf und gibt sie direkt an Sie weiter.',
      },
      {
        icon: Send,
        title: 'Alles geordnet übergeben',
        text: 'Nach jedem Gespräch liegt die Anfrage übersichtlich bei Ihnen. Sie rufen nur noch zurück, wo es sich lohnt.',
      },
      {
        icon: Users,
        title: 'An Ihr Team weiterleiten',
        text: 'Wenn ein Mensch gefragt ist, zum Beispiel bei einer Beschwerde, nimmt sie das Anliegen auf und veranlasst den Rückruf.',
      },
    ],
    faqTitle: 'Häufige Fragen von Fahrschulen',
    faqs: [
      {
        question: 'Nennt die KI Preise für den Führerschein?',
        answer:
          'Nur die Preise, die Sie ihr geben, zum Beispiel Grundbetrag und Fahrstunde. Einen festen Gesamtpreis sagt sie nicht zu, weil der von der Zahl der Fahrstunden abhängt.',
      },
      {
        question: 'Merken die Anrufer, dass sie mit einer KI sprechen?',
        answer:
          'Ja. Sie stellt sich als KI-Rezeptionistin Ihrer Fahrschule vor und bestätigt das auch auf Nachfrage. Wie natürlich das klingt, hören Sie am besten im Testanruf.',
      },
      {
        question: 'Bleibt meine Telefonnummer erhalten?',
        answer:
          'Ja. Sie leiten Anrufe auf die Empfangssoftware weiter, zum Beispiel immer oder nur dann, wenn niemand rangeht. Das legen wir gemeinsam fest.',
      },
      {
        question: 'Funktioniert das auch für eine kleine Fahrschule?',
        answer:
          'Ja, gerade wenn Sie selbst viel im Auto sitzen und kein Büro besetzt ist. Welche Aufgaben sie übernimmt, stimmen wir auf Ihre Fahrschule ab.',
      },
      {
        question: 'Wie aufwändig ist die Einrichtung?',
        answer:
          'Das Setup übernehmen wir gemeinsam mit Ihnen. Nach der Einrichtung ist die Empfangssoftware in der Regel innerhalb von 24 Stunden startklar.',
      },
    ],
    closingTitle: 'Keinen Fahrschüler mehr verpassen.',
  },
];
