import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Shield,
  ArrowUp,
  X,
} from 'lucide-react';
import ContactForm from './ContactForm';
import type { BlogTemplateProps } from '../types/blog';

const BASE_URL = 'https://quickstartai.de';

export default function BlogTemplate({
  slug,
  pageTitle,
  metaDesc,
  ogDesc,
  ogImage,
  publishDate,
  modifiedDate,
  publishDateFormatted,
  modifiedDateFormatted,
  keywords,
  category,
  readingTime,
  articleTitle,
  intro,
  heroImage,
  heroVideo,
  aboveFoldSecondaryText,
  aboveFoldSecondaryHref,
  featuredSnippet,
  toc,
  children,
  conclusion,
  faqs,
  authorBio,
  authorTags,
  trustStats,
}: BlogTemplateProps) {
  const canonical = `${BASE_URL}/blog/${slug}`;

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [ctaDismissed, setCtaDismissed] = useState(false);

  /* ── Inject SEO meta + JSON-LD, clean up on unmount ── */
  useEffect(() => {
    const prevTitle = document.title;
    document.title = pageTitle;
    const added: Element[] = [];

    const setMeta = (key: string, keyVal: string, content: string) => {
      let el = document.querySelector(`meta[${key}="${keyVal}"]`);
      const isNew = !el;
      if (!el) { el = document.createElement('meta'); }
      el.setAttribute(key, keyVal);
      el.setAttribute('content', content);
      if (isNew) { document.head.appendChild(el); added.push(el); }
    };

    setMeta('name', 'description', metaDesc);
    setMeta('name', 'robots', 'index, follow');
    setMeta('property', 'og:title', pageTitle);
    setMeta('property', 'og:description', ogDesc);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:type', 'article');
    setMeta('property', 'og:locale', 'de_DE');
    setMeta('property', 'article:published_time', publishDate);
    setMeta('property', 'article:modified_time', modifiedDate);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', pageTitle);
    setMeta('name', 'twitter:description', ogDesc);
    setMeta('name', 'twitter:image', ogImage);

    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const canonicalIsNew = !canonicalEl;
    if (!canonicalEl) { canonicalEl = document.createElement('link'); canonicalEl.setAttribute('rel', 'canonical'); }
    canonicalEl.setAttribute('href', canonical);
    if (canonicalIsNew) { document.head.appendChild(canonicalEl); added.push(canonicalEl); }

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: typeof articleTitle === 'string' ? articleTitle : pageTitle,
      description: metaDesc,
      image: ogImage,
      author: {
        '@type': 'Person',
        name: 'Maximilian Theele',
        url: BASE_URL,
        jobTitle: 'Geschäftsführer',
        worksFor: { '@type': 'Organization', name: 'QuickStartAI', url: BASE_URL },
      },
      publisher: {
        '@type': 'Organization',
        name: 'QuickStartAI',
        url: BASE_URL,
        logo: { '@type': 'ImageObject', url: `${BASE_URL}/Firmenlogo-removebg-preview.png` },
      },
      datePublished: publishDate,
      dateModified: modifiedDate,
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      keywords,
      inLanguage: 'de',
    };

    const faqSchema = faqs.length > 0 ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    } : null;

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: typeof articleTitle === 'string' ? articleTitle : slug, item: canonical },
      ],
    };

    const authorSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Maximilian Theele',
      jobTitle: 'Geschäftsführer',
      description: 'Web- und Backend-Entwickler, KI-Experte. Baut und deployed KI-Agenten-Systeme für Unternehmen seit 2022.',
      worksFor: { '@type': 'Organization', name: 'QuickStartAI', url: BASE_URL },
      url: BASE_URL,
    };

    const schemas = [articleSchema, faqSchema, breadcrumbSchema, authorSchema].filter(Boolean);
    const scriptEls = schemas.map(s => {
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.textContent = JSON.stringify(s);
      document.head.appendChild(el);
      return el;
    });

    return () => {
      document.title = prevTitle;
      added.forEach(el => el.parentNode?.removeChild(el));
      scriptEls.forEach(el => el.parentNode?.removeChild(el));
    };
  }, [slug, pageTitle, metaDesc, ogDesc, ogImage, publishDate, modifiedDate, keywords, canonical, faqs, articleTitle]);

  /* ── Scroll: back-to-top + sticky CTA ── */
  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 800);
      setShowStickyCTA(window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const displayDate = modifiedDateFormatted ?? publishDateFormatted;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#e2642a] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
      >
        Zum Hauptinhalt springen
      </a>

      <div className="min-h-screen bg-gray-900 text-gray-100">

        {/* Sticky bottom CTA */}
        {showStickyCTA && !ctaDismissed && (
          <div
            role="complementary"
            aria-label="Demo-Angebot"
            className="fixed bottom-0 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-md border-t border-[#e2642a]/40 px-4 py-3 flex items-center justify-between gap-4"
          >
            <p className="text-sm text-gray-300 hidden sm:block">
              Bereit für einen KI-Agenten, der wirklich live geht?
            </p>
            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-[#e2642a] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors whitespace-nowrap"
                aria-label="Kostenlosen Demo-Agenten anfordern"
              >
                Kostenlose Demo →
              </button>
              <button
                onClick={() => setCtaDismissed(true)}
                className="text-gray-500 hover:text-gray-300 transition-colors p-1"
                aria-label="Hinweis schließen"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Back to top */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            aria-label="Zurück nach oben"
            className="fixed bottom-20 right-4 z-40 bg-gray-700 hover:bg-[#e2642a] text-white p-3 rounded-full shadow-lg transition-colors"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Navigation */}
        <nav
          aria-label="Hauptnavigation"
          className="bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 sticky top-0 z-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center" aria-label="QuickStartAI Startseite">
                <img
                  src="/Firmenlogo-removebg-preview.png"
                  alt="QuickStartAI Logo"
                  width="80"
                  height="80"
                  className="h-20 w-auto mr-3"
                />
                <span className="text-xl font-bold text-white">QuickStartAI</span>
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
                <Link to="/#features" className="text-gray-300 hover:text-white transition-colors">
                  Features
                </Link>
                <Link to="/sales" className="text-gray-300 hover:text-white transition-colors">
                  Preise
                </Link>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="bg-[#e2642a] text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all duration-200 font-medium min-h-[48px]"
                  aria-label="Erstgespräch vereinbaren"
                >
                  Erstgespräch →
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6"
        >
          <ol className="flex items-center space-x-2 text-sm text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to="/" className="hover:text-[#e2642a] transition-colors" itemProp="item">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li aria-hidden="true"><span className="text-gray-700">/</span></li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to="/blog" className="hover:text-[#e2642a] transition-colors" itemProp="item">
                <span itemProp="name">Blog</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li aria-hidden="true"><span className="text-gray-700">/</span></li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-gray-400" itemProp="name">{category}</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>

        {/* Hero Header */}
        <header className="relative pt-10 pb-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-900/20 to-transparent pointer-events-none" aria-hidden="true" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 mb-5">
              <span className="bg-[#e2642a]/20 text-[#e2642a] text-xs font-semibold px-3 py-1 rounded-full">
                {category}
              </span>
              <span className="text-gray-500 text-sm" aria-hidden="true">·</span>
              <span className="text-gray-400 text-sm">Lesezeit: {readingTime}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {articleTitle}
            </h1>

            {/* Above-fold CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-[#e2642a] text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all duration-200 inline-flex items-center justify-center space-x-2 min-h-[48px]"
                aria-label="Kostenlosen Demo-Agenten anfordern"
              >
                <span>Jetzt kostenlose Demo anfordern</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
              {aboveFoldSecondaryText && aboveFoldSecondaryHref && (
                <a
                  href={aboveFoldSecondaryHref}
                  className="border border-gray-600 text-gray-300 px-6 py-3 rounded-xl font-semibold hover:border-[#e2642a] hover:text-white transition-all duration-200 inline-flex items-center justify-center min-h-[48px]"
                >
                  {aboveFoldSecondaryText}
                </a>
              )}
            </div>

            <div className="text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl">
              {intro}
            </div>

            {/* Author + Dates (E-E-A-T) */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <div className="flex items-center space-x-3">
                <img
                  src="/ProfilBild.jpg"
                  alt="Maximilian Theele, Geschäftsführer QuickStartAI"
                  width="48"
                  height="48"
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <div className="text-white font-semibold text-sm">Maximilian Theele</div>
                  <div className="text-gray-400 text-xs">Geschäftsführer · QuickStartAI</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                <time dateTime={publishDate}>
                  Veröffentlicht: {publishDateFormatted}
                </time>
                {modifiedDateFormatted && modifiedDateFormatted !== publishDateFormatted && (
                  <>
                    <span aria-hidden="true">·</span>
                    <time dateTime={modifiedDate}>
                      Aktualisiert: {displayDate}
                    </time>
                  </>
                )}
              </div>
            </div>

            {/* Hero image or video */}
            <div className="rounded-2xl overflow-hidden">
              {heroVideo ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={heroVideo.poster}
                  className="w-full h-72 md:h-96 object-cover"
                  aria-label={heroImage.alt}
                >
                  <source src={heroVideo.src} type={heroVideo.type ?? 'video/mp4'} />
                </video>
              ) : (
                <img
                  src={heroImage.src}
                  srcSet={heroImage.srcSet}
                  sizes={heroImage.sizes}
                  alt={heroImage.alt}
                  width={heroImage.width}
                  height={heroImage.height}
                  className="w-full h-72 md:h-96 object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              )}
              {heroImage.credit && (
                <p className="text-xs text-gray-600 mt-1 text-right">
                  Foto: {heroImage.credit} · Pexels
                </p>
              )}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main id="main-content">
          <article
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32"
            itemScope
            itemType="https://schema.org/Article"
          >
            <meta itemProp="datePublished" content={publishDate} />
            <meta itemProp="dateModified" content={modifiedDate} />
            <meta itemProp="author" content="Maximilian Theele" />

            {/* Featured snippet */}
            {featuredSnippet && (
              <div
                className="bg-[#e2642a]/10 border-l-4 border-[#e2642a] rounded-r-2xl p-6 mb-12"
                role="note"
                aria-label="Kurzantwort"
              >
                <p className="text-xs font-semibold text-[#e2642a] uppercase tracking-wider mb-3">Kurzantwort</p>
                <p className="text-white font-medium leading-relaxed mb-2">{featuredSnippet.primary}</p>
                <p className="text-gray-300 leading-relaxed">{featuredSnippet.secondary}</p>
              </div>
            )}

            {/* Table of contents */}
            {toc.length > 0 && (
              <nav aria-label="Inhaltsverzeichnis" className="bg-gray-800/50 border border-gray-700/60 rounded-2xl p-6 mb-14">
                <h2 className="text-white font-semibold mb-4 flex items-center space-x-2 text-base">
                  <BookOpen className="w-5 h-5 text-[#e2642a]" aria-hidden="true" />
                  <span>Inhaltsverzeichnis</span>
                </h2>
                <ol className="space-y-2 text-gray-300">
                  {toc.map((item, i) => (
                    <li key={i}>
                      <a
                        href={`#section-${i + 1}`}
                        className="hover:text-[#e2642a] transition-colors flex items-center space-x-2 focus:outline-none focus:text-[#e2642a]"
                      >
                        <span className="text-[#e2642a] text-sm font-bold w-4">{i + 1}.</span>
                        <span>{item}</span>
                      </a>
                    </li>
                  ))}
                  {faqs.length > 0 && (
                    <li>
                      <a
                        href="#section-faq"
                        className="hover:text-[#e2642a] transition-colors flex items-center space-x-2 focus:outline-none focus:text-[#e2642a]"
                      >
                        <span className="text-[#e2642a] text-sm font-bold w-4">{toc.length + 1}.</span>
                        <span>FAQ</span>
                      </a>
                    </li>
                  )}
                </ol>
              </nav>
            )}

            {/* Article content (render prop) */}
            {children(() => setShowContactForm(true))}

            {/* Mid-article CTA */}
            <div
              className="bg-gradient-to-r from-[#e2642a]/20 to-orange-900/20 border border-[#e2642a]/40 rounded-2xl p-8 mb-16 text-center"
              role="complementary"
              aria-label="Kostenlose Demo"
            >
              <h3 className="text-2xl font-bold text-white mb-3">
                Bereit für einen Agent, der wirklich live geht?
              </h3>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                Wir bauen KI-Agenten, die deployed werden — nicht Prototypen, die im
                Slack-Channel sterben. Demo in unter 24 Stunden.
              </p>
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-[#e2642a] text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all duration-200 inline-flex items-center space-x-2 min-h-[48px]"
                aria-label="Kostenlosen Demo-Agenten anfordern"
              >
                <span>Jetzt Demo-Agent anfordern</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* FAQ section */}
            {faqs.length > 0 && (
              <section id="section-faq" className="mb-16 scroll-mt-24" aria-labelledby="heading-faq">
                <h2 id="heading-faq" className="text-3xl font-bold text-white mb-8">
                  {toc.length + 1}. Häufige Fragen
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <div
                      key={i}
                      className="bg-gray-800/40 border border-gray-700/50 rounded-xl overflow-hidden"
                      itemScope
                      itemType="https://schema.org/Question"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-800/60 transition-colors min-h-[48px] focus:outline-none focus:bg-gray-800/60"
                        aria-expanded={openFaq === i}
                        aria-controls={`faq-answer-${i}`}
                      >
                        <span className="font-semibold text-white pr-4" itemProp="name">{faq.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </button>
                      {openFaq === i && (
                        <div
                          id={`faq-answer-${i}`}
                          className="px-6 pb-5"
                          itemScope
                          itemType="https://schema.org/Answer"
                          itemProp="acceptedAnswer"
                        >
                          <p className="text-gray-300 leading-relaxed" itemProp="text">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Conclusion */}
            {conclusion && (
              <section aria-labelledby="heading-fazit" className="mb-16">
                <h2 id="heading-fazit" className="text-2xl font-bold text-white mb-4">Fazit</h2>
                {conclusion}
              </section>
            )}

            {/* Author bio (E-E-A-T) */}
            <div
              className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 mb-16"
              role="complementary"
              aria-label="Über den Autor"
              itemScope
              itemType="https://schema.org/Person"
            >
              <p className="text-xs font-semibold text-[#e2642a] uppercase tracking-wider mb-4">Über den Autor</p>
              <div className="flex items-start space-x-4">
                <img
                  src="/ProfilBild.jpg"
                  alt="Maximilian Theele, Web- und Backend-Entwickler, Geschäftsführer von QuickStartAI"
                  width="64"
                  height="64"
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  loading="lazy"
                  itemProp="image"
                />
                <div>
                  <h3 className="text-white font-bold text-lg mb-1" itemProp="name">Maximilian Theele</h3>
                  <p className="text-[#e2642a] text-sm font-medium mb-3" itemProp="jobTitle">
                    Geschäftsführer, QuickStartAI · Web & Backend Developer
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4" itemProp="description">
                    {authorBio ?? 'Maximilian kommt aus der Web- und Backend-Entwicklung — kein Informatikstudium, dafür jahrelange Praxis im Bauen von Systemen, die tatsächlich funktionieren. Vor drei Jahren wurde er von KI so begeistert, dass daraus QuickStartAI entstand. Er gründete es, weil die meisten KI-Agenturen einen Fehler machen: Sie verkaufen Demos, die nie wirklich live gehen. Sein Team hat seitdem über 50 KI-Agenten für Unternehmen aus dem deutschsprachigen Raum gebaut und deployed.'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(authorTags ?? ['Web & Backend Dev', '3+ Jahre KI-Erfahrung', '50+ Agenten deployed', 'München']).map((tag, i) => (
                      <span key={i} className="bg-gray-700/60 text-gray-300 text-xs px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {(trustStats ?? [
                { value: '50+', label: 'Agenten deployed' },
                { value: '3 J.', label: 'KI-Erfahrung' },
                { value: '<24h', label: 'Demo-Lieferzeit' },
                { value: '100%', label: 'DSGVO-konform' },
              ]).map((stat, i) => (
                <div key={i} className="bg-gray-800/40 border border-gray-700/40 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Final CTA */}
            <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-8 text-center">
              <Shield className="w-10 h-10 text-[#e2642a] mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-bold text-white mb-2">Live in unter 24 Stunden</h3>
              <p className="text-gray-400 mb-2 text-sm">
                Wir richten den Agenten ein. Du trinkst in der Zeit einen Kaffee.
                Das ist keine Übertreibung — das ist buchstäblich unser Timing.
              </p>
              <p className="text-gray-500 text-xs mb-6">
                Kostenlos · Unverbindlich · 100 % DSGVO-konform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowContactForm(true)}
                  className="bg-[#e2642a] text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all duration-200 inline-flex items-center justify-center space-x-2 min-h-[48px]"
                  aria-label="Demo-Agenten kostenlos anfordern"
                >
                  <span>Demo-Agent anfordern</span>
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>
                <Link
                  to="/"
                  className="border border-gray-600 text-gray-300 px-8 py-3 rounded-xl font-semibold hover:border-[#e2642a] hover:text-white transition-all duration-200 inline-flex items-center justify-center min-h-[48px]"
                >
                  Mehr über QuickStartAI
                </Link>
              </div>
            </div>
          </article>
        </main>
      </div>

      {showContactForm && <ContactForm onClose={() => setShowContactForm(false)} />}
    </>
  );
}
