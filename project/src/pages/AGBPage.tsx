import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AGBPage: React.FC = () => {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Geltungsbereich</h2>
            <p className="mb-4">
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen QuickstartAi, Maximilian Theele, Zeppelinstr.73, 81669 München, und seinen Kunden über die Bereitstellung von KI-gestützten Lösungen, insbesondere:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>Chatbots für Webseiten,</li>
              <li>Sprachassistenten,</li>
              <li>Individuelle Integrationen mit Drittsoftware.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Leistungen</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Entwicklung, Bereitstellung und Betrieb von individuellen KI-Chatbots für Webseiten.</li>
              <li>Entwicklung und Bereitstellung von Sprachassistenten (z. B. Telefonbots, Voice-Integrationen).</li>
              <li>Umsetzung von Integrationen in bestehende Systeme (z. B. CRM, Support-Tools, CMS, Datenbanken).</li>
              <li>Hosting, Wartung, laufende technische Betreuung und Support.</li>
              <li>Anpassungen oder Erweiterungen erfolgen nur nach gesonderter Vereinbarung.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Vertragsabschluss</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Der Vertrag kommt durch schriftliche Bestätigung oder durch Beginn der Leistungserbringung zustande.</li>
              <li>Der Anbieter kann Aufträge ohne Angabe von Gründen ablehnen.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Preise und Zahlungsbedingungen</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Die aktuellen Preise sind im Angebot oder auf der Website angegeben.</li>
              <li>Abrechnung erfolgt in der Regel monatlich im Voraus.</li>
              <li>Bei Zahlungsverzug von mehr als 14 Tagen kann der Anbieter den Service sperren, bis der Rückstand beglichen ist.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Mitwirkungspflichten des Kunden</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Bereitstellung aller erforderlichen Inhalte, Daten, Zugänge und technischen Schnittstellen.</li>
              <li>Sicherstellung, dass alle bereitgestellten Inhalte rechtlich unbedenklich sind.</li>
              <li>Freistellung des Anbieters von Ansprüchen Dritter, die auf den bereitgestellten Inhalten beruhen.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Haftung</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Haftung nur für Vorsatz und grobe Fahrlässigkeit.</li>
              <li>Haftungsobergrenze: Höhe der in den letzten 12 Monaten gezahlten Vergütung.</li>
              <li>Keine Haftung für mittelbare Schäden, entgangenen Gewinn oder fehlerhafte KI-Ausgaben.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Urheberrechte und Nutzungsrechte</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Die Software, der Quellcode und alle technischen Komponenten bleiben Eigentum des Anbieters.</li>
              <li>Der Kunde erhält ein nicht übertragbares, einfaches Nutzungsrecht für die Vertragsdauer.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Vertragslaufzeit und Kündigung</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Verträge gelten unbefristet, sofern nicht anders vereinbart.</li>
              <li>Kündigung mit 14 Tagen Frist zum Monatsende möglich.</li>
              <li>Fristlose Kündigung aus wichtigem Grund jederzeit möglich.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Widerrufsrecht für Verbraucher</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Sofern der Kunde Verbraucher im Sinne des § 13 BGB ist, gilt die gesetzliche Widerrufsbelehrung.</li>
              <li>Das Widerrufsrecht erlischt vorzeitig, wenn die Leistung vollständig erbracht wurde und der Kunde dem vor Beginn ausdrücklich zugestimmt hat.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Schlussbestimmungen</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Änderungen der AGB werden schriftlich mitgeteilt und gelten als akzeptiert, wenn der Kunde nicht binnen 14 Tagen widerspricht.</li>
              <li>Es gilt deutsches Recht, Gerichtsstand – soweit zulässig – München.</li>
            </ul>
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
            &copy; 2024 QuickStartAI. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AGBPage;