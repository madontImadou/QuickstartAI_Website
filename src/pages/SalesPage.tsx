import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Users, 
  TrendingUp, 
  Zap, 
  Shield,
  CheckCircle,
  Star,
  Building,
  Target,
  Briefcase,
  Globe
} from 'lucide-react';
import { saveSalesInquiry } from '../services/databaseService';

const SalesPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showPhoneAssistant, setShowPhoneAssistant] = useState(false);

  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    employees: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Input validation
    if (!formData.company.trim() || !formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }
    
    // Phone validation (if provided)
    if (formData.phone && !/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
      alert('Bitte geben Sie eine gültige Telefonnummer ein.');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const success = await saveSalesInquiry({
        company: formData.company,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        employees: formData.employees,
        budget: formData.budget,
        message: formData.message
      });

      if (success) {
        setIsSubmitted(true);
      } else {
        alert('Fehler beim Speichern der Anfrage. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.');
      }
    } catch (error) {
      console.error('Fehler beim Speichern der Sales-Anfrage:', error);
      alert('Fehler beim Speichern der Anfrage. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const chatbotPackages = [
    {
      name: "Starter",
      price: "€30",
      period: "/Monat",
      description: "Ideal für kleine Unternehmen",
      features: [
        "1 KI-Chatbot",
        "Wir pflegen 100 URLs als Datengrundlage ein",
        "Website-Integration",
        "3 Monate Mindestlaufzeit",
      ],
      color: "from-gray-600 to-gray-700"
    },
    {
      name: "Professional",
      price: "€90",
      period: "/Monat",
      description: "Ideal für wachsende Unternehmen",
      features: [
        "Wir pflegen 150 URLs als Datengrundlage ein",
        "Sprachintegration",
        "Weitere Datenquellen integrierbar",
        "Sitemap, Datei-Upload, Text & Zendesk",
        "Priority Support",
        "Monatlich kündbar",
        "Integration in bestehende Workflows möglich"
      ],
      color: "from-[#e2642a] to-[#f97316]",
      popular: true
    },
    {
      name: "Enterprise",
      price: "€150",
      period: "/Monat",
      description: "Maßgeschneiderte Lösungen",
      features: [
        "Unbegrenzte URLs als Datengrundlage",
        "Alle Features des Professional-Plans inklusive",
        "Custom AI Training",
        "Multi-Language Support",
        "Dedicated Account Manager",
        "24/7 Phone Support",
        "White-Label Option"
      ],
      color: "from-purple-600 to-purple-700"
    }
  ];

  const phoneAssistantPackages = [
    {
      name: "Starter",
      price: "€50",
      period: "/Monat",
      description: "Ideal für kleine Unternehmen",
      features: [
        "1 KI-Telefonassistent",
        "Wir pflegen 100 URLs als Datengrundlage ein",
        "Automatische Anrufbearbeitung",
        "Natürliche Spracherkennung",
        "Basis-Gesprächsprotokoll",
        "3 Monate Mindestlaufzeit",
      ],
      color: "from-gray-600 to-gray-700"
    },
    {
      name: "Professional",
      price: "€150",
      period: "/Monat",
      description: "Ideal für wachsende Unternehmen",
      features: [
        "Wir pflegen 150 URLs als Datengrundlage ein",
        "Erweiterte Sprachintegration",
        "WhatsApp & Telefon kombiniert",
        "Automatische Terminbuchung",
        "CRM-Integration", 
        "Priority Support",
        "Monatlich kündbar"
      ],
      color: "from-[#e2642a] to-[#f97316]",
      popular: true
    },
    {
      name: "Enterprise",
      price: "€250",
      period: "/Monat",
      description: "Maßgeschneiderte Lösungen",
      features: [
        "Unbegrenzte URLs als Datengrundlage",
        "Alle Features des Professional-Plans inklusive",
        "Multi-Line Telefonsystem",
        "Custom Voice Training",
        "Mehrsprachige Assistenten",
        "Advanced Call Routing",
        "Dedicated Account Manager",
        "24/7 Phone Support",
        "White-Label Option"
      ],
      color: "from-purple-600 to-purple-700"
    }
  ];

  const currentPackages = showPhoneAssistant ? phoneAssistantPackages : chatbotPackages;

  const benefits = [
    {
      icon: <Users className="w-8 h-8 text-[#e2642a]" />,
      title: "Skalierbare Lösungen",
      description: "Von Einzelunternehmen bis Konzern - unsere KI-Chatbots wachsen mit Ihrem Business."
    },
    {
      icon: <Shield className="w-8 h-8 text-[#e2642a]" />,
      title: "Enterprise Security",
      description: "DSGVO-konforme Datenverarbeitung und höchste Sicherheitsstandards."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#e2642a]" />,
      title: "ROI-Garantie",
      description: "Messbare Ergebnisse durch detaillierte Analytics und Performance-Tracking."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-[#e2642a]" />,
      title: "Dedicated Support",
      description: "Persönlicher Ansprechpartner und 24/7 Support für Enterprise-Kunden."
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Anfrage gesendet!</h2>
          <p className="text-gray-600 mb-6">
            Vielen Dank für Ihr Interesse! Ihre Anfrage wurde erfolgreich gespeichert. Unser Sales-Team meldet sich innerhalb von 24 Stunden bei Ihnen.
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-[#e2642a] hover:text-[#d55a26] font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zur Startseite</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-blue-400 hover:text-blue-300">
              <ArrowLeft className="w-5 h-5" />
              <span>Zurück zur Startseite</span>
            </Link>
            <div className="flex items-center">
              <img 
                src="/Firmenlogo-removebg-preview.png" 
                alt="QuickStartAI Logo" 
                className="h-16 w-auto mr-2"
              />
              <span className="text-xl font-bold text-white">QuickStartAI Sales</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-gray-800 to-orange-800/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Enterprise KI-Lösungen für{' '}
            <span className="bg-gradient-to-r from-[#e2642a] to-orange-400 bg-clip-text text-transparent">
              Ihr Unternehmen
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-medium">
            Skalierbare KI-Chatbot-Lösungen für Unternehmen jeder Größe. 
            Von der ersten Demo bis zur vollständigen Integration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-gradient-to-r from-[#e2642a] to-orange-600 text-white font-semibold py-4 px-8 rounded-xl text-lg hover:from-orange-600 hover:to-[#e2642a] transition-all duration-200 inline-flex items-center justify-center space-x-2"
            >
              <span>Beratungstermin vereinbaren</span>
              <Phone className="w-5 h-5" />
            </a>
            <a
              href="mailto:sales@quickstart.ai.de"
              className="border-2 border-white text-white font-semibold py-4 px-8 rounded-xl text-lg hover:bg-white hover:text-gray-900 transition-all duration-200 inline-flex items-center justify-center space-x-2"
            >
              <span>E-Mail senden</span>
              <Mail className="w-5 h-5" />
            </a>
          </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Warum Unternehmen QuickStartAI wählen
            </h2>
            <p className="text-xl text-white/80 font-medium">
              Vertrauen Sie auf unsere Expertise und bewährte Enterprise-Lösungen
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-900/80 backdrop-blur-sm border border-gray-600 p-8 rounded-2xl hover:bg-gray-900 hover:border-[#e2642a]/50 transition-all duration-300">
                <div className="mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-4">{benefit.title}</h3>
                <p className="text-gray-200">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {showPhoneAssistant ? 'Telefonassistenten-Preise von €50 bis €250 monatlich' : 'Preise von €30 bis €150 monatlich'}
            </h2>
            <p className="text-xl text-white/80 font-medium">
              Lassen Sie uns gerne mal unterhalten, damit wir herausfinden, was das Richtige für Sie wäre
            </p>
            
            {/* Toggle Switch */}
            <div className="mt-8 flex items-center justify-center space-x-4">
              <span className={`text-lg font-medium transition-colors ${!showPhoneAssistant ? 'text-white' : 'text-gray-400'}`}>
                Website-Chatbots
              </span>
              <button
                onClick={() => setShowPhoneAssistant(!showPhoneAssistant)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#e2642a] focus:ring-offset-2 focus:ring-offset-gray-900 ${
                  showPhoneAssistant ? 'bg-[#e2642a]' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showPhoneAssistant ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-lg font-medium transition-colors ${showPhoneAssistant ? 'text-white' : 'text-gray-400'}`}>
                Sprach- & Telefonassistenten
              </span>
            </div>
            
            <div className="mt-6 bg-orange-900/30 border border-orange-500/50 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-orange-200 font-medium">
                ℹ️ Zusätzlich fällt eine einmalige Einrichtungsgebühr von mindestens €80 an (je nach Aufwand)
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {currentPackages.map((pkg, index) => (
              <div key={index} className={`relative bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-2xl hover:bg-gray-800 hover:border-[#e2642a]/50 transition-all duration-300 flex flex-col ${pkg.popular ? 'ring-2 ring-[#e2642a] scale-105' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#e2642a] to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Beliebteste Wahl
                    </span>
                  </div>
                )}
                
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-gray-200 mb-6">{pkg.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">{pkg.price}</span>
                    <span className="text-gray-200">{pkg.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-200">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 text-center block mt-auto ${
                      pkg.popular 
                        ? 'bg-gradient-to-r from-[#e2642a] to-orange-600 text-white hover:from-orange-600 hover:to-[#e2642a]'
                        : 'border-2 border-[#e2642a] text-[#e2642a] hover:bg-[#e2642a] hover:text-white'
                    }`}
                  >
                    Jetzt anfragen
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Lassen Sie uns über Ihr Projekt sprechen
            </h2>
            <p className="text-xl text-white/80 font-medium">
              Unser Sales-Team berät Sie gerne zu den passenden KI-Lösungen für Ihr Unternehmen
            </p>
          </div>

          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-600 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4" />
                      <span>Unternehmen *</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#e2642a] focus:border-transparent outline-none text-white placeholder-gray-400"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#e2642a] focus:border-transparent outline-none text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    E-Mail-Adresse *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#e2642a] focus:border-transparent outline-none text-white placeholder-gray-400"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#e2642a] focus:border-transparent outline-none text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="employees" className="block text-sm font-medium text-white mb-2">
                    Anzahl Mitarbeiter
                  </label>
                  <select
                    id="employees"
                    name="employees"
                    value={formData.employees}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#e2642a] focus:border-transparent outline-none text-white"
                  >
                    <option value="">Bitte wählen</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-1000">201-1000</option>
                    <option value="1000+">1000+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-white mb-2">
                    Budget (monatlich)
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#e2642a] focus:border-transparent outline-none text-white"
                  >
                    <option value="">Bitte wählen</option>
                    <option value="<500">Unter €500</option>
                    <option value="500-1000">€500 - €1.000</option>
                    <option value="1000-2500">€1.000 - €2.500</option>
                    <option value="2500-5000">€2.500 - €5.000</option>
                    <option value="5000+">Über €5.000</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Nachricht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#e2642a] focus:border-transparent outline-none resize-vertical text-white placeholder-gray-400"
                  placeholder="Beschreiben Sie Ihre Anforderungen und Ziele..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#e2642a] to-orange-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-orange-600 hover:to-[#e2642a] transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Anfrage speichern</span>
                    <Mail className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-700 text-center">
              <p className="text-white/80 mb-4">Oder kontaktieren Sie uns direkt:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:info@quickstartai.de"
                  className="flex items-center justify-center space-x-2 text-[#e2642a] hover:text-orange-400 font-medium"
                >
                  <Mail className="w-4 h-4" />
                  <span>info@quickstartai.de</span>
                </a>
              </div>
              <p className="text-xs text-white/60 mt-4">
                Ihre Anfrage wird sicher in unserer Datenbank gespeichert und vertraulich behandelt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/Firmenlogo-removebg-preview.png" 
              alt="QuickStartAI Logo" 
              className="h-16 w-auto mr-2"
            />
            <span className="text-xl font-bold">QuickStartAI</span>
          </div>
          <p className="text-white/80 mb-4">
            Enterprise KI-Lösungen für moderne Unternehmen
          </p>
          <p className="text-white/60">
            &copy; 2025 QuickStartAI. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SalesPage;