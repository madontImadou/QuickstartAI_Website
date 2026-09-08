import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  X,
  Send,
  CheckCircle,
  Mail,
  User,
  ArrowRight,
  ArrowLeft,
  Globe,
  Users,
  MessageSquare,
  CalendarClock,
} from 'lucide-react';
import { saveContactRequest } from '../services/databaseService';

declare global { interface Window { fbq?: (...args: unknown[]) => void } }
const fbq = (...args: unknown[]) => { if (typeof window !== 'undefined' && window.fbq) window.fbq(...args); };

const CALENDLY_URL = 'https://calendly.com/m-quickstartai/erreichbarkeits-analyse-demo';

interface ContactFormProps {
  onClose: () => void;
}

// Feste Größen der ROI-Formel
const HOURS_PER_MONTH_FULLTIME = 160;
const WEEKS_PER_MONTH = 4.3;

// Branchenübliche Durchschnittswerte, damit Nutzer keine sensiblen
// Geschäftszahlen (Stundenlohn, Auftragswert, Marge) eingeben müssen.
const DEFAULT_HOURLY_WAGE = 20;
const DEFAULT_RELIEF_PERCENT = 60;
const DEFAULT_ORDER_VALUE = 800;
const DEFAULT_MARGIN_PERCENT = 40;
const DEFAULT_UPLIFT_PERCENT = 10;

const formatEUR = (value: number) =>
  Math.round(value).toLocaleString('de-DE') + ' €';

const STEP_LABELS = ['Ihre Situation', 'Ergebnis', 'Kontakt'];

const TOTAL_STEPS = 3;

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Hintergrund-Scroll sperren, solange das Fenster geöffnet ist
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Bei jedem Schrittwechsel nach oben scrollen, statt manuell hochscrollen zu müssen
  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  }, [step]);

  // Einfache Eingaben – der Rest der Formel läuft mit branchenüblichen Durchschnittswerten
  const [employees, setEmployees] = useState(1);
  const [requestsPerWeek, setRequestsPerWeek] = useState(20);

  const hourlyWage = DEFAULT_HOURLY_WAGE;
  const reliefPercent = DEFAULT_RELIEF_PERCENT;
  const orderValue = DEFAULT_ORDER_VALUE;
  const marginPercent = DEFAULT_MARGIN_PERCENT;
  const upliftPercent = DEFAULT_UPLIFT_PERCENT;

  const [formData, setFormData] = useState({
    name: '',
    website: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const roi = useMemo(() => {
    const timeSavingsPerYear =
      employees * HOURS_PER_MONTH_FULLTIME * (reliefPercent / 100) * hourlyWage * 12;

    const contributionMargin = orderValue * (marginPercent / 100);
    const revenueIncreasePerYear =
      requestsPerWeek * WEEKS_PER_MONTH * (upliftPercent / 100) * contributionMargin * 12;

    const totalValuePerYear = timeSavingsPerYear + revenueIncreasePerYear;

    return {
      timeSavingsPerYear,
      contributionMargin,
      revenueIncreasePerYear,
      totalValuePerYear,
    };
  }, [employees, hourlyWage, reliefPercent, requestsPerWeek, orderValue, marginPercent, upliftPercent]);

  const canProceed =
    (step === 1 && employees > 0 && requestsPerWeek > 0) || step === 2;

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
        roi: {
          employees,
          hourlyWage,
          reliefPercent,
          timeSavingsPerYear: roi.timeSavingsPerYear,
          ordersPerWeek: requestsPerWeek,
          orderValue,
          marginPercent,
          contributionMargin: roi.contributionMargin,
          upliftPercent,
          revenueIncreasePerYear: roi.revenueIncreasePerYear,
          totalValuePerYear: roi.totalValuePerYear,
        },
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
      <div
        ref={scrollContainerRef}
        data-lenis-prevent
        className="bg-white border border-gray-200 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {step < TOTAL_STEPS ? (
          <div className="relative bg-gray-900 px-8 pt-8 pb-6 overflow-hidden">
            <div
              className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-25"
              style={{ background: 'radial-gradient(ellipse, #e2642a 0%, transparent 70%)' }}
            />
            <div className="relative flex justify-between items-start mb-6">
              <div>
                <span className="inline-block text-xs font-semibold tracking-widest text-[#e2642a] uppercase mb-2">
                  Schritt {step} von {TOTAL_STEPS - 1}
                </span>
                <h3 className="text-xl font-bold text-white">ROI-Rechner</h3>
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
            <div>
              <p className="text-lg font-bold text-gray-900">
                Wie viel Potenzial steckt in Ihrem Unternehmen?
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Zwei kurze Angaben genügen – den Rest rechnen wir mit branchenüblichen Durchschnittswerten.
              </p>
            </div>

            <div>
              <label htmlFor="roi-employees" className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Mitarbeiter im Empfang/Support (Vollzeitäquivalent)</span>
                </div>
              </label>
              <input
                type="number"
                id="roi-employees"
                min={0}
                step={0.5}
                value={employees}
                onChange={(e) => setEmployees(Math.max(0, Number(e.target.value)))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e2642a] focus:border-transparent outline-none transition-all text-gray-900"
              />
            </div>

            <div>
              <label htmlFor="roi-requests" className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Anfragen pro Woche (Telefon, WhatsApp, Website, ...)</span>
                </div>
              </label>
              <input
                type="number"
                id="roi-requests"
                min={0}
                step={1}
                value={requestsPerWeek}
                onChange={(e) => setRequestsPerWeek(Math.max(0, Number(e.target.value)))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e2642a] focus:border-transparent outline-none transition-all text-gray-900"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <p className="text-lg font-bold text-gray-900">Ihr persönliches Ergebnis</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Zeitersparnis / Jahr
                </p>
                <p className="text-2xl font-bold text-gray-900">{formatEUR(roi.timeSavingsPerYear)}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Umsatzsteigerung / Jahr
                </p>
                <p className="text-2xl font-bold text-gray-900">{formatEUR(roi.revenueIncreasePerYear)}</p>
              </div>
            </div>

            <div className="rounded-xl bg-gray-900 p-6 text-center">
              <p className="text-xs font-semibold text-[#e2642a] uppercase tracking-widest mb-2">
                Gesamter Jahreswert
              </p>
              <p className="text-3xl font-bold text-white">{formatEUR(roi.totalValuePerYear)}</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-orange-50 p-5 text-center">
              <p className="text-sm text-gray-700 mb-4">
                Finden Sie in einem kurzen Gespräch heraus, wie diese Zahlen bei Ihnen konkret zustande kommen.
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#e2642a] text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition-all duration-200"
              >
                <CalendarClock className="w-4 h-4" />
                Termin buchen
              </a>
            </div>
          </div>
        )}

        {step < TOTAL_STEPS && (
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
              className={
                step === 2
                  ? 'inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
                  : 'inline-flex items-center gap-2 bg-[#e2642a] text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed'
              }
            >
              {step === 2 ? 'Lieber Formular ausfüllen' : 'Weiter'}
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
