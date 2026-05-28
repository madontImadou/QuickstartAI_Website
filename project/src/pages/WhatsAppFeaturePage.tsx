import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart2,
  BookOpen,
  Bot,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  Database,
  MessageSquare,
  Mic,
  Phone,
  Settings,
  ShoppingBag,
  Smartphone,
  TrendingUp,
  UserCheck,
  Users,
  Zap,
} from 'lucide-react';
import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import DemoModal from '../components/DemoModal';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { cn } from '../lib/utils';

type IconCard = {
  icon: ReactNode;
  title: string;
  description: string;
  meta?: string;
};

const stats = [
  { value: '2B+', label: 'WhatsApp Nutzer' },
  { value: '100M+', label: 'Business Messages pro Tag' },
  { value: '98%', label: 'Öffnungsrate' },
  { value: '24/7', label: 'Automatisierung' },
];

const automationFeatures: IconCard[] = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Sofortantworten',
    description:
      'KI-Agenten beantworten FAQs, Supportanfragen und Produktfragen automatisch in WhatsApp Business.',
    meta: 'Instant replies',
  },
  {
    icon: <UserCheck className="h-6 w-6" />,
    title: 'Live Agent Handoff',
    description:
      'Laufende Chats werden bei Bedarf an Mitarbeiter übergeben, inklusive Kontext, Status und Rückgabe an die KI.',
    meta: 'Human takeover',
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Knowledge Base & NLP',
    description:
      'Dokumente, URLs, FAQs und Custom Content trainieren den Agenten auf natürliche, markenkonforme Antworten.',
    meta: 'Natural language',
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: 'Terminbuchung',
    description:
      'Google Calendar prüft Verfügbarkeiten, blockt Termine und sendet automatische Bestätigungen und Erinnerungen.',
    meta: 'Calendar sync',
  },
  {
    icon: <BarChart2 className="h-6 w-6" />,
    title: 'Analytics Dashboard',
    description:
      'Conversion Tracking, Antwortzeiten, Retention und Teamleistung werden in Echtzeit sichtbar.',
    meta: 'KPI view',
  },
  {
    icon: <Mic className="h-6 w-6" />,
    title: 'Voice Transcription',
    description:
      'Sprachnachrichten werden automatisch transkribiert, verstanden und intelligent beantwortet.',
    meta: 'Audio ready',
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: 'CRM Integration',
    description:
      'Kontakte synchronisieren, Leads speichern und Pipeline Updates an HubSpot, Salesforce oder Zapier senden.',
    meta: 'Lead ops',
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: 'Shared Inbox',
    description:
      'Team Inbox für offene Chats, Prioritäten, interne Notizen und klare Zuständigkeiten.',
    meta: 'Team inbox',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Multi-Agent Support',
    description:
      'Mehrere Agenten, Rollen und Rechte für Sales, Support, Operations und Management.',
    meta: 'Roles',
  },
  {
    icon: <Settings className="h-6 w-6" />,
    title: 'Workflow Automation',
    description:
      'Trigger, Bedingungen und eventbasierte Aktionen verbinden WhatsApp mit Kalender, CRM und Teamtools.',
    meta: 'Triggers',
  },
];

const integrations = [
  { name: 'WhatsApp', label: 'Business API', tone: 'emerald', image: '/whatsappBild.jpg' },
  { name: 'Google Calendar', label: 'Availability', tone: 'sky', image: '/googleCalanderpic.png' },
  { name: 'HubSpot', label: 'CRM Leads', tone: 'orange' },
  { name: 'Salesforce', label: 'Pipeline', tone: 'blue' },
  { name: 'Zapier', label: 'Automation', tone: 'amber' },
  { name: 'Slack', label: 'Team Alerts', tone: 'violet' },
  { name: 'Gmail', label: 'Follow-ups', tone: 'rose' },
  { name: 'Shopify', label: 'Commerce', tone: 'green', image: '/shopifyLogo.png' },
];

const workflowSteps = [
  {
    icon: <MessageSquare className="h-5 w-5" />,
    title: 'User schreibt',
    description: 'Eine Anfrage kommt per WhatsApp rein.',
  },
  {
    icon: <Bot className="h-5 w-5" />,
    title: 'AI antwortet',
    description: 'NLP erkennt Intent, Tonalität und nächste Aktion.',
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: 'CRM Update',
    description: 'Kontakt, Bedarf und Leadscore werden gespeichert.',
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: 'Kalenderprüfung',
    description: 'Google Calendar prüft freie Slots.',
  },
  {
    icon: <Calendar className="h-5 w-5" />,
    title: 'Terminbuchung',
    description: 'Der passende Slot wird gebucht.',
  },
  {
    icon: <CheckCircle className="h-5 w-5" />,
    title: 'Bestätigung',
    description: 'WhatsApp Reminder und Follow-up laufen automatisch.',
  },
];

const useCases: IconCard[] = [
  {
    icon: <ShoppingBag className="h-6 w-6" />,
    title: 'E-Commerce Support',
    description:
      'Bestellstatus, Retouren, Produktberatung und Versandfragen automatisch klären.',
    meta: 'Bis zu 70% weniger Tickets',
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Leadqualifizierung',
    description:
      'Inbound Leads qualifizieren, Kontaktdaten sammeln und Sales Calls buchen.',
    meta: 'Mehr qualifizierte Gespräche',
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: 'Appointment Scheduling',
    description:
      'Für Beratung, Kliniken, Salons und Services: buchen, verschieben und bestätigen.',
    meta: 'Direkt im Chat',
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: 'Real Estate & Services',
    description:
      'Objekte, Angebote und Erstgespräche automatisch vorsortieren und weiterleiten.',
    meta: 'Schnellere Übergabe',
  },
];

const dashboardStats = [
  { label: 'Conversations', value: '1.284', change: '+18%' },
  { label: 'Leads', value: '342', change: '+31%' },
  { label: 'Booked Calls', value: '96', change: '+24%' },
  { label: 'Conversion', value: '38%', change: '+9%' },
];

const inboxItems = [
  { name: 'Mara K.', topic: 'Demo-Termin', status: 'AI booked', score: '92' },
  { name: 'Jonas M.', topic: 'Shopify Support', status: 'Team inbox', score: '76' },
  { name: 'Helena S.', topic: 'CRM Angebot', status: 'Handoff', score: '88' },
];

const faqs = [
  {
    question: 'Wie funktioniert WhatsApp Business mit QuickStartAI?',
    answer:
      'Der Agent wird mit WhatsApp Business verbunden und beantwortet eingehende Nachrichten anhand Ihrer Wissensbasis, Regeln und Integrationen. Er kann Leads erfassen, Termine buchen und Chats an Ihr Team übergeben.',
  },
  {
    question: 'Kann die KI wirklich natürliche Antworten schreiben?',
    answer:
      'Ja. Der Agent nutzt natürliche Sprachverarbeitung, erkennt Absicht und Kontext und antwortet in einem Ton, der zu Ihrem Unternehmen passt. Für kritische Fälle kann ein Live Agent übernehmen.',
  },
  {
    question: 'Wie läuft die Kalenderintegration ab?',
    answer:
      'Der Agent prüft freie Zeiten in Google Calendar, schlägt passende Slots vor, bucht den Termin und sendet Bestätigung sowie Erinnerungen direkt in WhatsApp.',
  },
  {
    question: 'Welche CRM-Systeme lassen sich anbinden?',
    answer:
      'Kontakte, Leads und Pipeline Updates können unter anderem an HubSpot, Salesforce, Zapier oder individuelle Webhooks übergeben werden.',
  },
  {
    question: 'Unterstützt die Plattform mehrere Teammitglieder?',
    answer:
      'Ja. Shared Inbox, Multi-Agent Support, Rollen und Rechte sorgen dafür, dass Sales, Support und Operations gemeinsam auf laufende Konversationen zugreifen können.',
  },
  {
    question: 'Welche Analytics bekomme ich?',
    answer:
      'Sie sehen Conversion KPIs, Antwortzeiten, aktive Agenten, Gesprächsvolumen, Leadqualität und Team Inbox Status in einem Dashboard.',
  },
];

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.65, ease: 'easeOut' },
} as const;

function setMetaDescription(content: string) {
  let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
  const previousContent = meta?.getAttribute('content') ?? null;
  const created = !meta;

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'description');
    document.head.appendChild(meta);
  }

  meta.setAttribute('content', content);

  return () => {
    if (created) {
      meta?.remove();
      return;
    }

    if (previousContent) {
      meta?.setAttribute('content', previousContent);
    }
  };
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div {...reveal} className="mx-auto mb-12 max-w-3xl text-center">
      <Badge>{eyebrow}</Badge>
      <h2 className="mt-5 text-3xl font-bold tracking-normal text-white md:text-5xl">{title}</h2>
      <p className="mt-5 text-lg leading-relaxed text-gray-300">{description}</p>
    </motion.div>
  );
}

function PageNav({ onContact }: { onContact: () => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src="/Firmenlogo-removebg-preview.png" alt="QuickStartAI Logo" className="h-12 w-auto" />
          <span className="text-lg font-bold text-white">QuickStartAI</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-gray-300 md:flex">
          <a href="#features" className="transition-colors hover:text-white">
            Features
          </a>
          <a href="#integrations" className="transition-colors hover:text-white">
            Integrationen
          </a>
          <a href="#workflow" className="transition-colors hover:text-white">
            Workflow
          </a>
          <a href="#dashboard" className="transition-colors hover:text-white">
            Dashboard
          </a>
          <a href="#faq" className="transition-colors hover:text-white">
            FAQ
          </a>
        </nav>

        <Button onClick={onContact} size="default">
          Beratung
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}

function HeroMockup() {
  const messages = [
    { side: 'in', text: 'Hallo, ich möchte eine Demo buchen. Habt ihr diese Woche Zeit?' },
    { side: 'out', text: 'Sehr gerne. Ich prüfe kurz freie Slots und qualifiziere die Anfrage.' },
    { side: 'out', text: 'Passt Mittwoch um 10:30 Uhr? Ich kann den Termin direkt bestätigen.' },
    { side: 'in', text: 'Ja, bitte buchen.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className="relative"
    >
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#e2642a]/25 via-emerald-400/10 to-cyan-400/10 blur-2xl" />
      <Card className="relative overflow-hidden rounded-[2rem] border-white/15 bg-gray-950/85">
        <div className="border-b border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-200">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-white">WhatsApp AI Agent</div>
                <div className="flex items-center gap-2 text-xs text-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  live, 24/7 aktiv
                </div>
              </div>
            </div>
            <Badge variant="green">Business API</Badge>
          </div>
        </div>

        <div className="space-y-4 p-5">
          {messages.map((message, index) => (
            <motion.div
              key={message.text}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + index * 0.18, duration: 0.4 }}
              className={cn('flex', message.side === 'out' ? 'justify-end' : 'justify-start')}
            >
              <div
                className={cn(
                  'max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg',
                  message.side === 'out'
                    ? 'bg-gradient-to-br from-[#e2642a] to-orange-600 text-white'
                    : 'bg-white/10 text-gray-100',
                )}
              >
                {message.text}
              </div>
            </motion.div>
          ))}

          <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:grid-cols-3">
            {['Leadscore 92', 'CRM synced', 'Termin bestätigt'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs text-gray-200">
                <CheckCircle className="h-4 w-4 text-emerald-300" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </Card>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-6 left-4 hidden rounded-2xl border border-white/10 bg-gray-950/90 p-4 shadow-2xl backdrop-blur-xl sm:block"
      >
        <div className="text-xs uppercase tracking-[0.2em] text-gray-500">Response time</div>
        <div className="mt-1 text-2xl font-bold text-white">0.8s</div>
      </motion.div>
    </motion.div>
  );
}

function FeatureCard({ feature, index }: { feature: IconCard; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
    >
      <Card className="h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#e2642a]/45 hover:bg-white/[0.06]">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e2642a]/15 text-orange-200">
            {feature.icon}
          </div>
          {feature.meta && <Badge variant="muted">{feature.meta}</Badge>}
        </div>
        <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
        <p className="mt-3 leading-relaxed text-gray-300">{feature.description}</p>
      </Card>
    </motion.div>
  );
}

function IntegrationCard({ integration, index }: { integration: (typeof integrations)[number]; index: number }) {
  const toneClasses: Record<string, string> = {
    emerald: 'from-emerald-400/25 to-emerald-600/10 text-emerald-100',
    sky: 'from-sky-400/25 to-sky-600/10 text-sky-100',
    orange: 'from-orange-400/25 to-orange-600/10 text-orange-100',
    blue: 'from-blue-400/25 to-blue-600/10 text-blue-100',
    amber: 'from-amber-400/25 to-amber-600/10 text-amber-100',
    violet: 'from-violet-400/25 to-violet-600/10 text-violet-100',
    rose: 'from-rose-400/25 to-rose-600/10 text-rose-100',
    green: 'from-green-400/25 to-green-600/10 text-green-100',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
    >
      <Card className="group h-full p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07]">
        <div
          className={cn(
            'mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br font-bold',
            toneClasses[integration.tone],
          )}
        >
          {integration.image ? (
            <img src={integration.image} alt={integration.name} className="h-8 w-8 rounded-lg object-cover" />
          ) : (
            integration.name.slice(0, 2)
          )}
        </div>
        <div className="font-semibold text-white">{integration.name}</div>
        <div className="mt-1 text-sm text-gray-400">{integration.label}</div>
      </Card>
    </motion.div>
  );
}

function WorkflowVisualization() {
  return (
    <div className="grid gap-4 lg:grid-cols-6">
      {workflowSteps.map((step, index) => (
        <motion.div
          key={step.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          className="relative"
        >
          {index < workflowSteps.length - 1 && (
            <div className="absolute left-[calc(100%-0.75rem)] top-10 hidden h-px w-8 bg-gradient-to-r from-[#e2642a]/60 to-transparent lg:block" />
          )}
          <Card className="h-full p-5">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-orange-200">
              {step.icon}
            </div>
            <div className="text-sm font-semibold text-white">{step.title}</div>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">{step.description}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function DashboardPreview() {
  return (
    <motion.div {...reveal}>
      <Card className="overflow-hidden border-white/15 bg-gray-950/85">
        <div className="border-b border-white/10 bg-white/[0.04] p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm text-gray-400">QuickStartAI Control Center</div>
              <h3 className="mt-1 text-2xl font-bold text-white">WhatsApp Automation Dashboard</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="green">Active Agents 12</Badge>
              <Badge variant="muted">Team Inbox 38</Badge>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-4">
          {dashboardStats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-sm text-gray-400">{item.label}</div>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-3xl font-bold text-white">{item.value}</span>
                <span className="text-sm font-semibold text-emerald-300">{item.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-5 p-5 pt-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">Conversations & Leads</div>
                <div className="text-sm text-gray-400">Live Pipeline mit Handoff Status</div>
              </div>
              <MessageSquare className="h-5 w-5 text-orange-200" />
            </div>

            <div className="space-y-3">
              {inboxItems.map((item) => (
                <div
                  key={item.name}
                  className="grid gap-3 rounded-xl border border-white/10 bg-gray-950/50 p-4 sm:grid-cols-[1fr_auto_auto]"
                >
                  <div>
                    <div className="font-semibold text-white">{item.name}</div>
                    <div className="text-sm text-gray-400">{item.topic}</div>
                  </div>
                  <Badge variant={item.status === 'Handoff' ? 'default' : 'muted'}>{item.status}</Badge>
                  <div className="text-sm text-gray-300">Score {item.score}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="font-semibold text-white">Response Metrics</div>
                <BarChart2 className="h-5 w-5 text-orange-200" />
              </div>
              {[
                { label: 'First response', value: '94%' },
                { label: 'Lead capture', value: '82%' },
                { label: 'Booked meetings', value: '64%' },
              ].map((metric) => (
                <div key={metric.label} className="mb-4 last:mb-0">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-gray-300">{metric.label}</span>
                    <span className="text-white">{metric.value}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: metric.value }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="h-full rounded-full bg-gradient-to-r from-[#e2642a] to-emerald-300"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="font-semibold text-white">Calendar</div>
                <Calendar className="h-5 w-5 text-orange-200" />
              </div>
              <div className="space-y-3 text-sm">
                {['10:30 Demo Call', '13:00 CRM Setup', '16:15 Support Handoff'].map((slot) => (
                  <div key={slot} className="flex items-center gap-3 rounded-xl bg-gray-950/50 p-3 text-gray-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-300" />
                    {slot}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function CTAForm({
  websiteUrl,
  onWebsiteUrlChange,
  onSubmit,
}: {
  websiteUrl: string;
  onWebsiteUrlChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="mx-auto flex max-w-2xl flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-xl sm:flex-row">
      <input
        type="text"
        value={websiteUrl}
        onChange={(event) => onWebsiteUrlChange(event.target.value)}
        placeholder="ihre-website.de"
        className="min-h-12 flex-1 rounded-xl border border-white/10 bg-gray-950/80 px-4 text-white outline-none transition focus:border-[#e2642a] focus:ring-2 focus:ring-[#e2642a]/30"
        aria-label="Website URL"
      />
      <Button type="submit" size="lg" className="sm:min-w-52">
        Demo-Agent sichern
        <ArrowRight className="h-5 w-5" />
      </Button>
    </form>
  );
}

function WhatsAppFeaturePage() {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'WhatsApp AI Agent | QuickStartAI';
    const restoreMeta = setMetaDescription(
      'Automatisieren Sie WhatsApp Business mit KI-Antworten, Leadqualifizierung, Kalenderbuchung, CRM Sync, Shared Inbox und Analytics.',
    );

    return () => {
      document.title = previousTitle;
      restoreMeta();
    };
  }, []);

  const handleDemoSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedUrl = websiteUrl.trim();
    if (!trimmedUrl) {
      alert('Bitte geben Sie eine Website-URL ein.');
      return;
    }

    const normalizedUrl = /^https?:\/\//i.test(trimmedUrl) ? trimmedUrl : `https://${trimmedUrl}`;

    try {
      new URL(normalizedUrl);
      setWebsiteUrl(normalizedUrl);
      setShowDemoModal(true);
    } catch {
      alert('Bitte geben Sie eine gültige Website-URL ein, z.B. https://ihre-website.de.');
    }
  };

  const scrollToWorkflow = () => {
    document.querySelector('#workflow')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <PageNav onContact={() => setShowContactForm(true)} />

      <main>
        <section className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(135deg,#030712_0%,#111827_42%,#1f2937_100%)]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:44px_44px] opacity-30" />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(226,100,42,0.12)_45%,rgba(16,185,129,0.08)_70%,transparent_100%)]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1fr_0.9fr] lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Badge variant="green">WhatsApp Business AI Agent</Badge>
              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-normal text-white md:text-6xl">
                Automatisieren Sie WhatsApp mit einem{' '}
                <span className="bg-gradient-to-r from-[#e2642a] via-orange-300 to-emerald-300 bg-clip-text text-transparent">
                  KI-Agenten, der verkauft und bucht.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl">
                Antworten, Leadqualifizierung, CRM Updates und Terminbuchung laufen direkt in WhatsApp. Ihr Team übernimmt nur, wenn es wirklich menschlich werden muss.
              </p>

              <div className="mt-8">
                <CTAForm
                  websiteUrl={websiteUrl}
                  onWebsiteUrlChange={setWebsiteUrl}
                  onSubmit={handleDemoSubmit}
                />
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button type="button" variant="secondary" size="lg" onClick={scrollToWorkflow}>
                  Workflow ansehen
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button type="button" variant="ghost" size="lg" onClick={() => setShowContactForm(true)}>
                  Beratung anfragen
                  <Phone className="h-5 w-5" />
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="mt-1 text-xs leading-snug text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <HeroMockup />
          </div>
        </section>

        <section id="features" className="bg-gray-950 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="WhatsApp Automation"
              title="Alles, was Sie für WhatsApp-Automatisierung brauchen"
              description="Die Struktur folgt der Referenz: direkte Antworten, Handoff, Wissensbasis, Terminbuchung, Analytics und Voice. Ergänzt um CRM, Shared Inbox, Teams und Workflows."
            />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {automationFeatures.map((feature, index) => (
                <FeatureCard key={feature.title} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="integrations" className="border-y border-white/10 bg-gray-900/80 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="40+ Integrationen"
              title="Verbindet WhatsApp mit Ihrem bestehenden Stack"
              description="Kalender, CRM, Commerce, Team Alerts und Automatisierung greifen ineinander, ohne externe Referenz-Assets oder Hotlinks."
            />

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {integrations.map((integration, index) => (
                <IntegrationCard key={integration.name} integration={integration} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="bg-gray-950 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Workflow Visualization"
              title="Vom WhatsApp-Chat zur bestätigten Buchung"
              description="Der Agent versteht die Nachricht, entscheidet die nächste Aktion und aktualisiert Kalender, CRM und Team Inbox automatisch."
            />
            <WorkflowVisualization />
          </div>
        </section>

        <section id="dashboard" className="border-y border-white/10 bg-[linear-gradient(135deg,#111827_0%,#030712_55%,#17201b_100%)] px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Dashboard Preview"
              title="Konversationen, Leads, Kalender und KPIs in einem Blick"
              description="Ein modernes Control Center für aktive Agenten, Team Inbox, Conversion Tracking und Response Metrics."
            />
            <DashboardPreview />
          </div>
        </section>

        <section className="bg-gray-950 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Use Cases"
              title="WhatsApp AI Agents für reale Geschäftsprozesse"
              description="Support, Leadqualifizierung, Terminbuchung und Service-Prozesse werden in einem einzigen Kanal zusammengeführt."
            />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {useCases.map((useCase, index) => (
                <FeatureCard key={useCase.title} feature={useCase} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="border-y border-white/10 bg-gray-900/80 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              eyebrow="FAQ"
              title="Häufige Fragen zur WhatsApp-Automatisierung"
              description="Die Themen folgen der Referenzstruktur und decken WhatsApp Business, KI-Antworten, Kalender, CRM, Team Support und Analytics ab."
            />

            <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="bg-gray-950 px-4 py-24 sm:px-6 lg:px-8">
          <motion.div
            {...reveal}
            className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(226,100,42,0.18),rgba(16,185,129,0.10),rgba(255,255,255,0.04))] p-8 text-center shadow-2xl shadow-black/30 md:p-12"
          >
            <Badge variant="green">Ready to automate WhatsApp?</Badge>
            <h2 className="mt-5 text-3xl font-bold text-white md:text-5xl">
              Starten Sie Ihren WhatsApp AI Agent in wenigen Tagen.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-300">
              QuickStartAI richtet den Agenten ein, verbindet Kalender und CRM und bereitet den Live Handoff für Ihr Team vor.
            </p>
            <div className="mt-8">
              <CTAForm
                websiteUrl={websiteUrl}
                onWebsiteUrlChange={setWebsiteUrl}
                onSubmit={handleDemoSubmit}
              />
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-300">
              {['Keine Kreditkarte', 'DSGVO-bewusstes Setup', 'Persönliches Onboarding'].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-300" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-gray-950 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img src="/Firmenlogo-removebg-preview.png" alt="QuickStartAI Logo" className="h-12 w-auto" />
            <div>
              <div className="font-bold">QuickStartAI</div>
              <div className="text-sm text-gray-400">KI-Agenten für WhatsApp, Website und Telefon.</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-gray-400">
            <Link to="/sales" className="hover:text-white">
              Preise
            </Link>
            <Link to="/blog" className="hover:text-white">
              Blog
            </Link>
            <Link to="/impressum" className="hover:text-white">
              Impressum
            </Link>
            <Link to="/datenschutz" className="hover:text-white">
              Datenschutz
            </Link>
          </div>
        </div>
      </footer>

      {showDemoModal && <DemoModal websiteUrl={websiteUrl} onClose={() => setShowDemoModal(false)} />}
      {showContactForm && <ContactForm onClose={() => setShowContactForm(false)} />}
    </div>
  );
}

export default WhatsAppFeaturePage;
