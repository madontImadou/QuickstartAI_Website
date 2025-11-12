import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ChatbotPrivacyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Datenschutzerklärung für die Nutzung der Chatbots von Quickstartai</h1>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Verantwortlicher</h2>
          <p className="mb-4">
            Quickstartai – Maximilian Theele<br />
            Einzelunternehmer<br />
            Zeppelinstraße 73<br />
            81669 München, Deutschland<br />
            E-Mail: <a href="mailto:info@quickstartai.de" className="text-[#e2642a] hover:text-[#d55a26] underline">info@quickstartai.de</a>
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Beschreibung der Verarbeitung</h2>
          <p className="mb-4">
            Quickstartai setzt auf seinen Webseiten und digitalen Anwendungen Chatbots und automatisierte Kommunikationssysteme ein (nachfolgend „Chatbot").
          </p>
          <p className="mb-4">
            Die Chatbots ermöglichen eine interaktive Kommunikation mit Nutzern, z. B. zur Beantwortung allgemeiner Fragen, zur Unterstützung bei Support- oder Termin-Anfragen sowie zur Informationsbereitstellung.
          </p>
          <p className="mb-6">
            Die Bereitstellung erfolgt über Voiceflow und kann mit weiteren Drittanbieterdiensten integriert werden.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Kategorien verarbeiteter Daten</h2>
          <p className="mb-4">Je nach Nutzung des Chatbots können folgende Daten verarbeitet werden:</p>
          <ul className="list-disc pl-6 mb-6 space-y-1">
            <li>Inhalte der eingegebenen Nachrichten,</li>
            <li>Datum und Uhrzeit der Kommunikation,</li>
            <li>freiwillig angegebene Kontaktdaten (z. B. Name, E-Mail, Telefonnummer),</li>
            <li>technische Informationen (IP-Adresse, Browsertyp, Betriebssystem, Gerätetyp, Spracheinstellungen).</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Zwecke der Verarbeitung</h2>
          <p className="mb-4">Die Verarbeitung erfolgt ausschließlich zum Zweck der</p>
          <ul className="list-disc pl-6 mb-6 space-y-1">
            <li>Bereitstellung und Funktion des Chatbots,</li>
            <li>Beantwortung von Nutzeranfragen,</li>
            <li>Integration mit angeschlossenen Diensten (z. B. Terminbuchung, Ticket-Systeme, CRM),</li>
            <li>technischen Stabilität, Sicherheit und Weiterentwicklung des Systems.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Rechtsgrundlagen</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Art. 6 Abs. 1 lit. f DSGVO – Berechtigtes Interesse an effizienter Kommunikation und Nutzererlebnis,</li>
            <li>Art. 6 Abs. 1 lit. a DSGVO – Einwilligung, wenn Sie freiwillig personenbezogene Daten eingeben (jederzeit widerrufbar),</li>
            <li>Art. 6 Abs. 1 lit. b DSGVO – Vertragserfüllung oder vorvertragliche Maßnahmen,</li>
            <li>Art. 6 Abs. 1 lit. f DSGVO – kurzfristige Protokollierung technischer Daten zur Systemsicherheit.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Empfänger und eingesetzte Dienstleister</h2>
          <p className="mb-4">
            Zur Umsetzung der Chatbot-Funktion und zugehöriger Automatisierungen werden verschiedene Auftragsverarbeiter und Drittanbieter eingesetzt, darunter insbesondere:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Voiceflow Inc., Kanada – Plattform für Chatbot-Dialoge</li>
            <li>OpenAI L.L.C., USA – KI-Verarbeitung (Sprachmodelle)</li>
            <li>Make Operations GmbH / Celonis SE, EU – Automatisierungsplattform</li>
            <li>Google LLC, USA – Cloud-, Hosting- und Integrationsdienste</li>
          </ul>
          <p className="mb-6">
            sowie weitere Software-Dienstleister (z. B. Calendly, Airtable, Zapier, Slack, Notion, Microsoft 365 usw.), die zur technischen Umsetzung, Terminverwaltung, Kommunikation, Datenverarbeitung oder Speicherung beitragen können.
          </p>
          <p className="mb-6">
            Alle Dienstleister verarbeiten Daten ausschließlich im Auftrag von Quickstartai auf Basis von Auftragsverarbeitungsverträgen gemäß Art. 28 DSGVO und sind vertraglich zur Einhaltung der Datenschutzbestimmungen verpflichtet.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Datenübermittlung in Drittländer</h2>
          <p className="mb-4">
            Bei Nutzung des Chatbots kann es zu einer Übermittlung personenbezogener Daten an Empfänger in Drittländern außerhalb der EU/EWR, insbesondere in die USA, Kanada, oder andere Staaten, kommen, in denen die genannten Dienstleister ihre Systeme betreiben.
          </p>
          <p className="mb-4">
            Zur Sicherstellung eines angemessenen Datenschutzniveaus verwendet Quickstartai die von der EU-Kommission genehmigten Standardvertragsklauseln gemäß Art. 46 Abs. 2 lit. c DSGVO oder andere anerkannte Garantien.
          </p>
          <p className="mb-4">Weitere Informationen zu den Datenschutzbedingungen der eingesetzten Anbieter finden Sie unter:</p>
          <ul className="list-disc pl-6 mb-6 space-y-1">
            <li><a href="https://openai.com/policies/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-[#e2642a] hover:text-[#d55a26] underline">OpenAI Privacy Policy</a></li>
            <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#e2642a] hover:text-[#d55a26] underline">Google Privacy Policy</a></li>
            <li><a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#e2642a] hover:text-[#d55a26] underline">Calendly Privacy Notice</a></li>
            <li><a href="https://www.make.com/en/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#e2642a] hover:text-[#d55a26] underline">Make.com Privacy Policy</a></li>
            <li><a href="https://www.voiceflow.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#e2642a] hover:text-[#d55a26] underline">Voiceflow Privacy Policy</a></li>
            <li><a href="https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_de" target="_blank" rel="noopener noreferrer" className="text-[#e2642a] hover:text-[#d55a26] underline">EU-Standardvertragsklauseln</a></li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Speicherdauer und Löschung</h2>
          <p className="mb-4">
            Die im Rahmen der Chatbot-Nutzung erhobenen Daten werden nur so lange gespeichert, wie dies zur Bearbeitung der jeweiligen Anfrage erforderlich ist.
          </p>
          <p className="mb-4">
            Nach Abschluss der Verarbeitung oder Beendigung der Chat-Sitzung werden die Daten gelöscht.
          </p>
          <p className="mb-4">
            Technisch notwendige Protokolldaten (z. B. IP-Adressen) können kurzzeitig zur Sicherstellung der Systemsicherheit gespeichert werden und werden anschließend automatisch gelöscht.
          </p>
          <p className="mb-6">
            Eine dauerhafte Speicherung von Chatverläufen findet nicht statt.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Rechte der betroffenen Personen</h2>
          <p className="mb-4">Sie haben das Recht auf</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Auskunft (Art. 15 DSGVO),</li>
            <li>Berichtigung (Art. 16 DSGVO),</li>
            <li>Löschung (Art. 17 DSGVO),</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO),</li>
            <li>Widerspruch (Art. 21 DSGVO),</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          </ul>
          <p className="mb-4">
            sowie das Recht, erteilte Einwilligungen jederzeit zu widerrufen (Art. 7 Abs. 3 DSGVO).
          </p>
          <p className="mb-4">
            Anfragen richten Sie bitte an: <a href="mailto:info@quickstartai.de" className="text-[#e2642a] hover:text-[#d55a26] underline">info@quickstartai.de</a>
          </p>
          <p className="mb-6">
            Sie haben zudem das Recht auf Beschwerde bei einer Datenschutzaufsichtsbehörde (Art. 77 DSGVO).
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Sicherheit und Änderungen</h2>
          <p className="mb-4">
            Quickstartai trifft geeignete technische und organisatorische Maßnahmen, um personenbezogene Daten vor unbefugtem Zugriff, Verlust oder Manipulation zu schützen.
          </p>
          <p className="mb-4">
            Diese Datenschutzerklärung kann angepasst werden, wenn neue Dienste oder rechtliche Anforderungen hinzukommen.
          </p>
          <p className="mb-6">
            Die jeweils aktuelle Version ist auf unserer Website abrufbar.
          </p>

          <p className="text-sm text-gray-600 mt-8">Stand: November 2025</p>
        </div>
      </main>

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

export default ChatbotPrivacyPage;
