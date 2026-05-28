import React, { useState, useRef, useEffect as useEffectRef } from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  Bot,
  Phone,
  Zap,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Clock,
  Shield,
  Users,
  TrendingUp,
  ChevronDown,
  Menu,
  X,
  Globe,
  Calendar,
  BarChart2,
  Mic,
  BookOpen,
  UserCheck,
  Home,
  Send,
  Smartphone,
  Settings,
  Headphones,
  Search
} from 'lucide-react';

import { useFadeInUp, useStaggerAnimation } from './hooks/useScrollAnimation';
import LoadingScreen from './components/LoadingScreen';
import DemoModal from './components/DemoModal';
import ContactForm from './components/ContactForm';
import AnimatedCard from './components/AnimatedCard';
import SalesPage from './pages/SalesPage';
import PrivacyPage from './pages/PrivacyPage';
import ImpressumPage from './pages/ImpressumPage';
import AGBPage from './pages/AGBPage';
import BlogIndex from './pages/BlogIndex';
import BlogKIAgentenErstellen from './pages/BlogKIAgentenErstellen';
import KiDemoPage from './pages/KiDemoPage';

const featuresDropdownItems = [
  {
    icon: <div className="w-9 h-9 overflow-hidden rounded-lg"><img src="/whatsappBild.jpg" alt="WhatsApp" className="w-full h-full object-cover scale-[1.3]" /></div>,
    title: "WhatsApp Agent",
    description: "KI-Agent direkt auf WhatsApp Business",
    href: "#features"
  },
  {
    icon: <div className="w-9 h-9 overflow-hidden rounded-lg"><img src="/InstaPic.jpg" alt="Instagram" className="w-full h-full object-cover scale-[1.15]" /></div>,
    title: "Instagram Agent",
    description: "Automatisierte DMs & Kommentare",
    href: "#features"
  },
  {
    icon: <div className="w-9 h-9 overflow-hidden rounded-lg"><img src="/facebookMessanger.jpg" alt="Facebook Messenger" className="w-full h-full object-cover" /></div>,
    title: "Messenger Agent",
    description: "Facebook Messenger automatisieren",
    href: "#features"
  },
  {
    icon: <Phone className="w-5 h-5 text-[#e2642a]" />,
    title: "Telefonagent",
    description: "KI-gestützte Anrufbearbeitung 24/7",
    href: "#features"
  },
  {
    icon: <Bot className="w-5 h-5 text-[#e2642a]" />,
    title: "Website-Chatbot",
    description: "Intelligenter Chat für Ihre Website",
    href: "#features"
  },
  {
    icon: <div className="w-9 h-9 overflow-hidden rounded-lg"><img src="/googleCalanderpic.png" alt="Google Calendar" className="w-full h-full object-cover" /></div>,
    title: "Google Calendar",
    description: "Automatische Terminbuchung",
    href: "#features"
  },
  {
    icon: <div className="w-9 h-9 overflow-hidden rounded-lg"><img src="/calendlyPic.png" alt="Calendly" className="w-full h-full object-cover" /></div>,
    title: "Calendly Integration",
    description: "Buchungen direkt im Chat",
    href: "#features"
  },
  {
    icon: <div className="w-9 h-9 overflow-hidden rounded-lg"><img src="/shopifyLogo.png" alt="Shopify" className="w-full h-full object-cover" /></div>,
    title: "Shopify Integration",
    description: "E-Commerce Support automatisiert",
    href: "#features"
  },
  {
    icon: <Search className="w-5 h-5 text-[#e2642a]" />,
    title: "Web Scraper & Crawler",
    description: "Wissensbasis aus Webinhalten aufbauen",
    href: "#features"
  }
];

function HomePage() {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const featuresRef2 = useRef<HTMLDivElement>(null);

  useEffectRef(() => {
    function handleClickOutside(e: MouseEvent) {
      if (featuresRef2.current && !featuresRef2.current.contains(e.target as Node)) {
        setFeaturesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const heroRef = useFadeInUp();
  const benefitsRef = useFadeInUp();
  const featuresRef = useFadeInUp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteUrl.trim()) {
      alert('Bitte geben Sie eine Website-URL ein.');
      return;
    }
    try {
      new URL(websiteUrl);
      setShowDemoModal(true);
    } catch {
      alert('Bitte geben Sie eine gültige Website-URL ein (z.B. https://ihre-website.de).');
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const stats = [
    { value: "2B+", label: "WhatsApp Nutzer weltweit" },
    { value: "98%", label: "Öffnungsrate bei WhatsApp" },
    { value: "24/7", label: "Verfügbarkeit" },
    { value: "<24h", label: "Setup-Zeit" },
  ];

  const coreFeatures = [
    {
      icon: <Zap className="w-7 h-7 text-[#e2642a]" />,
      title: "Sofortantworten",
      description: "KI-Agents antworten Ihren Kunden sofort – 24/7. FAQs, Produktanfragen und Support-Tickets werden automatisch bearbeitet, ohne menschliches Eingreifen."
    },
    {
      icon: <UserCheck className="w-7 h-7 text-[#e2642a]" />,
      title: "Live-Übergabe",
      description: "Nahtlose Übergabe an menschliche Mitarbeiter, wenn nötig. Benachrichtigungen in Echtzeit, Chat übernehmen und bei Bedarf zurück an den KI-Agent übergeben."
    },
    {
      icon: <BookOpen className="w-7 h-7 text-[#e2642a]" />,
      title: "Wissensbasis",
      description: "Trainieren Sie Ihren Agent mit Dokumenten, URLs, FAQs und eigenen Inhalten. Die KI lernt Ihr Business kennen und gibt präzise, markenkonforme Antworten."
    },
    {
      icon: <Calendar className="w-7 h-7 text-[#e2642a]" />,
      title: "Terminbuchung",
      description: "Direkte Integration mit Google Calendar und Calendly. Kunden prüfen Verfügbarkeiten und buchen Termine direkt im Chat – vollautomatisch."
    },
    {
      icon: <BarChart2 className="w-7 h-7 text-[#e2642a]" />,
      title: "Analytics-Dashboard",
      description: "Verfolgen Sie Konversationen, Antwortzeiten, Nutzerbindung und Engagement-Metriken. Exportieren Sie Daten und optimieren Sie Ihren Agent kontinuierlich."
    },
    {
      icon: <Mic className="w-7 h-7 text-[#e2642a]" />,
      title: "Sprachtranskription",
      description: "Sprachnachrichten werden automatisch in Text umgewandelt. Ihr KI-Agent versteht Audionachrichten und antwortet intelligent – auch auf WhatsApp."
    }
  ];

  const useCases = [
    {
      icon: <div className="w-10 h-10 overflow-hidden rounded-lg"><img src="/shopifyLogo.png" alt="Shopify" className="w-full h-full object-cover" /></div>,
      title: "E-Commerce & Onlineshops",
      stat: "70% weniger Support-Tickets",
      description: "Bestellstatus, Rücksendungen und Produktfragen automatisch beantworten – rund um die Uhr."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#e2642a]" />,
      title: "Lead-Qualifizierung",
      stat: "3x mehr qualifizierte Leads",
      description: "Interessenten automatisch qualifizieren, Infos sammeln und direkt Verkaufsgespräche buchen."
    },
    {
      icon: <Calendar className="w-8 h-8 text-[#e2642a]" />,
      title: "Terminbuchung",
      stat: "100% automatisiert",
      description: "Ideal für Kliniken, Salons, Berater und Coaches – direkte Buchung ohne Telefonanruf."
    },
    {
      icon: <Home className="w-8 h-8 text-[#e2642a]" />,
      title: "Immobilien",
      stat: "Schnellere Abschlüsse",
      description: "Objekte teilen, Besichtigungen buchen und Kaufinteressenten automatisch qualifizieren."
    }
  ];

  const benefits = [
    {
      icon: <MessageSquare className="w-8 h-8 text-[#e2642a]" />,
      title: "WhatsApp, Website & Telefon",
      description: "Eine Plattform für alle Kanäle. Ihre KI-Agents sind dort, wo Ihre Kunden sind."
    },
    {
      icon: <Settings className="w-8 h-8 text-[#e2642a]" />,
      title: "Selbst erstellen oder von uns einrichten",
      description: "Nutzen Sie unsere Plattform eigenständig oder lassen Sie unsere Experten alles für Sie konfigurieren."
    },
    {
      icon: <Globe className="w-8 h-8 text-[#e2642a]" />,
      title: "40+ Integrationen",
      description: "CRMs, Kalender, Automatisierungstools und mehr. Ihr Agent fügt sich nahtlos in bestehende Workflows ein."
    },
    {
      icon: <Clock className="w-8 h-8 text-[#e2642a]" />,
      title: "Live in unter 24 Stunden",
      description: "Kein langer Onboarding-Prozess. Ihr KI-Agent ist binnen eines Tages einsatzbereit."
    }
  ];

  const faqs = [
    {
      question: "Was ist der Unterschied zwischen Self-Service und Done-for-You?",
      answer: "Beim Self-Service nutzen Sie unsere Plattform eigenständig: Sie erstellen, trainieren und verwalten Ihre KI-Agents selbst. Beim Done-for-You übernehmen wir alles – von der Einrichtung über das Training bis zur laufenden Optimierung. Beide Optionen sind möglich."
    },
    {
      question: "Auf welchen Kanälen können die KI-Agents eingesetzt werden?",
      answer: "Unsere Agents unterstützen WhatsApp Business, Website-Chat, Telefon und weitere Kanäle. Dank unserer All-in-One-Plattform verwalten Sie alle Kanäle zentral."
    },
    {
      question: "Wie wird der Agent auf mein Business trainiert?",
      answer: "Sie laden Dokumente, URLs, FAQs und eigene Inhalte in die Wissensbasis hoch. Der Agent lernt automatisch daraus und gibt präzise, auf Ihr Unternehmen abgestimmte Antworten."
    },
    {
      question: "Kann der Agent Termine buchen und Leads qualifizieren?",
      answer: "Ja. Der Agent kann sich mit Google Calendar und Calendly verbinden, Verfügbarkeiten prüfen und Termine direkt im Chat buchen. Gleichzeitig qualifiziert er Interessenten automatisch und leitet qualifizierte Leads an Ihr CRM weiter."
    },
    {
      question: "Wie schnell ist der erste Agent einsatzbereit?",
      answer: "Innerhalb von 24 Stunden liefern wir Ihnen eine individuelle Demo. Nach Ihrer Freigabe ist der Agent sofort live – auf Wunsch übernehmen wir den kompletten Setup."
    },
    {
      question: "Ist die Plattform DSGVO-konform?",
      answer: "Ja. Alle Daten werden DSGVO-konform verarbeitet. Wir legen höchsten Wert auf Datenschutz und Sicherheit – kein Kompromiss."
    }
  ];

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 sticky top-0 z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                src="/Firmenlogo-removebg-preview.png"
                alt="QuickStartAI Logo"
                className="h-20 w-auto mr-3"
              />
              <span className="text-xl font-bold text-white">QuickStartAI</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {/* Features Dropdown */}
              <div ref={featuresRef2} className="relative">
                <button
                  onClick={() => setFeaturesOpen(!featuresOpen)}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                >
                  <span>Features</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${featuresOpen ? 'rotate-180' : ''}`} />
                </button>

                {featuresOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[560px] bg-gray-900/95 backdrop-blur-md border border-gray-700/60 rounded-2xl shadow-2xl p-4 z-50">
                    <div className="grid grid-cols-2 gap-1">
                      {featuresDropdownItems.map((item, index) => (
                        <a
                          key={index}
                          href={item.href}
                          onClick={() => setFeaturesOpen(false)}
                          className="flex items-start space-x-3 px-4 py-3 rounded-xl hover:bg-gray-800/70 transition-colors group"
                        >
                          <div className="flex-shrink-0 w-9 h-9 bg-orange-900/30 rounded-lg overflow-hidden flex items-center justify-center group-hover:bg-[#e2642a]/20 transition-colors mt-0.5">
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-[#e2642a] transition-colors">{item.title}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{item.description}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-700/50">
                      <a
                        href="#features"
                        onClick={() => setFeaturesOpen(false)}
                        className="flex items-center justify-center space-x-2 text-sm text-[#e2642a] hover:text-orange-400 font-medium transition-colors"
                      >
                        <span>Alle Features ansehen</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <a href="#usecases" className="text-gray-300 hover:text-white transition-colors">Anwendungsfälle</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">So funktionierts</a>
              <a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
              <Link to="/sales" className="text-gray-300 hover:text-white transition-colors">Preise</Link>
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-[#e2642a] text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all duration-200 font-medium"
              >
                Erstgespräch →
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-2">
                {/* Mobile Features Accordion */}
                <button
                  onClick={() => setFeaturesOpen(!featuresOpen)}
                  className="flex items-center justify-between text-gray-300 hover:text-white transition-colors py-2"
                >
                  <span>Features</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${featuresOpen ? 'rotate-180' : ''}`} />
                </button>
                {featuresOpen && (
                  <div className="pl-4 flex flex-col space-y-3 pb-2">
                    {featuresDropdownItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        onClick={() => { setFeaturesOpen(false); setIsMenuOpen(false); }}
                        className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
                      >
                        {item.icon}
                        <span className="text-sm">{item.title}</span>
                      </a>
                    ))}
                  </div>
                )}
                <a href="#usecases" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white transition-colors py-2">Anwendungsfälle</a>
                <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white transition-colors py-2">So funktionierts</a>
                <a href="#faq" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white transition-colors py-2">FAQ</a>
                <Link to="/sales" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white transition-colors py-2">Preise</Link>
                <button
                  onClick={() => { setShowContactForm(true); setIsMenuOpen(false); }}
                  className="bg-[#e2642a] text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors w-fit mt-2"
                >
                  Erstgespräch →
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden dynamic-bg">
        <div className="absolute inset-0 elegant-mesh"></div>
        <div className="absolute inset-0 floating-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        <div className="absolute inset-0">
          <div className="glow-orb glow-orb-1"></div>
          <div className="glow-orb glow-orb-2"></div>
          <div className="glow-orb glow-orb-3"></div>
        </div>
        <div className="absolute inset-0 wave-overlay"></div>

        <div ref={heroRef} className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-gray-800/60 backdrop-blur-md border border-gray-600/50 rounded-full px-4 py-2 mb-8 animate-fade-in-down">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">100% DSGVO-konform · Powered by WhatsApp Business API</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            KI-Agents für Ihr Business –{" "}
            <span className="bg-gradient-to-r from-[#e2642a] via-orange-400 to-[#e2642a] bg-clip-text text-transparent">
              auf WhatsApp, Website & Telefon.
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Erstellen Sie eigene KI-Agents über unsere All-in-One-Plattform – oder lassen Sie unsere Experten alles für Sie einrichten.
            Automatisieren Sie Support, Lead-Qualifizierung und Terminbuchung rund um die Uhr.
          </p>

          <div className="space-y-4 mb-12 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-3 text-gray-300 transform hover:scale-105 transition-transform duration-200">
              <ArrowRight className="w-5 h-5 text-[#e2642a]" />
              <span className="text-lg">Selbst erstellen <span className="text-[#e2642a] font-medium">oder</span> von uns vollständig eingerichtet bekommen</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-300 transform hover:scale-105 transition-transform duration-200">
              <ArrowRight className="w-5 h-5 text-[#e2642a]" />
              <span className="text-lg">WhatsApp, Website-Chat und Telefon aus einer Plattform</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-300 transform hover:scale-105 transition-transform duration-200">
              <ArrowRight className="w-5 h-5 text-[#e2642a]" />
              <span className="text-lg">Live in unter 24 Stunden – kostenlos & unverbindlich testen</span>
            </div>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-md border border-gray-600/50 rounded-2xl p-8 mb-12 max-w-2xl mx-auto transform hover:scale-105 transition-all duration-300 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                onBlur={() => {
                  if (websiteUrl && !/^https?:\/\//i.test(websiteUrl)) {
                    setWebsiteUrl(`https://${websiteUrl}`);
                  }
                }}
                placeholder="ihre-website.de"
                className="w-full px-6 py-4 text-lg bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-[#e2642a] focus:border-transparent outline-none transition-all text-white placeholder-gray-400"
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#e2642a] to-orange-600 text-white font-semibold py-4 px-8 rounded-xl text-lg hover:from-orange-600 hover:to-[#e2642a] transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Jetzt kostenlosen Demo-Agent sichern</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
            <p className="text-sm text-gray-400 mt-4 flex items-center justify-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Unverbindlich. Keine Kreditkarte nötig.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Path Section */}
      <section id="how-it-works" className="relative py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Zwei Wege, ein Ziel
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Wählen Sie, wie Sie KI-Automatisierung in Ihrem Unternehmen einsetzen möchten
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-800/40 backdrop-blur-md border border-gray-600/50 rounded-2xl p-8 hover:border-[#e2642a]/50 transition-all duration-300">
              <div className="w-14 h-14 bg-orange-900/40 rounded-xl flex items-center justify-center mb-6">
                <Settings className="w-7 h-7 text-[#e2642a]" />
              </div>
              <div className="inline-block bg-[#e2642a]/20 text-[#e2642a] text-sm font-semibold px-3 py-1 rounded-full mb-4">Self-Service</div>
              <h3 className="text-2xl font-bold text-white mb-4">Selbst erstellen</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Nutzen Sie unsere intuitive Plattform, um eigene KI-Agents zu bauen, zu trainieren und zu verwalten. Volle Kontrolle, keine technischen Vorkenntnisse nötig.
              </p>
              <ul className="space-y-3">
                {["Drag-and-Drop Agent Builder", "Wissensbasis selbst befüllen", "Channels selbst konfigurieren", "Analytics einsehen & optimieren"].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-[#e2642a] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#e2642a]/10 to-orange-900/20 border border-[#e2642a]/40 rounded-2xl p-8 hover:border-[#e2642a] transition-all duration-300 relative">
              <div className="absolute -top-3 right-6">
                <span className="bg-gradient-to-r from-[#e2642a] to-orange-600 text-white px-4 py-1 rounded-full text-sm font-semibold">Beliebt</span>
              </div>
              <div className="w-14 h-14 bg-[#e2642a]/20 rounded-xl flex items-center justify-center mb-6">
                <Headphones className="w-7 h-7 text-[#e2642a]" />
              </div>
              <div className="inline-block bg-[#e2642a]/20 text-[#e2642a] text-sm font-semibold px-3 py-1 rounded-full mb-4">Done-for-You</div>
              <h3 className="text-2xl font-bold text-white mb-4">Wir richten ein</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Unser Team übernimmt den kompletten Setup: Von der Konfiguration über das Training bis zur laufenden Optimierung Ihrer Agents.
              </p>
              <ul className="space-y-3">
                {["Persönliche Beratung & Onboarding", "Kompletter Setup durch unsere Experten", "Agent-Training mit Ihren Daten", "Laufende Optimierung & Support"].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-[#e2642a] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="relative py-24 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={featuresRef} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Alles, was Sie für KI-Automatisierung brauchen
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Unsere All-in-One-Plattform bietet alle Features für professionelle KI-Agents – auf WhatsApp, Website und Telefon.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <AnimatedCard
                key={index}
                delay={index * 0.1}
                className="bg-gray-900/60 backdrop-blur-md border border-gray-600/50 p-8 rounded-2xl hover:bg-gray-900/80 hover:scale-105 hover:border-[#e2642a]/50 transition-all duration-300 group shadow-xl"
              >
                <div className="w-14 h-14 bg-orange-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#e2642a]/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#e2642a] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="usecases" className="relative py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Für jede Branche der passende Agent
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Von E-Commerce bis Immobilien – KI-Automatisierung für Ihr Business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <AnimatedCard
                key={index}
                delay={index * 0.1}
                className="bg-gray-800/40 backdrop-blur-md border border-gray-600/50 p-8 rounded-2xl hover:bg-gray-800/60 hover:scale-105 hover:border-[#e2642a]/50 transition-all duration-300 group shadow-xl"
              >
                <div className="mb-5">{useCase.icon}</div>
                <div className="text-[#e2642a] font-bold text-sm mb-2">{useCase.stat}</div>
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#e2642a] transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm">{useCase.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits / Why Us Section */}
      <section id="benefits" className="relative py-24 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={benefitsRef} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Warum QuickStartAI?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Eine Plattform. Alle Kanäle. Volle Flexibilität.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <AnimatedCard
                key={index}
                delay={index * 0.1}
                className="bg-gray-900/60 backdrop-blur-md border border-gray-600/50 p-8 rounded-2xl hover:bg-gray-900/80 hover:scale-105 hover:border-[#e2642a]/50 transition-all duration-300 group shadow-xl"
              >
                <div className="mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-[#e2642a] transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="relative py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            40+ Integrationen
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Verbinden Sie Ihren KI-Agent mit den Tools, die Sie bereits nutzen
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "WhatsApp Business", "Google Calendar", "Calendly", "Make.com", "n8n",
              "HubSpot", "Salesforce", "Pipedrive", "Zapier", "Slack",
              "Zendesk", "Notion", "Airtable", "OpenAI"
            ].map((tool, index) => (
              <span
                key={index}
                className="bg-gray-800/60 border border-gray-600/50 text-gray-300 px-4 py-2 rounded-full text-sm hover:border-[#e2642a]/50 hover:text-white transition-all duration-200"
              >
                {tool}
              </span>
            ))}
            <span className="bg-gray-800/60 border border-gray-600/50 text-gray-300 pl-2 pr-4 py-1.5 rounded-full text-sm hover:border-[#e2642a]/50 hover:text-white transition-all duration-200 flex items-center gap-2">
              <div className="w-5 h-5 overflow-hidden rounded"><img src="/shopifyLogo.png" alt="Shopify" className="w-full h-full object-cover" /></div>
              Shopify
            </span>
            <span className="bg-[#e2642a]/20 border border-[#e2642a]/40 text-[#e2642a] px-4 py-2 rounded-full text-sm font-medium">
              + viele mehr
            </span>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative py-24 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Häufig gestellte Fragen
            </h2>
            <p className="text-xl text-gray-300">
              Alles, was Sie über unsere KI-Agent-Plattform wissen müssen
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-900/40 backdrop-blur-md border border-gray-600/50 rounded-xl shadow-lg"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-900/60 transition-colors rounded-xl"
                >
                  <span className="font-semibold text-white">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ml-4 ${openFaq === index ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-8 pb-6">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-[#e2642a] to-orange-600"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Bereit für Ihren ersten KI-Agent?
            </h2>
            <p className="text-xl text-white/90 mb-12">
              Starten Sie jetzt kostenlos. Ihre Demo ist in unter 24 Stunden bereit – unverbindlich.
            </p>

            <div className="bg-gray-900/80 backdrop-blur-md border border-gray-600/50 rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://ihre-website.de"
                  className="w-full px-6 py-4 text-lg bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent outline-none text-white placeholder-white/60"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-white text-[#e2642a] font-semibold py-4 px-8 rounded-xl text-lg hover:bg-gray-100 hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Jetzt Demo-Agent anfordern</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
              <p className="text-sm text-white/80 mt-4 flex items-center justify-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Kostenlos • Unverbindlich • Keine Kreditkarte</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative text-white py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/Firmenlogo-removebg-preview.png" alt="QuickStartAI Logo" className="h-8 w-auto mr-2" />
                <span className="text-xl font-bold">QuickStartAI</span>
              </div>
              <p className="text-gray-300">
                Ihre KI-Agentur für All-in-One KI-Agent-Lösungen – auf WhatsApp, Website und Telefon.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Plattform</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#usecases" className="hover:text-white transition-colors">Anwendungsfälle</a></li>
                <li><Link to="/sales#pricing" className="hover:text-white transition-colors">Preise</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li>
                  <button onClick={() => setShowContactForm(true)} className="hover:text-white transition-colors">
                    Kontakt
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Unternehmen</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/sales" className="hover:text-white transition-colors">Sales</Link></li>
                <li><Link to="/agb" className="hover:text-white transition-colors">AGB</Link></li>
                <li><Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link></li>
                <li><Link to="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                  <img src="/ProfilBild.jpg" alt="Profilbild Maximilian Theele" className="w-16 h-16 rounded-full object-cover" />
                </div>
                <div>
                  <div className="font-semibold text-white">Maximilian Theele</div>
                  <div className="text-gray-300">Geschäftsführer</div>
                </div>
              </div>
              <div className="text-center text-gray-300">
                <p>&copy; 2025 QuickStartAI. Alle Rechte vorbehalten.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {showDemoModal && (
        <DemoModal websiteUrl={websiteUrl} onClose={() => setShowDemoModal(false)} />
      )}
      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/agb" element={<AGBPage />} />
        <Route path="/impressum" element={<ImpressumPage />} />
        <Route path="/datenschutz" element={<PrivacyPage />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/ki-agenten-erstellen" element={<BlogKIAgentenErstellen />} />
        <Route path="/ki-demo" element={<KiDemoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
