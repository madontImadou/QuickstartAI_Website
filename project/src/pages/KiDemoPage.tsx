import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Users,
  Clock,
  TrendingUp,
  Calendar,
  MessageSquare,
  Shield,
  ChevronRight,
  Sparkles,
  Phone,
  Mail,
  Globe,
  User,
} from 'lucide-react';
import { saveKiDemoRequest } from '../services/databaseService';

// ─── Minimal animation hook ──────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ─── Reusable fade wrapper ────────────────────────────────────────────────────
const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children, delay = 0, className = '',
}) => {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// ─── Benefit card data ────────────────────────────────────────────────────────
const benefits = [
  {
    icon: Zap,
    title: 'Sofortige Antworten',
    desc: 'Ihr KI-System antwortet innerhalb von Sekunden – rund um die Uhr, ohne Wartezeit.',
  },
  {
    icon: Users,
    title: 'Qualifizierte Patienten',
    desc: 'Automatische Lead-Qualifizierung filtert ernsthafte Anfragen heraus.',
  },
  {
    icon: Clock,
    title: '24 / 7 Erreichbarkeit',
    desc: 'Kein Anruf, keine Anfrage wird verpasst – auch nachts und am Wochenende.',
  },
  {
    icon: TrendingUp,
    title: 'Weniger Aufwand',
    desc: 'Routine-Aufgaben übernimmt die KI, Ihr Team fokussiert sich auf Behandlungen.',
  },
];

// ─── Demo steps ───────────────────────────────────────────────────────────────
const demoSteps = [
  { icon: MessageSquare, label: 'Live-Demo des KI-Systems' },
  { icon: Sparkles, label: 'Instagram-, WhatsApp- & Website-Integration' },
  { icon: Shield, label: 'Automatische Lead-Qualifizierung' },
  { icon: Calendar, label: 'Automatisierte Terminbuchung' },
  { icon: Clock, label: 'Dauer: ca. 30 Minuten' },
];

// ─── Main page ────────────────────────────────────────────────────────────────
const KiDemoPage: React.FC = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    website: '',
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const next: Partial<typeof formData> = {};
    if (!formData.name.trim()) next.name = 'Pflichtfeld';
    if (!formData.phone.trim()) next.phone = 'Pflichtfeld';
    if (!formData.email.trim()) next.email = 'Pflichtfeld';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = 'Ungültige E-Mail';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    const success = await saveKiDemoRequest({
      firstName: formData.name.trim(),
      lastName: '',
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      website: formData.website.trim() || undefined,
    });
    setIsSubmitting(false);
    if (success) setIsSubmitted(true);
  };

  const field = (
    key: keyof typeof formData,
    label: string,
    type = 'text',
    placeholder = '',
    required = true,
    Icon?: React.ElementType
  ) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
        {label}{required && <span className="text-brand-orange ml-1">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            <Icon size={16} />
          </div>
        )}
        <input
          type={type}
          value={formData[key]}
          onChange={e => {
            setFormData(p => ({ ...p, [key]: e.target.value }));
            if (errors[key]) setErrors(p => ({ ...p, [key]: undefined }));
          }}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3.5 rounded-xl bg-white/5 border text-white placeholder-gray-600 text-sm outline-none transition-all duration-200
            focus:bg-white/8 focus:border-brand-orange/60 focus:ring-1 focus:ring-brand-orange/30
            ${errors[key] ? 'border-red-500/60' : 'border-white/10 hover:border-white/20'}`}
        />
      </div>
      {errors[key] && <p className="text-xs text-red-400">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#090909] text-white overflow-x-hidden">

      {/* ── Subtle grid overlay ── */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Glow blob ── */}
      <div
        className="pointer-events-none fixed top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(ellipse, #e2642a 0%, transparent 70%)' }}
      />

      {/* ══════════════════════════════════════
          NAV (minimal)
      ══════════════════════════════════════ */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/5">
        <Link to="/" className="flex items-center">
          <div style={{ width: '96px', height: '29px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
            <img
              src="/Firmenlogo-removebg-preview.png"
              alt="QuickstartAI Logo"
              style={{ position: 'absolute', width: '99px', height: '99px', top: '-34px', left: '-8px' }}
            />
          </div>
        </Link>
        <a
          href="tel:+4900000000000"
          className="hidden md:flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <Phone size={13} />
          Fragen? Ruf uns an
        </a>
      </nav>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative z-10 pt-20 pb-12 px-6 md:px-12 max-w-5xl mx-auto text-center">

        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange text-xs font-semibold tracking-widest uppercase mb-8"
          style={{ opacity: 1 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
          Für Ästhetikpraxen
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
          Verpassen Sie keine{' '}
          <span
            className="relative inline-block"
            style={{
              background: 'linear-gradient(135deg, #e2642a 0%, #f97316 50%, #fbbf24 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            15–25 Anfragen
          </span>
          <br />
          mehr pro Monat
        </h1>

        {/* Sub-headline */}
        <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-gray-400 uppercase mb-6">
          Mit dem ersten KI-Mitarbeiter speziell für Ästhetikpraxen
        </p>

        {/* Separator */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/20" />
          <div className="w-1 h-1 rounded-full bg-white/30" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/20" />
        </div>

        {/* Trust line */}
        <p className="text-lg md:text-xl text-gray-300 font-light">
          Entwickelt, um sich{' '}
          <span className="text-white font-semibold">selbst zu finanzieren.</span>
        </p>
      </section>

      {/* ══════════════════════════════════════
          FORM SECTION
      ══════════════════════════════════════ */}
      <section className="relative z-10 px-6 md:px-12 pb-24 max-w-2xl mx-auto">
        <FadeIn delay={100}>
          <div
            className="rounded-2xl border border-white/10 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Card header */}
            <div className="px-8 pt-8 pb-6 border-b border-white/5">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-lg bg-brand-orange/15 border border-brand-orange/25 flex items-center justify-center">
                  <Calendar size={15} className="text-brand-orange" />
                </div>
                <h2 className="text-lg font-bold text-white">Demo anfragen</h2>
              </div>
              <p className="text-sm text-gray-500 pl-11">Kostenlos & unverbindlich · Antwort in &lt; 2h</p>
            </div>

            {/* Form or success */}
            <div className="px-8 py-8">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={28} className="text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Anfrage eingegangen!</h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                    Wir melden uns in der Regel innerhalb von 2 Stunden bei Ihnen. Prüfen Sie auch Ihren Spam-Ordner.
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href="https://wa.me/49000000000"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] text-sm font-medium hover:bg-[#25D366]/25 transition-colors"
                    >
                      <MessageSquare size={15} />
                      WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  {field('name', 'Name', 'text', 'Max Mustermann', true, User)}
                  {field('phone', 'Telefonnummer', 'tel', '+49 151 000 0000', true, Phone)}
                  {field('email', 'E-Mail-Adresse', 'email', 'max@praxis.de', true, Mail)}
                  {field('website', 'Website', 'url', 'https://ihre-praxis.de', false, Globe)}

                  {/* Privacy note */}
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Mit dem Absenden stimmen Sie unserer{' '}
                    <Link to="/datenschutz" className="text-gray-400 underline hover:text-white transition-colors">
                      Datenschutzerklärung
                    </Link>{' '}
                    zu.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full py-4 rounded-xl font-bold text-white text-sm tracking-wide overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                    style={{
                      background: isSubmitting
                        ? 'rgba(226,100,42,0.5)'
                        : 'linear-gradient(135deg, #e2642a 0%, #d55a26 100%)',
                      boxShadow: isSubmitting ? 'none' : '0 0 30px rgba(226,100,42,0.35)',
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Wird gesendet…
                        </>
                      ) : (
                        <>
                          Demo anfragen
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    {/* Shimmer on hover */}
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)',
                      }}
                    />
                  </button>
                </form>
              )}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════
          SOCIAL PROOF
      ══════════════════════════════════════ */}
      <section className="relative z-10 px-6 md:px-12 py-20 max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.25em] text-brand-orange uppercase mb-4">
              Bereits im Einsatz
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              100+ automatisierte Patientenanfragen verarbeitet
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
              Ästhetikpraxen nutzen unsere KI bereits täglich zur automatisierten Terminbuchung —
              ohne zusätzlichen manuellen Aufwand.
            </p>
          </div>
        </FadeIn>

        {/* Benefit cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((b, i) => (
            <FadeIn key={b.title} delay={i * 80}>
              <div
                className="h-full rounded-2xl border border-white/8 p-6 flex flex-col gap-4 group cursor-default
                  hover:border-brand-orange/30 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-brand-orange/12 border border-brand-orange/20 flex items-center justify-center group-hover:bg-brand-orange/20 transition-colors">
                  <b.icon size={18} className="text-brand-orange" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm mb-1.5">{b.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          DEMO CONTENT SECTION
      ══════════════════════════════════════ */}
      <section className="relative z-10 px-6 md:px-12 py-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: text */}
          <FadeIn>
            <p className="text-xs font-semibold tracking-[0.25em] text-brand-orange uppercase mb-4">
              Was Sie erwartet
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              In der Demo zeigen wir Ihnen alles —
              <span className="text-gray-400"> live & praxisnah.</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Keine Präsentationen, keine Verkaufsgespräche. Wir zeigen Ihnen das System direkt in Aktion —
              angepasst auf Ihre Praxis.
            </p>
          </FadeIn>

          {/* Right: steps */}
          <FadeIn delay={120}>
            <div className="flex flex-col gap-3">
              {demoSteps.map((step, i) => (
                <div
                  key={step.label}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/6 group hover:border-brand-orange/25 transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    animationDelay: `${i * 60}ms`,
                  }}
                >
                  {/* Step number */}
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold text-brand-orange border border-brand-orange/25 group-hover:bg-brand-orange/10 transition-colors"
                    style={{ background: 'rgba(226,100,42,0.08)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="flex items-center gap-3 flex-1">
                    <step.icon size={15} className="text-gray-500 flex-shrink-0" />
                    <span className="text-sm text-gray-300 font-medium">{step.label}</span>
                  </div>
                  <ChevronRight size={14} className="text-gray-700 group-hover:text-gray-500 transition-colors flex-shrink-0" />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════ */}
      <section className="relative z-10 px-6 md:px-12 py-10 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '< 2h', label: 'Antwortzeit' },
            { value: '15–25', label: 'Zusatzbuchungen / Mo.' },
            { value: '24/7', label: 'KI-Erreichbarkeit' },
            { value: '100%', label: 'Kostenlos testen' },
          ].map((s, i) => (
            <FadeIn key={s.label} delay={i * 60}>
              <div>
                <p
                  className="text-2xl md:text-3xl font-black mb-1"
                  style={{
                    background: 'linear-gradient(135deg, #e2642a, #fbbf24)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {s.value}
                </p>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER CTA
      ══════════════════════════════════════ */}
      <section className="relative z-10 px-6 md:px-12 py-28 max-w-3xl mx-auto text-center">
        {/* Glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(ellipse, #e2642a 0%, transparent 70%)' }}
        />

        <FadeIn>
          <p className="text-xs font-semibold tracking-[0.25em] text-brand-orange uppercase mb-5">
            Starten Sie jetzt
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Lassen Sie Ihr KI-System<br />für sich arbeiten.
          </h2>
          <p className="text-gray-400 mb-10 leading-relaxed">
            Mehr Anfragen. Mehr Buchungen. Weniger manueller Aufwand.
          </p>

          <a
            href="#top"
            onClick={e => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white text-sm tracking-wide group transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #e2642a 0%, #d55a26 100%)',
              boxShadow: '0 0 40px rgba(226,100,42,0.4)',
            }}
          >
            Kostenlose Demo sichern
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <p className="text-xs text-gray-600 mt-5">Kein Risiko · Keine Kreditkarte · 100% kostenlos</p>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════
          MINIMAL FOOTER
      ══════════════════════════════════════ */}
      <footer className="relative z-10 border-t border-white/5 px-6 md:px-12 py-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">© 2025 QuickstartAI. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-5 text-xs text-gray-600">
            <Link to="/datenschutz" className="hover:text-gray-400 transition-colors">Datenschutz</Link>
            <Link to="/impressum" className="hover:text-gray-400 transition-colors">Impressum</Link>
            <Link to="/agb" className="hover:text-gray-400 transition-colors">AGB</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KiDemoPage;
