import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Zap,
  CheckCircle,
  ArrowRight,
  Clock,
  ChevronDown,
  Menu,
  X,
  Calendar,
  BarChart2,
  BookOpen,
  UserCheck,
  Headphones,
  RefreshCw,
  Filter,
  TrendingDown,
} from "lucide-react";

import { useFadeInUp, useSlideReveal } from "./hooks/useScrollAnimation";
import { saveContactRequest } from "./services/databaseService";
import LoadingScreen from "./components/LoadingScreen";
import SmoothScroll from "./components/SmoothScroll";
import ContactForm from "./components/ContactForm";
import AnimatedCard from "./components/AnimatedCard";
import SlideRevealCard from "./components/SlideRevealCard";
import SalesPage from "./pages/SalesPage";
import PrivacyPage from "./pages/PrivacyPage";
import ImpressumPage from "./pages/ImpressumPage";
import AGBPage from "./pages/AGBPage";
import BlogIndex from "./pages/BlogIndex";
import BlogKIAgentenErstellen from "./pages/BlogKIAgentenErstellen";
import KiDemoPage from "./pages/KiDemoPage";

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [activeMethod, setActiveMethod] = useState(0);
  const [scheduleData, setScheduleData] = useState({
    name: "",
    email: "",
    phone: "",
    reachability: "",
  });
  const [isScheduleSubmitting, setIsScheduleSubmitting] = useState(false);
  const [isScheduleSubmitted, setIsScheduleSubmitted] = useState(false);
  const methodRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Scrollposition merken, damit man beim Neuladen dort weitermacht
  useEffect(() => {
    const key = `scrollPos:${window.location.pathname}`;
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        sessionStorage.setItem(key, String(window.scrollY));
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const key = `scrollPos:${window.location.pathname}`;
    const saved = sessionStorage.getItem(key);
    if (saved) {
      const y = parseInt(saved, 10);
      requestAnimationFrame(() => window.scrollTo(0, y));
    }
  }, [isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = methodRefs.current.findIndex(
              (el) => el === entry.target,
            );
            if (index !== -1) setActiveMethod(index);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    methodRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [isLoading]);

  const heroRef = useFadeInUp();

  const problemEyebrowRef = useSlideReveal(0);
  const problemTitleRef = useSlideReveal(2);

  const featuresEyebrowRef = useSlideReveal(0);
  const featuresTitleRef = useSlideReveal(2);
  const featuresTextRef = useSlideReveal(4);

  const arbeitsweiseEyebrowRef = useSlideReveal(0);
  const arbeitsweiseTitleRef = useSlideReveal(2);

  const ueberUnsEyebrowRef = useSlideReveal(0);
  const ueberUnsTitleRef = useSlideReveal(2);

  const prozessEyebrowRef = useSlideReveal(0);
  const prozessTitleRef = useSlideReveal(2);

  const resultsEyebrowRef = useSlideReveal(0);
  const resultsTitleRef = useSlideReveal(2);

  const faqEyebrowRef = useSlideReveal(0);
  const faqTitleRef = useSlideReveal(2);
  const faqTextRef = useSlideReveal(4);

  const zusammenarbeitEyebrowRef = useSlideReveal(0);
  const zusammenarbeitTitleRef = useSlideReveal(2);

  const ctaTitleRef = useSlideReveal(0);
  const ctaTextRef = useSlideReveal(2);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleScheduleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setScheduleData({ ...scheduleData, [e.target.name]: e.target.value });
  };

  const handleScheduleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !scheduleData.name.trim() ||
      !scheduleData.email.trim() ||
      !scheduleData.phone.trim()
    ) {
      alert("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(scheduleData.email)) {
      alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }

    setIsScheduleSubmitting(true);

    try {
      const success = await saveContactRequest({
        name: scheduleData.name,
        email: scheduleData.email,
        phone: scheduleData.phone,
        reachability: scheduleData.reachability,
        message: `Terminanfrage – erreichbar: ${scheduleData.reachability || "keine Angabe"}`,
      });

      if (success) {
        setIsScheduleSubmitted(true);
      } else {
        alert(
          "Fehler beim Senden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.",
        );
      }
    } catch (error) {
      console.error("Fehler beim Senden der Terminanfrage:", error);
      alert(
        "Fehler beim Senden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.",
      );
    } finally {
      setIsScheduleSubmitting(false);
    }
  };

  const problems = [
    {
      icon: <Clock className="w-7 h-7 text-[#e2642a]" />,
      title: "Anfragen verschwinden...",
      description:
        "da Interessenten bei Rückrufen nicht erreichbar sind.",
    },
    {
      icon: <RefreshCw className="w-7 h-7 text-[#e2642a]" />,
      title: "Tägliche neue Rückruflisten",
      description: "kosten wertvolle Zeit, die für Patienten und Kunden fehlt.",
    },
    {
      icon: <Filter className="w-7 h-7 text-[#e2642a]" />,
      title: "Hoher Personalaufwand...",
      description:
        "jede Anfrage manuell beantwortet, nachverfolgt und dokumentiert werden muss.",
    },
    {
      icon: <TrendingDown className="w-7 h-7 text-[#e2642a]" />,
      title: "Anfragen bleiben ungenutzt...",
      description:
        "langsame Antworten die Wahrscheinlichkeit für einen echten Termin oder Kauf drastisch senken.",
    },
  ];

  const systemPillars = [
    {
      icon: <Zap className="w-7 h-7 text-[#e2642a]" />,
      title: "Sofortantworten...",
      description:
        "jede Anfrage innerhalb von 5 Sekunden – auf Telefon, Instagram, WhatsApp und Website.",
    },
    {
      icon: <BookOpen className="w-7 h-7 text-[#e2642a]" />,
      title: "Versteht Ihr Fachgebiet -",
      description:
        "und beantwortet Fragen zu Leistungen, Preisen und Abläufen präzise wie ein erfahrener Mitarbeiter.",
    },
    {
      icon: <Calendar className="w-7 h-7 text-[#e2642a]" />,
      title: "Übernimmt die Erstqualifizierung..",
      description:
        "begrüßt Interessenten, stellt Rückfragen und bereitet jede Anfrage optimal vor.",
    },
    {
      icon: <BarChart2 className="w-7 h-7 text-[#e2642a]" />,
      title: "Live-Übergabe & Analytics",
      description: "Übergabe an Ihr Team bei Bedarf, plus laufende Auswertung.",
    },
  ];

  const workingMethods = [
    {
      tag: "Austausch",
      title: "Live-Demo Ihres Systems",
      icon: <UserCheck className="w-7 h-7 text-[#e2642a]" />,
      description:
        "Wir bereiten Ihr System mit Ihren Website-Daten vor – Sie testen es anschließend live.",
      points: ["Kennenlerngespräch", "Experteneinschätzung", "10 min"],
      highlight: false,
    },
    {
      tag: "Done-for-You",
      title: "Einführung & Abnahme",
      icon: <Headphones className="w-7 h-7 text-[#e2642a]" />,
      description:
        "Wir richten Ihre System gemeinsam ein, verbinden alle Kanäle und sorgen dafür, dass Sie und Ihr Team sofort produktiv starten können.",
      points: ["Setup durch Experten", "20 min"],
      highlight: true,
    },
    {
      tag: "Support",
      title: "Laufende Betreuung",
      icon: <UserCheck className="w-7 h-7 text-[#e2642a]" />,
      description: "Wir begleiten Sie auch nach dem Go-Live.",
      points: ["Monatliches Review", "∞"],
      highlight: false,
    },
  ];

  const testimonials = [
    {
      name: "Christina",
      role: "Heilpraktikerin",
      image: "/Reviews/Kunde1_Picture_Aesthetik.jpg",
      stat: "64 Beratungstermine in einer Woche",
      quote:
        "Wir haben in den letzten Woche 64 Beratungstermine generiert. Ich freue mich wirklich sehr darüber. Unser Team kann sich endlich auf die Termine konzentrieren 🔥",
    },
    {
      name: "Julia",
      role: "Ästhetik-Praxis",
      image: "/Reviews/Kunde2_Picture.jpg",
      stat: "100% Antwortquote",
      quote:
        "Vorher sind uns immer wieder Anfragen durchgerutscht. Durch euch wird jetzt jeder Interessent sofort kontaktiert wir verlieren keine Anfragen mehr. Danke",
    },
    {
      name: "Martin",
      role: "Schönheitschirurgie",
      image: "/Reviews/Kunde3_Picture_Aesthetik.jpg",
      stat: "17 → 29 Termine pro Woche",
      quote:
        "Wir haben auf jeden Fall einen Anstieg bei den Terminen festgestellt 👍 Letzte Woche waren es 17 und diese Woche 29.",
    },
  ];

  const processSteps = [
    {
      title: "Quiz ausfüllen",
      description:
        " um zu prüfen, ob ein Termin für beideseiten Sinn ergibt.",
    },
    {
      title: "Kurzgespräch",
      description:
        "Wir zeigen Ihnen, wie unser System Ihre Erreichbarkeit neu definiert.",
    },
    {
      title: "Setup & Testphase",
      description:
        "Wir richten Ihr System ein und starten gemeinsam Ihre kostenlose 2-wöchige Testphase.",
    },
  ];

  const faqs = [
    {
      question: "Funktioniert das bei uns überhaupt?",
      answer:
        "Das System eignet sich für Unternehmen/Praxen, die regelmäßig Anfragen erhalten die sie nicht direkt bearbeiten können.",
    },
    {
      question: "Wie aufwändig ist die Einrichtung des Systems?",
      answer:
        "Nach der Einrichtung ist Ihr System in der Regel innerhalb von 24 Stunden startklar. Das Setup übernehmen wir gemeinsam mit Ihnen.",
    },
    {
      question: "Ersetzt das System mein Team?",
      answer:
        "Nein. QuickStartAI unterstützt Ihr Team, beantwortet wiederkehrende Anfragen, qualifiziert Interessenten und ist erreichbar, wenn niemand verfügbar ist."
    },
    {
      question: "Kann ich das System erst testen?",
      answer:
        "Ja, wir bieten eine kostenlose 2-wöchige Testphase an, in der Sie unsere Lösung kostenlos ausprobieren können.",
    }
  ];

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                src="/Firmenlogo-removebg-preview.png"
                alt="QuickStartAI Logo"
                className="h-20 w-auto mr-3"
              />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#system"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Unser System
              </a>
              <a
                href="#ergebnisse"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Ergebnisse
              </a>
              <a
                href="#faq"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                FAQ
              </a>
            </div>

            <button
              onClick={() => setShowContactForm(true)}
              className="hidden md:inline-flex bg-[#e2642a] text-white px-6 py-2.5 rounded-full hover:bg-orange-600 transition-all duration-200 font-medium"
            >
              Zusammenarbeit anfragen
            </button>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-2">
                <a
                  href="#system"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-600 hover:text-gray-900 transition-colors py-2"
                >
                  Unser System
                </a>
                <a
                  href="#ergebnisse"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-600 hover:text-gray-900 transition-colors py-2"
                >
                  Ergebnisse
                </a>
                <a
                  href="#faq"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-600 hover:text-gray-900 transition-colors py-2"
                >
                  FAQ
                </a>
                <button
                  onClick={() => {
                    setShowContactForm(true);
                    setIsMenuOpen(false);
                  }}
                  className="bg-[#e2642a] text-white px-6 py-2.5 rounded-full hover:bg-orange-600 transition-colors w-fit mt-2"
                >
                  Zusammenarbeit anfragen
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

        <div
          ref={heroRef}
          className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div
            className="inline-flex items-center space-x-2 bg-white border border-gray-200 rounded-full px-4 py-2 mb-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0ms" }}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">
              Für Aesthetik Praxen und Kliniken
            </span>
          </div>

          <h1
            className="font-serif italic text-4xl md:text-6xl text-gray-900 mb-6 leading-tight opacity-0 animate-fade-in-up"
            style={{ animationDelay: "400ms" }}
          >
            Damit Sie auch außerhalb der{" "}
            <span className="bg-gradient-to-r from-[#e2642a] via-orange-400 to-[#e2642a] bg-clip-text text-transparent">
              Öffnungszeiten erreichbar sind.
            </span>
          </h1>

          <p
            className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up"
            style={{ animationDelay: "800ms" }}
          >
            Beantworten und qualifizieren Sie jede neue Anfrage innerhalb von 5
            Sekunden.{" "}
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "1200ms" }}
          >
            <button
              onClick={() => setShowContactForm(true)}
              className="bg-[#e2642a] text-white font-semibold py-4 px-10 rounded-xl text-lg hover:bg-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <span>Quiz starten</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#ergebnisse"
              className="bg-white text-gray-900 font-semibold py-4 px-10 rounded-xl text-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center space-x-2"
            >
              <span>Kundenergebnisse</span>
            </a>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="relative py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="scroll-mouse flex justify-center">
                <div className="scroll-mouse-line"></div>
              </div>
            </div>
            <div
              ref={problemEyebrowRef}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <span className="h-px w-8 bg-[#e2642a]/50"></span>
              <span className="text-xs font-semibold tracking-widest text-[#e2642a] uppercase">
                Das eigentliche Problem
              </span>
              <span className="h-px w-8 bg-[#e2642a]/50"></span>
            </div>
            <h2
              ref={problemTitleRef}
              className="font-serif italic text-3xl md:text-4xl text-gray-900"
            >
              Kennen Sie das?
            </h2>
          </div>

          <div className="relative max-w-5xl mx-auto bg-gray-900 rounded-2xl overflow-hidden">
            {/* Subtle grid overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                maskImage:
                  "radial-gradient(ellipse at center, black 0%, transparent 70%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, black 0%, transparent 70%)",
              }}
            />
            {/* Glow blob */}
            <div
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-20"
              style={{
                background:
                  "radial-gradient(ellipse, #e2642a 0%, transparent 70%)",
              }}
            />

            <div className="relative grid md:grid-cols-2 gap-4 md:gap-6 p-4 md:p-8">
              {problems.map((problem, index) => (
                <AnimatedCard
                  key={index}
                  delay={index}
                  className="p-8 md:p-10 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6">
                    {problem.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {problem.description}
                  </p>
                </AnimatedCard>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <a
              href="#system"
              className="inline-flex items-center justify-center bg-[#e2642a] text-white font-semibold py-3 px-8 rounded-full hover:bg-orange-600 transition-all duration-200"
            >
              Kenn ich...
            </a>
          </div>
        </div>
      </section>

      {/* System Section */}
      <section id="system" className="relative py-24 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              ref={featuresEyebrowRef}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <span className="h-px w-8 bg-[#e2642a]/50"></span>
              <span className="text-xs font-semibold tracking-widest text-[#e2642a] uppercase">
                Das System
              </span>
              <span className="h-px w-8 bg-[#e2642a]/50"></span>
            </div>
            <h2
              ref={featuresTitleRef}
              className="font-serif italic text-3xl md:text-4xl text-white mb-6 max-w-3xl mx-auto leading-tight"
            >
              Ihr Team hat <span className="text-[#e2642a]">Feierabend.</span>{" "}
              Ihr System nicht.
            </h2>
            <p
              ref={featuresTextRef}
              className="text-gray-400 max-w-2xl mx-auto"
            >
              Ich helfe Unternehmen und Praxen dabei keine Anfragen mehr
              unbemerkt zu verpassen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {systemPillars.map((pillar, index) => (
              <SlideRevealCard
                key={index}
                delay={index}
                className={`relative overflow-hidden bg-gray-800/50 border border-gray-700 rounded-2xl p-8 ${index === 0 ? "md:col-span-2 md:flex md:items-center md:gap-8" : index === 3 ? "md:col-span-2 md:flex md:items-center md:gap-8" : ""}`}
              >
                <div className={index === 0 || index === 3 ? "flex-1" : ""}>
                  <div className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center mb-6">
                    {pillar.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {pillar.description}
                  </p>
                </div>
                {index === 0 && (
                  <div className="mt-6 md:mt-0 w-full md:w-64 aspect-[2358/1662] rounded-xl border border-white/10 shadow-lg shrink-0 overflow-hidden">
                    <video
                      className="w-full h-full object-cover"
                      src="/SofortAntwort-final.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  </div>
                )}
                {index === 3 && (
                  <div className="mt-6 md:mt-0 w-full md:w-64 rounded-xl border border-white/10 shadow-lg shrink-0 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src="/handoverNew.png"
                      alt="Live-Übergabe & Analytics"
                    />
                  </div>
                )}
              </SlideRevealCard>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setShowContactForm(true)}
              className="inline-flex items-center justify-center bg-[#e2642a] text-white font-semibold py-3 px-8 rounded-full hover:bg-orange-600 transition-all duration-200"
            >
              Jetzt System sichern
            </button>
          </div>
        </div>
      </section>

      {/* Arbeitsweise Section */}
      <section id="arbeitsweise" className="relative py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              ref={arbeitsweiseEyebrowRef}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <span className="h-px w-8 bg-[#e2642a]/50"></span>
              <span className="text-xs font-semibold tracking-widest text-[#e2642a] uppercase">
                So arbeiten wir
              </span>
              <span className="h-px w-8 bg-[#e2642a]/50"></span>
            </div>
            <h2
              ref={arbeitsweiseTitleRef}
              className="font-serif italic text-3xl md:text-4xl text-gray-900"
            >
              Sie fragen sich, wie das Ganze abläuft?
            </h2>
          </div>

          <div className="relative pl-10 md:pl-14">
            <div className="space-y-6">
              {workingMethods.map((method, index) => {
                const active = activeMethod === index;
                return (
                  <div key={index} className="relative">
                    {index < workingMethods.length - 1 && (
                      <div className="absolute -left-10 md:-left-14 top-14 bottom-6 w-4 flex justify-center">
                        <span className="w-px bg-gray-900"></span>
                      </div>
                    )}
                    <span className="absolute -left-10 md:-left-14 top-10 w-4 h-4 flex items-center justify-center">
                      {active && (
                        <span className="absolute w-8 h-8 rounded-full bg-[#e2642a]/20"></span>
                      )}
                      <span
                        className={`relative w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          active
                            ? "bg-white border-[#e2642a]"
                            : "bg-gray-900 border-gray-900"
                        }`}
                      >
                        {active && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#e2642a]"></span>
                        )}
                      </span>
                    </span>
                    <div
                      ref={(el) => {
                        methodRefs.current[index] = el;
                      }}
                      className={`rounded-2xl p-8 md:p-10 border transition-colors duration-1000 relative ${
                        active
                          ? "bg-gray-900 border-gray-800"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div
                        className={
                          index === 0 || index === 1 || index === 2
                            ? "grid md:grid-cols-2 gap-8 md:gap-10 items-center"
                            : ""
                        }
                      >
                        <div>
                          <div
                            className={`text-xs mb-2 flex items-center gap-2 transition-colors duration-1000 ${active ? "text-gray-500" : "text-gray-400"}`}
                          >
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            <span
                              className={
                                active ? "text-[#e2642a]" : "text-[#e2642a]"
                              }
                            >
                              {method.tag}
                            </span>
                          </div>
                          <h3
                            className={`text-2xl font-bold mb-3 transition-colors duration-1000 ${active ? "text-white" : "text-gray-900"}`}
                          >
                            {method.title}
                          </h3>
                          <p
                            className={`mb-6 leading-relaxed transition-colors duration-1000 ${active ? "text-gray-400" : "text-gray-600"}`}
                          >
                            {method.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {method.points.map((point, i) => (
                              <span
                                key={i}
                                className={`inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border transition-colors duration-1000 ${
                                  active
                                    ? "border-gray-700 text-gray-300"
                                    : "border-gray-200 text-gray-600"
                                }`}
                              >
                                <CheckCircle className="w-3.5 h-3.5 text-[#e2642a] flex-shrink-0" />
                                {point}
                              </span>
                            ))}
                          </div>
                        </div>

                        {index === 0 && (
                          <div className="rounded-xl border border-gray-800 bg-gray-950 overflow-hidden">
                            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-white text-xs font-medium">
                                  Kennenlernen &amp; Demo-Call
                                </span>
                              </div>
                              <span className="text-gray-500 text-xs font-mono">
                                32:14
                              </span>
                            </div>

                            <div className="flex items-center justify-center gap-8 py-8">
                              <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 rounded-full bg-[#e2642a] flex items-center justify-center text-white text-sm font-semibold">
                                  M
                                </div>
                                <div className="text-center">
                                  <div className="text-white text-xs font-semibold">
                                    Maxi
                                  </div>
                                  <div className="text-gray-500 text-[11px]">
                                    Gründer
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white text-sm font-semibold">
                                  Du
                                </div>
                                <div className="text-center">
                                  <div className="text-white text-xs font-semibold">
                                    Du
                                  </div>
                                  <div className="text-gray-500 text-[11px]">
                                    Ansprechpartner
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-center gap-2.5 px-5 pb-5">
                              <button
                                type="button"
                                aria-label="Mikrofon"
                                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-gray-700 transition-colors"
                              >
                                <svg
                                  className="w-3.5 h-3.5"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <rect
                                    x="9"
                                    y="2"
                                    width="6"
                                    height="12"
                                    rx="3"
                                  />
                                  <path d="M5 10a7 7 0 0 0 14 0" />
                                  <path d="M12 19v3" />
                                </svg>
                              </button>
                              <button
                                type="button"
                                aria-label="Kamera"
                                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-gray-700 transition-colors"
                              >
                                <svg
                                  className="w-3.5 h-3.5"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <rect
                                    x="2"
                                    y="6"
                                    width="14"
                                    height="12"
                                    rx="2"
                                  />
                                  <path d="M16 10l6-3v10l-6-3" />
                                </svg>
                              </button>
                              <button
                                type="button"
                                aria-label="Bildschirm teilen"
                                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-gray-700 transition-colors"
                              >
                                <svg
                                  className="w-3.5 h-3.5"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <rect
                                    x="2"
                                    y="4"
                                    width="20"
                                    height="13"
                                    rx="2"
                                  />
                                  <path d="M8 21h8M12 17v4" />
                                </svg>
                              </button>
                              <button
                                type="button"
                                onClick={() => setShowContactForm(true)}
                                aria-label="Gespräch buchen"
                                className="w-9 h-9 rounded-full bg-[#e2642a] flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                              >
                                <svg
                                  className="w-3.5 h-3.5"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.79.63 2.65a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.43-1.2a2 2 0 0 1 2.11-.45c.86.3 1.75.51 2.65.63A2 2 0 0 1 22 16.92z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        )}

                        {index === 1 && (
                          <div className="rounded-xl border border-gray-800 bg-gray-950 overflow-hidden">
                            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-white text-xs font-medium">
                                  Setup &amp; Einrichtung
                                </span>
                              </div>
                              <span className="text-gray-500 text-xs font-mono">
                                100%
                              </span>
                            </div>

                            <div className="px-6 py-8 flex flex-col items-center">
                              <div className="relative w-28 h-28 mb-6">
                                <svg
                                  className="w-full h-full -rotate-90"
                                  viewBox="0 0 100 100"
                                >
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r="42"
                                    fill="none"
                                    stroke="#1f2937"
                                    strokeWidth="8"
                                  />
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r="42"
                                    fill="none"
                                    stroke="#e2642a"
                                    strokeWidth="8"
                                    strokeDasharray={2 * Math.PI * 42}
                                    strokeDashoffset={0}
                                    strokeLinecap="round"
                                  />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-white text-2xl font-bold">
                                    100%
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-white text-sm font-semibold mb-1">
                                <CheckCircle className="w-4 h-4 text-[#e2642a] flex-shrink-0" />
                                <span>Einrichtung abgeschlossen</span>
                              </div>
                              <p className="text-gray-500 text-xs text-center leading-relaxed">
                                Alle Zugänge, Daten &amp; Trainings sind bereit.
                              </p>
                            </div>
                          </div>
                        )}

                        {index === 2 && (
                          <div className="rounded-xl border border-gray-800 bg-gray-950 overflow-hidden">
                            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-white text-xs font-medium">
                                  QuickStartAI Support
                                </span>
                              </div>
                              <span className="flex items-center gap-1.5 text-green-500 text-xs font-medium">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                Online
                              </span>
                            </div>

                            <div className="px-6 py-6">
                              <div className="flex items-center justify-between pb-5 mb-5 border-b border-gray-800">
                                <span className="text-gray-500 text-xs">
                                  Ø Antwortzeit
                                </span>
                                <span className="text-white text-sm font-semibold">
                                  4 Min.
                                </span>
                              </div>

                              <div className="space-y-3">
                                {[
                                  "Optimierung",
                                  "Neue Funktionen",
                                  "Support",
                                  "Monitoring",
                                ].map((item) => (
                                  <div
                                    key={item}
                                    className="flex items-center gap-2.5"
                                  >
                                    <CheckCircle className="w-4 h-4 text-[#e2642a] flex-shrink-0" />
                                    <span className="text-gray-300 text-sm">
                                      {item}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setShowContactForm(true)}
              className="inline-flex items-center justify-center bg-[#e2642a] text-white font-semibold py-3 px-8 rounded-full hover:bg-orange-600 transition-all duration-200"
            >
              Jetzt Zusammenarbeit anfragen
            </button>
          </div>
        </div>
      </section>

      {/* Ergebnisse / Testimonials Section */}
      <section id="ergebnisse" className="relative py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              ref={resultsEyebrowRef}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <span className="h-px w-8 bg-[#e2642a]/50"></span>
              <span className="text-xs font-semibold tracking-widest text-[#e2642a] uppercase">
                Resultate
              </span>
              <span className="h-px w-8 bg-[#e2642a]/50"></span>
            </div>
            <h2
              ref={resultsTitleRef}
              className="font-serif italic text-4xl md:text-5xl text-gray-900 mb-6"
            >
              Das sagen unsere Kunden.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedCard
                key={index}
                delay={index * 0.05}
                className="bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-lg hover:border-[#e2642a]/50 transition-all duration-300 shadow-xl flex flex-col"
              >
                <div className="text-[#e2642a] font-bold text-sm mb-3">
                  {testimonial.stat}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setShowContactForm(true)}
              className="inline-flex items-center justify-center bg-[#e2642a] text-white font-semibold py-3 px-8 rounded-full hover:bg-orange-600 transition-all duration-200"
            >
              Wünsche ich mir auch!
            </button>
          </div>
        </div>
      </section>

      {/* Über Maximilian Section */}
      <section id="ueber-uns" className="relative py-24 bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="relative rounded-2xl overflow-hidden bg-gray-900 bg-cover bg-center min-h-[420px] md:min-h-[480px] flex items-center"
            style={{ backgroundImage: "url('/MaximilianHero.png')" }}
          >
            {/* Dark gradient overlay for legibility, kept off the left where the person is */}
            <div className="absolute inset-0 bg-gradient-to-l from-gray-900/90 via-gray-900/50 to-transparent" />

            <div className="relative p-8 md:p-14 max-w-lg ml-auto">
              <div
                ref={ueberUnsEyebrowRef}
                className="flex items-center gap-3 mb-6"
              >
                <span className="h-px w-8 bg-[#e2642a]/50"></span>
                <span className="text-xs font-semibold tracking-widest text-[#e2642a] uppercase">
                  Über Maximilian
                </span>
                <span className="h-px w-8 bg-[#e2642a]/50"></span>
              </div>
              <h2
                ref={ueberUnsTitleRef}
                className="font-serif italic text-3xl md:text-4xl text-white mb-6 leading-tight"
              >
                Ich helfe Unternehmen, jede Anfrage sofort zu beantworten und
                vorzuqualifizieren.
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4"></p>
              <p className="text-sm text-gray-400 mb-6">
                AI Engineer &amp; Gründer aus München
              </p>
              <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-8">
                +50 Unternehmen beraten
              </p>
              <button
                onClick={() => setShowContactForm(true)}
                className="inline-flex items-center justify-center bg-[#e2642a] text-white font-semibold py-3 px-8 rounded-full hover:bg-orange-600 transition-all duration-200"
              >
                Wie funktioniert das
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Prozess Section */}
      <section id="prozess" className="relative py-24 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div
              ref={prozessEyebrowRef}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <span className="h-px w-8 bg-[#e2642a]/50"></span>
              <span className="text-xs font-semibold tracking-widest text-[#e2642a] uppercase">
                Der Prozess
              </span>
              <span className="h-px w-8 bg-[#e2642a]/50"></span>
            </div>
            <h2
              ref={prozessTitleRef}
              className="font-serif italic text-3xl md:text-4xl text-white mb-4"
            >
              So einfach geht&apos;s!
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto"></p>
          </div>

          {/* Desktop: circles connected by a dashed wavy line */}
          <div className="hidden md:flex items-start">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="flex items-start flex-1 last:flex-none"
              >
                <div className="flex flex-col items-center text-center w-48">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 text-xl font-bold shadow-lg ${
                      index === 1
                        ? "bg-[#e2642a] text-white"
                        : "bg-white text-[#e2642a]"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < processSteps.length - 1 && (
                  <svg
                    className="flex-1 mt-6 w-full h-16"
                    viewBox="0 0 300 64"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id={`processLineGradient-${index}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#ffffff"
                          stopOpacity="0.22"
                        />
                        <stop
                          offset="35%"
                          stopColor="#ffffff"
                          stopOpacity="0.55"
                        />
                        <stop
                          offset="50%"
                          stopColor="#ffffff"
                          stopOpacity="1"
                        />
                        <stop
                          offset="65%"
                          stopColor="#ffffff"
                          stopOpacity="0.55"
                        />
                        <stop
                          offset="100%"
                          stopColor="#ffffff"
                          stopOpacity="0.22"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d="M22,28 C90,28 110,58 170,56 C210,54 250,30 278,26"
                      fill="none"
                      stroke={`url(#processLineGradient-${index})`}
                      strokeWidth="3"
                      strokeDasharray="10 10"
                      strokeLinecap="butt"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: stacked list */}
          <div className="md:hidden space-y-10">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-white flex items-center justify-center mb-4 text-xl font-bold text-[#e2642a] shadow-lg">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => setShowContactForm(true)}
              className="inline-flex items-center justify-center bg-[#e2642a] text-white font-semibold py-3 px-8 rounded-full hover:bg-orange-600 transition-all duration-200"
            >
              Quiz starten
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              ref={faqEyebrowRef}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <span className="h-px w-8 bg-[#e2642a]/50"></span>
              <span className="text-xs font-semibold tracking-widest text-[#e2642a] uppercase">
                FAQ
              </span>
              <span className="h-px w-8 bg-[#e2642a]/50"></span>
            </div>
            <h2
              ref={faqTitleRef}
              className="font-serif italic text-3xl md:text-4xl text-gray-900 mb-4"
            >
              Häufig gestellte Fragen
            </h2>
            <p ref={faqTextRef} className="text-xl text-gray-600"></p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl shadow-lg"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:shadow-lg transition-colors rounded-xl"
                >
                  <span className="font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ml-4 ${openFaq === index ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-8 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setShowContactForm(true)}
              className="inline-flex items-center justify-center bg-[#e2642a] text-white font-semibold py-3 px-8 rounded-full hover:bg-orange-600 transition-all duration-200"
            >
              Noch Fragen? Jetzt anfragen
            </button>
          </div>
        </div>
      </section>

      {/* Termin Section */}
      <section id="termin" className="relative py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden grid md:grid-cols-2">
            {/* Subtle grid overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {/* Glow blob */}
            <div
              className="pointer-events-none absolute -top-24 -left-24 w-[400px] h-[300px] rounded-full opacity-20"
              style={{
                background:
                  "radial-gradient(ellipse, #e2642a 0%, transparent 70%)",
              }}
            />

            <div className="relative p-8 md:p-14 flex flex-col justify-center">
              <div
                ref={zusammenarbeitEyebrowRef}
                className="flex items-center gap-3 mb-6"
              >
                <span className="h-px w-8 bg-[#e2642a]/50"></span>
                <span className="text-xs font-semibold tracking-widest text-[#e2642a] uppercase">
                  Zusammenarbeit
                </span>
                <span className="h-px w-8 bg-[#e2642a]/50"></span>
              </div>
              <h2
                ref={zusammenarbeitTitleRef}
                className="font-serif italic text-3xl md:text-4xl text-white mb-6 leading-tight"
              >
                Finden wir gemeinsam heraus, ob es sich für Sie lohnt.
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Im kostenlosen Gespräch erhalten Sie eine persönliche Demo und
                eine ehrliche Einschätzung.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Im besten Fall gewinnen Sie ein System, das Ihr Team täglich
                entlastet. Im schlechtesten Fall gehen Sie mit neuen Ideen nach
                Hause.
              </p>
              <p className="text-sm text-gray-500">+50 Unternehmen beraten</p>
            </div>

            <div className="relative m-4 md:m-8 md:ml-0 bg-white rounded-xl p-8 md:p-10 shadow-2xl">
              {isScheduleSubmitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Anfrage gesendet!
                  </h3>
                  <p className="text-gray-600">
                    Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleScheduleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="schedule-name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="schedule-name"
                      name="name"
                      value={scheduleData.name}
                      onChange={handleScheduleChange}
                      placeholder="Max Mustermann"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e2642a] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="schedule-email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Deine E-Mail-Adresse *
                    </label>
                    <input
                      type="email"
                      id="schedule-email"
                      name="email"
                      value={scheduleData.email}
                      onChange={handleScheduleChange}
                      placeholder="max@mustermann.de"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e2642a] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="schedule-phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Deine Telefonnummer *
                    </label>
                    <input
                      type="tel"
                      id="schedule-phone"
                      name="phone"
                      value={scheduleData.phone}
                      onChange={handleScheduleChange}
                      placeholder="+49 123 3456"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e2642a] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="schedule-reachability"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Wann bist du erreichbar?
                    </label>
                    <select
                      id="schedule-reachability"
                      name="reachability"
                      value={scheduleData.reachability}
                      onChange={handleScheduleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e2642a] focus:border-transparent outline-none transition-all text-gray-900"
                    >
                      <option value="">Uhrzeit auswählen</option>
                      <option value="Vormittags (9-12 Uhr)">
                        Vormittags (9-12 Uhr)
                      </option>
                      <option value="Mittags (12-15 Uhr)">
                        Mittags (12-15 Uhr)
                      </option>
                      <option value="Nachmittags (15-18 Uhr)">
                        Nachmittags (15-18 Uhr)
                      </option>
                      <option value="Abends (18-20 Uhr)">
                        Abends (18-20 Uhr)
                      </option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={isScheduleSubmitting}
                    className="w-full bg-[#e2642a] text-white font-semibold py-3.5 px-6 rounded-lg hover:bg-orange-600 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isScheduleSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Termin vereinbaren!"
                    )}
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    Informationen zur Verarbeitung deiner Daten findest du in
                    unserer{" "}
                    <Link
                      to="/datenschutz"
                      className="underline hover:text-gray-600"
                    >
                      Datenschutzerklärung
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-[#e2642a] to-orange-600"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative z-10">
            <h2
              ref={ctaTitleRef}
              className="font-serif italic text-3xl md:text-4xl text-gray-900 mb-6"
            >
              Bereit, keine Anfrage mehr unbearbeitet zu lassen?
            </h2>
            <p ref={ctaTextRef} className="text-xl text-white/90 mb-10">
              Unverbindlich. Antwort innerhalb von 24 Stunden.
            </p>

            <button
              onClick={() => setShowContactForm(true)}
              className="bg-white text-[#e2642a] font-semibold py-4 px-10 rounded-xl text-lg hover:bg-gray-100 hover:shadow-lg transform hover:scale-105 transition-all duration-200 inline-flex items-center justify-center space-x-2"
            >
              <span>Zusammenarbeit anfragen</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative text-gray-900 py-10 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center">
              <img
                src="/Firmenlogo-removebg-preview.png"
                alt="QuickStartAI Logo"
                className="h-8 w-auto mr-2"
              />
              <span className="text-lg font-bold">QuickStartAI</span>
            </div>

            <nav className="flex flex-wrap items-center gap-x-8 gap-y-2 text-gray-600 text-sm">
              <a
                href="#system"
                className="hover:text-gray-900 transition-colors"
              >
                Das System
              </a>
              <a
                href="#ergebnisse"
                className="hover:text-gray-900 transition-colors"
              >
                Ergebnisse
              </a>
              <a href="#faq" className="hover:text-gray-900 transition-colors">
                FAQ
              </a>
              <button
                onClick={() => setShowContactForm(true)}
                className="hover:text-gray-900 transition-colors"
              >
                Kontakt
              </button>
            </nav>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col-reverse md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>&copy; 2025 QuickStartAI. Alle Rechte vorbehalten.</p>
            <div className="flex items-center gap-6">
              <Link
                to="/datenschutz"
                className="hover:text-gray-900 transition-colors"
              >
                Datenschutz
              </Link>
              <Link
                to="/impressum"
                className="hover:text-gray-900 transition-colors"
              >
                Impressum
              </Link>
              <Link to="/agb" className="hover:text-gray-900 transition-colors">
                AGB
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} />
      )}
    </div>
  );
}

function App() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <Router>
      <SmoothScroll />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/agb" element={<AGBPage />} />
        <Route path="/impressum" element={<ImpressumPage />} />
        <Route path="/datenschutz" element={<PrivacyPage />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route
          path="/blog/ki-agenten-erstellen"
          element={<BlogKIAgentenErstellen />}
        />
        <Route path="/ki-demo" element={<KiDemoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
