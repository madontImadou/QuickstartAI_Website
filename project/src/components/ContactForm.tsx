import React, { useState } from 'react';
import {
  X,
  Send,
  CheckCircle,
  Mail,
  User,
  ArrowRight,
  ArrowLeft,
  Inbox,
  TrendingUp,
  BarChart2,
  Flame,
  Globe,
  Phone,
  Clock,
  UserCheck,
  Calendar,
  MessageSquare,
  Share2,
} from 'lucide-react';
import { saveContactRequest } from '../services/databaseService';

declare global { interface Window { fbq?: (...args: unknown[]) => void } }
const fbq = (...args: unknown[]) => { if (typeof window !== 'undefined' && window.fbq) window.fbq(...args); };

interface ContactFormProps {
  onClose: () => void;
}

type Accent = {
  iconBg: string;
  iconText: string;
  border: string;
  bg: string;
  ring: string;
  badge: string;
};

const ACCENTS = {
  sky: {
    iconBg: 'bg-sky-100',
    iconText: 'text-sky-600',
    border: 'border-sky-400',
    bg: 'bg-sky-50',
    ring: 'ring-sky-200',
    badge: 'bg-sky-500',
  },
  emerald: {
    iconBg: 'bg-emerald-100',
    iconText: 'text-emerald-600',
    border: 'border-emerald-400',
    bg: 'bg-emerald-50',
    ring: 'ring-emerald-200',
    badge: 'bg-emerald-500',
  },
  amber: {
    iconBg: 'bg-amber-100',
    iconText: 'text-amber-600',
    border: 'border-amber-400',
    bg: 'bg-amber-50',
    ring: 'ring-amber-200',
    badge: 'bg-amber-500',
  },
  rose: {
    iconBg: 'bg-rose-100',
    iconText: 'text-rose-600',
    border: 'border-rose-400',
    bg: 'bg-rose-50',
    ring: 'ring-rose-200',
    badge: 'bg-rose-500',
  },
  violet: {
    iconBg: 'bg-violet-100',
    iconText: 'text-violet-600',
    border: 'border-violet-400',
    bg: 'bg-violet-50',
    ring: 'ring-violet-200',
    badge: 'bg-violet-500',
  },
  fuchsia: {
    iconBg: 'bg-fuchsia-100',
    iconText: 'text-fuchsia-600',
    border: 'border-fuchsia-400',
    bg: 'bg-fuchsia-50',
    ring: 'ring-fuchsia-200',
    badge: 'bg-fuchsia-500',
  },
  indigo: {
    iconBg: 'bg-indigo-100',
    iconText: 'text-indigo-600',
    border: 'border-indigo-400',
    bg: 'bg-indigo-50',
    ring: 'ring-indigo-200',
    badge: 'bg-indigo-500',
  },
} satisfies Record<string, Accent>;

const WEEKLY_REQUEST_OPTIONS = [
  { label: '0–10', icon: Inbox, accent: ACCENTS.sky },
  { label: '10–30', icon: TrendingUp, accent: ACCENTS.emerald },
  { label: '30–100', icon: BarChart2, accent: ACCENTS.amber },
  { label: 'Über 100', icon: Flame, accent: ACCENTS.rose },
];

const CHANNEL_OPTIONS = [
  { label: 'Website', icon: Globe, accent: ACCENTS.sky },
  { label: 'Telefon', icon: Phone, accent: ACCENTS.violet },
  { label: 'WhatsApp', icon: MessageSquare, accent: ACCENTS.emerald },
  { label: 'Social Media', icon: Share2, accent: ACCENTS.fuchsia },
];

const IMPROVEMENT_OPTIONS = [
  { label: 'Rund um die Uhr erreichbar sein', icon: Clock, accent: ACCENTS.indigo },
  { label: 'Mehr Anfragen in Kunden umwandeln', icon: TrendingUp, accent: ACCENTS.emerald },
  { label: 'Team entlasten', icon: UserCheck, accent: ACCENTS.amber },
  { label: 'Termine automatisch vereinbaren', icon: Calendar, accent: ACCENTS.rose },
];

const STEP_LABELS = ['Bedarf', 'Kanäle', 'Ziel', 'Kontakt'];

const TOTAL_STEPS = 4;

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [weeklyRequests, setWeeklyRequests] = useState('');
  const [channels, setChannels] = useState<string[]>([]);
  const [improvementGoal, setImprovementGoal] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    website: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleChannel = (channel: string) => {
    setChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]
    );
  };

  const canProceed =
    (step === 1 && weeklyRequests !== '') ||
    (step === 2 && channels.length > 0) ||
    (step === 3 && improvementGoal !== '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Input validation
    if (!formData.name.trim() || !formData.website.trim() || !formData.email.trim()) {
      alert('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }

    // Telefonnummer oder E-Mail validieren
    const contact = formData.email.trim();
    const isEmail = contact.includes('@');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+\d][\d\s()/-]{5,}$/;
    if (isEmail ? !emailRegex.test(contact) : !phoneRegex.test(contact)) {
      alert('Bitte geben Sie eine gültige Telefonnummer oder E-Mail-Adresse ein.');
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await saveContactRequest({
        name: formData.name,
        website: formData.website,
        email: isEmail ? contact : undefined,
        phone: isEmail ? undefined : contact,
        weeklyRequests,
        channels,
        improvementGoal
      });

      if (success) {
        fbq('track', 'Lead', { content_name: 'Kontaktformular', content_category: 'Contact' });
        setIsSubmitted(true);
      } else {
        alert('Fehler beim Speichern der Nachricht. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.');
      }
    } catch (error) {
      console.error('Fehler beim Speichern der Kontakt-Anfrage:', error);
      alert('Fehler beim Speichern der Nachricht. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.');
    } finally {
      setIsSubmitting(false);
    }

    // Auto-close after 3 seconds
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Nachricht gesendet!</h3>
          <p className="text-gray-600 mb-6">
            Vielen Dank für Ihre Nachricht! Sie wurde erfolgreich gespeichert. Wir melden uns schnellstmöglich bei Ihnen zurück.
          </p>
          <p className="text-sm text-gray-500">
            Dieses Fenster schließt sich automatisch...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        {step < TOTAL_STEPS ? (
          <div className="relative bg-gray-900 px-8 pt-8 pb-6 overflow-hidden">
            <div
              className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-25"
              style={{ background: 'radial-gradient(ellipse, #e2642a 0%, transparent 70%)' }}
            />
            <div className="relative flex justify-between items-start mb-6">
              <div>
                <span className="inline-block text-xs font-semibold tracking-widest text-[#e2642a] uppercase mb-2">
                  Frage {step} von 3
                </span>
                <h3 className="text-xl font-bold text-white">Kurzes Quiz</h3>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Step pills */}
            <div className="relative flex items-center gap-2">
              {STEP_LABELS.map((label, i) => (
                <div key={label} className="flex-1">
                  <div
                    className={`h-1.5 rounded-full transition-colors duration-300 ${
                      i + 1 <= step ? 'bg-[#e2642a]' : 'bg-white/15'
                    }`}
                  />
                  <span
                    className={`hidden sm:block mt-1.5 text-[11px] font-medium transition-colors ${
                      i + 1 <= step ? 'text-white' : 'text-gray-500'
                    }`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center px-8 pt-8 pb-2">
            <h3 className="text-2xl font-bold text-gray-900">Kontakt aufnehmen</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}

        <div className="p-8 pt-6">
        {step === 1 && (
          <div className="space-y-6">
            <p className="text-lg font-bold text-gray-900">
              Wie viele Anfragen erhalten Sie pro Woche?
            </p>
            <div className="grid grid-cols-2 gap-3">
              {WEEKLY_REQUEST_OPTIONS.map(({ label, icon: Icon, accent }) => {
                const isSelected = weeklyRequests === label;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setWeeklyRequests(label)}
                    className={`relative flex flex-col items-center justify-center gap-2.5 text-center px-4 py-5 rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? `${accent.border} ${accent.bg} shadow-lg ring-4 ${accent.ring} -translate-y-0.5`
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    {isSelected && (
                      <div className={`absolute top-2 right-2 w-5 h-5 rounded-full ${accent.badge} flex items-center justify-center`}>
                        <CheckCircle className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      </div>
                    )}
                    <div className={`w-11 h-11 rounded-full ${accent.iconBg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${accent.iconText}`} />
                    </div>
                    <span className="font-semibold text-gray-900">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <p className="text-lg font-bold text-gray-900">
                Über welche Kanäle erreichen Sie Kunden aktuell?
              </p>
              <p className="text-sm text-gray-500 mt-1">Mehrfachauswahl möglich</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {CHANNEL_OPTIONS.map(({ label, icon: Icon, accent }) => {
                const isSelected = channels.includes(label);
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => toggleChannel(label)}
                    className={`relative flex flex-col items-center justify-center gap-2.5 text-center px-4 py-5 rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? `${accent.border} ${accent.bg} shadow-lg ring-4 ${accent.ring} -translate-y-0.5`
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    {isSelected && (
                      <div className={`absolute top-2 right-2 w-5 h-5 rounded-full ${accent.badge} flex items-center justify-center`}>
                        <CheckCircle className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      </div>
                    )}
                    <div className={`w-11 h-11 rounded-full ${accent.iconBg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${accent.iconText}`} />
                    </div>
                    <span className="font-semibold text-gray-900">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <p className="text-lg font-bold text-gray-900">
              Was möchten Sie verbessern?
            </p>
            <div className="grid grid-cols-2 gap-3">
              {IMPROVEMENT_OPTIONS.map(({ label, icon: Icon, accent }) => {
                const isSelected = improvementGoal === label;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setImprovementGoal(label)}
                    className={`relative flex flex-col items-center justify-center gap-2.5 text-center px-4 py-5 rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? `${accent.border} ${accent.bg} shadow-lg ring-4 ${accent.ring} -translate-y-0.5`
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    {isSelected && (
                      <div className={`absolute top-2 right-2 w-5 h-5 rounded-full ${accent.badge} flex items-center justify-center`}>
                        <CheckCircle className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      </div>
                    )}
                    <div className={`w-11 h-11 rounded-full ${accent.iconBg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${accent.iconText}`} />
                    </div>
                    <span className="font-semibold text-gray-900 text-sm leading-snug">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {(step === 1 || step === 2 || step === 3) && (
          <div className="flex items-center justify-between mt-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Zurück
              </button>
            ) : (
              <span />
            )}
            <button
              type="button"
              disabled={!canProceed}
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-2 bg-[#e2642a] text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Weiter
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === TOTAL_STEPS && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Name *</span>
                </div>
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e2642a] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label htmlFor="contact-website" className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span>Website *</span>
                </div>
              </label>
              <input
                type="text"
                id="contact-website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="ihre-website.de"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e2642a] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Telefonnummer oder E-Mail-Adresse *</span>
                </div>
              </label>
              <input
                type="text"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="+49 123 4567890 oder name@beispiel.de"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e2642a] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Zurück
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#e2642a] to-orange-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-[#e2642a] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Nachricht speichern</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {step === TOTAL_STEPS && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Oder kontaktieren Sie uns direkt:
            </p>
            <div className="mt-2 text-center">
              <a
                href="mailto:maximilian@quickstartai.de"
                className="text-[#e2642a] hover:text-orange-400 font-medium"
              >
                info@quickstartai.de
              </a>
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">
              Ihre Nachricht wird sicher in unserer Datenbank gespeichert und vertraulich behandelt.
            </p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
