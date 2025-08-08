import React, { useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  Bot, 
  Phone, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Star,
  MessageSquare,
  Clock,
  Shield,
  Users,
  TrendingUp,
  ChevronDown,
  Menu,
  X,
  Globe,
  Headphones,
  Mail,
  User,
  MessageCircle,
  Send
} from 'lucide-react';

// Hooks
import { useFadeInUp, useStaggerAnimation } from './hooks/useScrollAnimation';

// Components
import LoadingScreen from './components/LoadingScreen';
import DemoModal from './components/DemoModal';
import ContactForm from './components/ContactForm';
import AnimatedCard from './components/AnimatedCard';
import SalesPage from './pages/SalesPage';

function HomePage() {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Animation refs
  const heroRef = useFadeInUp();
  const benefitsRef = useFadeInUp();
  const featuresRef = useFadeInUp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (websiteUrl.trim()) {
      setShowDemoModal(true);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const features = [
    {
      icon: <CheckCircle className="w-6 h-6 text-[#e2642a]" />,
      title: "Individuell trainierter KI-Chatbot für Ihre Website",
      description: "Perfekt auf Ihr Business abgestimmt"
    },
    {
      icon: <Phone className="w-6 h-6 text-[#e2642a]" />,
      title: "Optional mit Sprachintegration für Telefon & WhatsApp",
      description: "Omnichannel-Support für alle Kanäle"
    },
    {
      icon: <Zap className="w-6 h-6 text-[#e2642a]" />,
      title: "Live in 24 Stunden – kostenlos & unverbindlich",
      description: "Keine Wartezeiten, sofort einsatzbereit"
    }
  ];

  const benefits = [
    {
      icon: <MessageSquare className="w-8 h-8 text-[#e2642a]" />,
      title: "24/7 Kundensupport",
      description: "Ihre Kunden erhalten rund um die Uhr sofortige Antworten auf ihre Fragen."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#e2642a]" />,
      title: "Leadgenerierung",
      description: "Qualifizierte Leads werden automatisch erfasst und an Ihr CRM weitergeleitet."
    },
    {
      icon: <Users className="w-8 h-8 text-[#e2642a]" />,
      title: "Kundenzufriedenheit",
      description: "Schnelle Antworten steigern die Zufriedenheit und reduzieren Absprungrate."
    },
    {
      icon: <Clock className="w-8 h-8 text-[#e2642a]" />,
      title: "Weniger Standardfragen",
      description: "Ihr Team wird entlastet: Der Chatbot beantwortet häufige Fragen automatisch – ohne manuelles Eingreifen."
    }
  ];


  const faqs = [
    {
      question: "Wie schnell ist der Chatbot einsatzbereit?",
      answer: "Innerhalb von 24 Stunden liefern wir Ihnen eine individuelle Demo. Nach Ihrer Freigabe ist der Chatbot sofort live."
    },
    {
      question: "Welche Kosten entstehen für den Test?",
      answer: "Die Demo ist komplett kostenlos und unverbindlich. Sie benötigen keine Kreditkarte oder andere Zahlungsinformationen."
    },
    {
      question: "Kann der Chatbot auch telefonische Anfragen bearbeiten?",
      answer: "Ja, mit unserer Sprachintegration kann der Chatbot auch Telefongespräche führen und WhatsApp-Nachrichten beantworten."
    },
    {
      question: "Wie wird der Chatbot auf mein Business abgestimmt?",
      answer: "Wir analysieren Ihre Website, Ihre häufigsten Kundenanfragen und trainieren den Chatbot mit Ihren spezifischen Daten und Produktinformationen."
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
                src="/src/assets/Firmenlogo-removebg-preview.png" 
                alt="QuickStartAI Logo" 
                className="h-20 w-auto mr-3"
              />
              <span className="text-xl font-bold text-white">QuickStartAI</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#benefits" className="text-gray-300 hover:text-white transition-colors">Vorteile</a>
              <a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
              <Link to="/sales" className="text-gray-300 hover:text-white transition-colors">Sales</Link>
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-[#e2642a] text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all duration-200 font-medium"
              >
                Erstgespräch →
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
                <a href="#benefits" className="text-gray-300 hover:text-white transition-colors">Vorteile</a>
                <a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
                <Link to="/sales" className="text-gray-300 hover:text-white transition-colors">Sales</Link>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="bg-[#e2642a] text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors w-fit"
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
        {/* Dynamic Background Elements - nur im Hero */}
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
          {/* Trust Badge */}
          <div className="inline-flex items-center space-x-2 bg-gray-800/60 backdrop-blur-md border border-gray-600/50 rounded-full px-4 py-2 mb-8 animate-fade-in-down">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">100% DSGVO-konform</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Ihre Kunden haben Fragen.{' '}
            <span className="bg-gradient-to-r from-[#e2642a] via-orange-400 to-[#e2642a] bg-clip-text text-transparent">
              Unser Chatbot liefert Antworten.
            </span>
          </h1>
          
          {/* Key Benefits with Icons */}
          <div className="space-y-4 mb-12 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-3 text-gray-300 transform hover:scale-105 transition-transform duration-200">
              <ArrowRight className="w-5 h-5 text-[#e2642a]" />
              <span className="text-lg">Sinkende Kosten durch Einsparung von Mitarbeitern</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-300 transform hover:scale-105 transition-transform duration-200">
              <ArrowRight className="w-5 h-5 text-[#e2642a]" />
              <span className="text-lg">Unabhängigkeit von der Leistung einzelner Mitarbeiter</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-300 transform hover:scale-105 transition-transform duration-200">
              <ArrowRight className="w-5 h-5 text-[#e2642a]" />
              <span className="text-lg">Verlässliche Qualität – unabhängig von der Tagesform</span>
            </div>
          </div>

          {/* Main CTA */}
          <div className="bg-gray-800/60 backdrop-blur-md border border-gray-600/50 rounded-2xl p-8 mb-12 max-w-2xl mx-auto transform hover:scale-105 transition-all duration-300 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://ihre-website.de"
                  className="w-full px-6 py-4 text-lg bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-400"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#e2642a] to-orange-600 text-white font-semibold py-4 px-8 rounded-xl text-lg hover:from-orange-600 hover:to-[#e2642a] transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Jetzt kostenlose Demo sichern</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
            
            <p className="text-sm text-gray-400 mt-4 flex items-center justify-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Unverbindlich. Keine Kreditkarte nötig.</span>
            </p>
          </div>

          {/* Trusted By */}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">1 Ziel</div>
              <div className="text-gray-300">Günstiger Support rund um die Uhr</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-300">Verfügbarkeit</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-gray-300">Kundenzufriedenheit</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">&lt;24h</div>
              <div className="text-gray-300">Setup-Zeit</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="relative py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={benefitsRef} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Vertrauen & Wirkung
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Automatisieren Sie Ihren Kundenservice und generieren Sie qualifizierte Leads – rund um die Uhr.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <AnimatedCard 
                key={index}
                delay={index * 0.1}
                className="bg-gray-800/40 backdrop-blur-md border border-gray-600/50 p-8 rounded-2xl hover:bg-gray-800/60 hover:scale-105 hover:border-[#e2642a]/50 transition-all duration-300 group shadow-xl"
              >
                <div className="mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-[#e2642a] transition-colors">{benefit.title}</h3>
                <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="relative py-24 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              So einfach funktioniert's
            </h2>
            <p className="text-xl text-gray-300">
              In nur 3 Schritten zu Ihrem persönlichen KI-Chatbot
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#e2642a] to-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-semibold text-white mb-4">Website analysieren</h3>
              <p className="text-gray-300">Geben Sie Ihre Website-URL ein. Wir analysieren Ihre Inhalte.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#e2642a] to-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-semibold text-white mb-4">Chatbot trainieren</h3>
              <p className="text-gray-300">Unser KI-System erstellt einen individuellen Chatbot basierend auf Ihren Daten und Produkten.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#e2642a] to-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-semibold text-white mb-4">Demo erhalten</h3>
              <p className="text-gray-300">Binnen 24 Stunden erhalten Sie Ihre personalisierte Demo zum kostenlosen Testen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={featuresRef} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Mehr als nur ein Chatbot
            </h2>
            <p className="text-xl text-gray-300">
              Entdecken Sie die vielfältigen Möglichkeiten unserer KI-Lösung
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-900/40 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-[#e2642a]/30 transition-colors">
                    <Globe className="w-6 h-6 text-[#e2642a]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Website-Integration</h3>
                    <p className="text-gray-300">Nahtlose Einbindung in Ihre bestehende Website mit nur einem Code-Snippet.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-900/40 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-[#e2642a]/30 transition-colors">
                    <Phone className="w-6 h-6 text-[#e2642a]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Telefonassistent</h3>
                    <p className="text-gray-300">Automatische Anrufbearbeitung mit natürlicher Spracherkennung und intelligenten Antworten.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-900/40 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-[#e2642a]/30 transition-colors">
                    <Shield className="w-6 h-6 text-[#e2642a]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Barrierefreiheit</h3>
                    <p className="text-gray-300">WCAG-konforme Bedienung für alle Nutzer mit Screenreader-Unterstützung und Tastaturnavigation.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slide-in-right">
              <div className="bg-gradient-to-br from-[#e2642a] to-orange-600 rounded-2xl p-8 text-white transform hover:scale-105 transition-transform duration-300 shadow-2xl backdrop-blur-sm">
                <div className="space-y-6">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                       <img
                        src="/kundeLogoWebsite.jpg"
                        alt="QuickStartAI ChatBot"
  className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="text-sm">Kunde fragt...</div>
                    </div>
                    <div className="text-sm opacity-90">"Ich bin mir noch nicht sicher, ob das überhaupt zu mir passt…"</div>
                  </div>
                  
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <img
                        src="public/ihrLogoHier.png"
                        alt="QuickStartAI ChatBot"
  className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="text-sm">Ihr Chatbot antwortet...</div>
                    </div>
                    <div className="text-sm opacity-90">"Kein Problem – viele Kunden starten genau mit dieser Frage.
Wenn Sie möchten, zeige ich Ihnen ein paar typische Anwendungsbeispiele oder sende Ihnen ein unverbindliches Angebot, damit Sie in Ruhe entscheiden können."</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section id="faq" className="relative py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Häufig gestellte Fragen
            </h2>
            <p className="text-xl text-gray-300">
              Alles was Sie über unsere KI-Chatbots wissen müssen
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800/40 backdrop-blur-md border border-gray-600/50 rounded-xl shadow-lg">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-800/60 transition-colors rounded-xl"
                >
                  <span className="font-semibold text-white">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
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
            Bereit für Ihren KI-Chatbot?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Starten Sie jetzt kostenlos und unverbindlich. Ihre Demo ist in 24 Stunden bereit.
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
                <span>Jetzt Demo anfordern</span>
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
                <img 
                  src="/src/assets/Firmenlogo-removebg-preview.png" 
                  alt="QuickStartAI Logo" 
                  className="h-8 w-auto mr-2"
                />
                <span className="text-xl font-bold">QuickStartAI</span>
              </div>
              <p className="text-gray-300">
                Ihre Experten für KI-Chatbots und automatisierte Kundenkommunikation.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produkt</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#benefits" className="hover:text-white transition-colors">Vorteile</a></li>
                <li><Link to="/sales#pricing" className="hover:text-white transition-colors">Preise</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Integration</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dokumentation</a></li>
                <li><button onClick={() => setShowContactForm(true)} className="hover:text-white transition-colors">Kontakt</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Unternehmen</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Über uns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><Link to="/sales" className="hover:text-white transition-colors">Sales</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Partner</a></li>
              </ul>
            </div>
          </div>
          
          {/* Geschäftsführer Section */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
  <img
  src="/ProfilBild.jpg"
  alt="Profilbild Maximilian Theele"
  className="w-16 h-16 rounded-full object-cover"
/>

                </div>
                <div>
                  <div className="font-semibold text-white">Maximilian Theele</div>
                  <div className="text-gray-300">Geschäftsführer</div>
                </div>
              </div>
              <div className="text-center text-gray-300">
                <p>&copy; 2024 QuickStartAI. Alle Rechte vorbehalten.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showDemoModal && (
        <DemoModal 
          websiteUrl={websiteUrl}
          onClose={() => setShowDemoModal(false)}
        />
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
      </Routes>
    </Router>
  );
}

export default App;