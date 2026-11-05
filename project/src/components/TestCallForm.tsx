import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Phone } from 'lucide-react';

const fbq = (...args: unknown[]) => {
  if (typeof window !== 'undefined' && window.fbq) window.fbq(...args);
};

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e2642a]/40 focus:border-[#e2642a]';

const TestCallForm: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus('sending');
    setError('');

    try {
      const response = await fetch('/api/test-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, company, consent }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setError(result?.error ?? 'Der Anruf konnte gerade nicht gestartet werden.');
        setStatus('idle');
        return;
      }

      fbq('track', 'Lead', { content_name: 'Testanruf' });
      setStatus('success');
    } catch {
      setError('Der Anruf konnte gerade nicht gestartet werden.');
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8" role="status">
        <CheckCircle className="w-12 h-12 text-[#e2642a] mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Ihr Telefon klingelt gleich</h3>
        <p className="text-gray-600">
          Sarah ruft Sie in wenigen Sekunden an und stellt sich kurz vor.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="test-call-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
          Ihre Telefonnummer
        </label>
        <input
          id="test-call-phone"
          type="tel"
          autoComplete="tel"
          required
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="0171 2345678"
          className={inputClass}
        />
      </div>

      {/* Für Menschen unsichtbar, Bots füllen es aus */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="test-call-company">Firma</label>
        <input
          id="test-call-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-0.5 w-4 h-4 accent-[#e2642a] flex-shrink-0"
        />
        <span>
          Ich möchte einen einmaligen Testanruf einer KI an diese Nummer erhalten. Es ist meine
          eigene Nummer und das Gespräch wird aufgezeichnet. Mehr dazu in der{' '}
          <Link to="/datenschutz" className="text-[#e2642a] underline hover:text-[#d55a26]">
            Datenschutzerklärung
          </Link>
          .
        </span>
      </label>

      {error && (
        <p role="alert" className="text-sm text-red-700 bg-red-50 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full inline-flex items-center justify-center gap-2 bg-[#e2642a] text-white font-semibold py-3.5 px-6 rounded-full hover:bg-orange-600 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Phone className="w-4 h-4" />
        {status === 'sending' ? 'Anruf wird gestartet …' : 'Jetzt anrufen lassen'}
      </button>
    </form>
  );
};

export default TestCallForm;
