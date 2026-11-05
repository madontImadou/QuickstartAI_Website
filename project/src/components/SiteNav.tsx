import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { branchenPages } from '../data/branchen';

interface SiteNavProps {
  onContact: () => void;
}

const linkClass = 'text-gray-600 hover:text-gray-900 transition-colors';

const SiteNav: React.FC<SiteNavProps> = ({ onContact }) => {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBranchenOpen, setIsBranchenOpen] = useState(false);
  const branchenRef = useRef<HTMLDivElement>(null);

  // Auf der Startseite reicht der Anker, von Unterseiten geht es zurück zu ihr.
  const homeAnchor = (id: string) => (pathname === '/' ? `#${id}` : `/#${id}`);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsBranchenOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isBranchenOpen) return;
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!branchenRef.current?.contains(event.target as Node)) setIsBranchenOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsBranchenOpen(false);
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isBranchenOpen]);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img
              src="/Firmenlogo-removebg-preview.png"
              alt="QuickStartAI Logo"
              className="h-20 w-auto mr-3"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <a href={homeAnchor('system')} className={linkClass}>
              Unsere Empfangssoftware
            </a>

            <div
              ref={branchenRef}
              className="relative"
              onMouseEnter={() => setIsBranchenOpen(true)}
              onMouseLeave={() => setIsBranchenOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsBranchenOpen((open) => !open)}
                aria-expanded={isBranchenOpen}
                aria-haspopup="true"
                className={`${linkClass} inline-flex items-center gap-1`}
              >
                Branchen
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${isBranchenOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isBranchenOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[30rem]">
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-3">
                    <div className="grid grid-cols-2 gap-1">
                      {branchenPages.map(({ path, label, navIcon: Icon }) => (
                        <Link
                          key={path}
                          to={path}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-800 hover:bg-gray-50 hover:text-[#e2642a] transition-colors"
                        >
                          <Icon className="w-5 h-5 text-[#e2642a] flex-shrink-0" strokeWidth={1.5} />
                          {label}
                        </Link>
                      ))}
                    </div>
                    <a
                      href={homeAnchor('branchen')}
                      onClick={() => setIsBranchenOpen(false)}
                      className="block px-4 pt-3 pb-1 mt-2 border-t border-gray-100 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      Alle Branchen im Überblick
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a href={homeAnchor('faq')} className={linkClass}>
              FAQ
            </a>
            <a href="https://app.quickstartai.de" className={linkClass}>
              Kunden-Login
            </a>
          </div>

          <button
            onClick={onContact}
            className="hidden md:inline-flex bg-[#e2642a] text-white px-6 py-2.5 rounded-full hover:bg-orange-600 transition-all duration-200 font-medium"
          >
            Zusammenarbeit anfragen
          </button>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <a
                href={homeAnchor('system')}
                onClick={() => setIsMenuOpen(false)}
                className={`${linkClass} py-2`}
              >
                Unsere Empfangssoftware
              </a>
              <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase pt-2">
                Branchen
              </span>
              {branchenPages.map(({ path, label, navIcon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`${linkClass} flex items-center gap-3 py-2 pl-3`}
                >
                  <Icon className="w-5 h-5 text-[#e2642a] flex-shrink-0" strokeWidth={1.5} />
                  {label}
                </Link>
              ))}
              <a
                href={homeAnchor('branchen')}
                onClick={() => setIsMenuOpen(false)}
                className={`${linkClass} py-2 pl-3`}
              >
                Alle Branchen im Überblick
              </a>
              <a
                href={homeAnchor('faq')}
                onClick={() => setIsMenuOpen(false)}
                className={`${linkClass} py-2`}
              >
                FAQ
              </a>
              <a
                href="https://app.quickstartai.de"
                onClick={() => setIsMenuOpen(false)}
                className={`${linkClass} py-2`}
              >
                Kunden-Login
              </a>
              <button
                onClick={() => {
                  onContact();
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
  );
};

export default SiteNav;
