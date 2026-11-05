import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ChevronDown, Clock, Cpu, PhoneCall, ShieldCheck } from 'lucide-react';
import SiteNav from '../components/SiteNav';
import ContactForm from '../components/ContactForm';
import TestCallForm from '../components/TestCallForm';
import type { BrancheContent } from '../data/branchen';
import { openCookieSettings } from '../lib/consent';

const trustBadges = [
  {
    icon: ShieldCheck,
    title: 'DSGVO-konform',
    text: 'Anfragen und Gespräche werden nach den Vorgaben der DSGVO verarbeitet.',
  },
  {
    icon: Cpu,
    title: 'EU Artificial Intelligence Act',
    text: 'Transparent: Anrufer erfahren immer, dass sie mit einer KI sprechen.',
  },
];

const SectionHeading: React.FC<{ eyebrow: string; title: string; dark?: boolean }> = ({
  eyebrow,
  title,
  dark = false,
}) => (
  <div className="text-center mb-12">
    <div className="flex items-center justify-center gap-3 mb-6">
      <span className="h-px w-8 bg-[#e2642a]/50"></span>
      <span className="text-xs font-semibold tracking-widest text-[#e2642a] uppercase">
        {eyebrow}
      </span>
      <span className="h-px w-8 bg-[#e2642a]/50"></span>
    </div>
    <h2
      className={`font-serif italic text-3xl md:text-4xl max-w-3xl mx-auto leading-tight ${
        dark ? 'text-white' : 'text-gray-900'
      }`}
    >
      {title}
    </h2>
  </div>
);

const BranchePage: React.FC<{ content: BrancheContent }> = ({ content }) => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setOpenFaq(null);

    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute('content') ?? '';
    document.title = content.metaTitle;
    description?.setAttribute('content', content.metaDescription);

    return () => {
      document.title = previousTitle;
      description?.setAttribute('content', previousDescription);
    };
  }, [content]);

  return (
    <div className="min-h-screen bg-white">
      <SiteNav onContact={() => setShowContactForm(true)} />

      <section className="relative py-16 md:py-24 overflow-hidden dynamic-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#e2642a] uppercase mb-5">
              {content.eyebrow}
            </p>
            <h1 className="font-serif italic text-4xl md:text-5xl text-gray-900 leading-tight mb-6">
              {content.heroTitle} <span className="text-[#e2642a]">{content.heroAccent}</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">{content.heroText}</p>
            <ul className="space-y-3 mb-10">
              {content.heroPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-gray-800">
                  <CheckCircle className="w-5 h-5 text-[#e2642a] flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div
              id="testanruf"
              className="relative bg-white rounded-2xl border border-gray-200 shadow-lg p-6 scroll-mt-24"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                  Kostenloser Testanruf
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Live mit der KI sprechen: Sarah ruft Sie direkt an
              </h2>
              <TestCallForm key={content.path} />
            </div>
          </div>

          <img
            src={content.image}
            alt={content.imageAlt}
            width={880}
            height={1100}
            className="w-full max-w-md mx-auto aspect-[4/5] lg:max-w-none lg:aspect-auto lg:h-full object-cover object-top rounded-2xl shadow-lg"
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid md:grid-cols-2 gap-6">
          {trustBadges.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex items-center gap-4 bg-white/70 rounded-2xl border border-gray-200 p-5"
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#e2642a]/10 flex-shrink-0">
                <Icon className="w-6 h-6 text-[#e2642a]" />
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Das Problem" title={content.problemTitle} />
          <div className="grid md:grid-cols-3 gap-6">
            {content.problems.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                <Icon className="w-6 h-6 text-[#e2642a] mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="So funktioniert es" title={content.howTitle} dark />
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-8">
              <h3 className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-5">
                Probieren Sie im Testanruf zum Beispiel
              </h3>
              <ul className="space-y-3 mb-8">
                {content.tryLines.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-gray-100">
                    <PhoneCall className="w-4 h-4 text-[#e2642a] flex-shrink-0 mt-1" />
                    <span>„{line}“</span>
                  </li>
                ))}
              </ul>
              <a
                href="#testanruf"
                className="inline-flex items-center justify-center bg-[#e2642a] text-white font-semibold py-3 px-8 rounded-full hover:bg-orange-600 transition-all duration-200"
              >
                Testanruf anfordern
              </a>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-950 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
                <span className="text-white text-sm font-medium">{content.exampleTitle}</span>
                <span className="text-gray-500 text-xs">Beispiel</span>
              </div>
              <dl className="p-6 space-y-3">
                {content.exampleRows.map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-6 text-sm">
                    <dt className="text-gray-500">{label}</dt>
                    <dd className="text-gray-100 text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Was sie übernimmt" title={content.featuresTitle} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-gray-200 p-6">
                <Icon className="w-5 h-5 text-[#e2642a] mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title={content.faqTitle} />
          <div className="space-y-3">
            {content.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.question} className="bg-white rounded-2xl border border-gray-200">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-4 font-medium text-gray-900"
                  >
                    {faq.question}
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && <p className="px-6 pb-5 text-gray-600">{faq.answer}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Clock className="w-8 h-8 text-[#e2642a] mx-auto mb-6" />
          <h2 className="font-serif italic text-3xl md:text-4xl text-white leading-tight mb-6">
            {content.closingTitle}
          </h2>
          <p className="text-gray-300 mb-8">
            Testen Sie die Empfangssoftware zwei Wochen kostenlos in Ihrem Betrieb.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setShowContactForm(true)}
              className="inline-flex items-center justify-center bg-[#e2642a] text-white font-semibold py-3 px-8 rounded-full hover:bg-orange-600 transition-all duration-200"
            >
              Zusammenarbeit anfragen
            </button>
            <a
              href="#testanruf"
              className="inline-flex items-center justify-center border border-gray-600 text-white font-semibold py-3 px-8 rounded-full hover:border-gray-400 transition-all duration-200"
            >
              Erst Testanruf anfordern
            </a>
          </div>
        </div>
      </section>

      <footer className="text-gray-500 py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} QuickStartAI. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-6">
            <Link to="/datenschutz" className="hover:text-gray-900 transition-colors">
              Datenschutz
            </Link>
            <Link to="/impressum" className="hover:text-gray-900 transition-colors">
              Impressum
            </Link>
            <Link to="/agb" className="hover:text-gray-900 transition-colors">
              AGB
            </Link>
            <button
              type="button"
              onClick={openCookieSettings}
              className="hover:text-gray-900 transition-colors"
            >
              Cookie-Einstellungen
            </button>
          </div>
        </div>
      </footer>

      {showContactForm && <ContactForm onClose={() => setShowContactForm(false)} />}
    </div>
  );
};

export default BranchePage;
