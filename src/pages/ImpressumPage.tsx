import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ImpressumPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-[#e2642a] hover:text-[#d55a26]">
              <ArrowLeft className="w-5 h-5" />
              <span>Zurück zur Startseite</span>
            </Link>
            <div className="flex items-center">
              <img 
                src="/Firmenlogo-removebg-preview.png" 
                alt="QuickStartAI Logo" 
                className="h-12 w-auto mr-2"
              />
              <span className="text-lg font-bold text-gray-900">QuickStartAI</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Impressum</h1>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Diensteanbieter</h2>
            <p className="mb-6">
              QuickstartAI<br />
              Zeppelinstr.73<br />
              81669 München<br />
              Deutschland
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Kontaktmöglichkeiten</h2>
            <p className="mb-6">
              <strong>E-Mail-Adresse:</strong> <a href="mailto:info@quickstartai.de" className="text-[#e2642a] hover:text-[#d55a26] underline">info@quickstartai.de</a><br />
              <strong>Telefon:</strong> <a href="tel:017642078992" className="text-[#e2642a] hover:text-[#d55a26] underline">017642078992</a>
            </p>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <a href="https://datenschutz-generator.de/" title="Rechtstext von Dr. Schwenke - für weitere Informationen bitte anklicken." target="_blank" rel="noopener noreferrer nofollow" className="text-[#e2642a] hover:text-[#d55a26] underline">
                  Erstellt mit kostenlosem Datenschutz-Generator.de von Dr. Thomas Schwenke
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/Firmenlogo-removebg-preview.png" 
              alt="QuickStartAI Logo" 
              className="h-8 w-auto mr-2"
            />
            <span className="text-lg font-bold">QuickStartAI</span>
          </div>
          <p className="text-gray-400">
            &copy; 2025 QuickStartAI. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ImpressumPage;