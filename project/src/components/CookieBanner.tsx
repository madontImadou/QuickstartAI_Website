import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { denyConsent, grantConsent, OPEN_COOKIE_SETTINGS, readConsent } from '../lib/consent';

// Beide Buttons sehen bewusst gleich aus: Ablehnen muss so einfach sein wie Zustimmen.
const buttonClass =
  'text-xs font-medium text-gray-800 bg-gray-100 hover:bg-gray-200 px-3.5 py-1.5 rounded-full transition-colors duration-200';

const CookieBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(() => readConsent() === null);

  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, open);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie-Einstellungen"
      className="fixed bottom-3 left-3 right-3 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-max sm:max-w-2xl z-[60] flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4 bg-white/95 backdrop-blur border border-gray-200 rounded-2xl shadow-md px-4 py-2.5"
    >
      <p className="text-xs leading-relaxed text-gray-600">
        Dürfen wir Cookies nutzen, um unsere Werbung zu messen? Ihre Auswahl können Sie jederzeit
        ändern.{' '}
        <Link to="/datenschutz" className="underline hover:text-gray-900">
          Details
        </Link>
      </p>
      <div className="flex gap-2 flex-shrink-0">
        <button
          type="button"
          onClick={() => {
            denyConsent();
            setIsOpen(false);
          }}
          className={buttonClass}
        >
          Ablehnen
        </button>
        <button
          type="button"
          onClick={() => {
            grantConsent();
            setIsOpen(false);
          }}
          className={buttonClass}
        >
          Akzeptieren
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
