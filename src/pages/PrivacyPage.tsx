import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPage: React.FC = () => {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Datenschutzerklärung</h1>
          <p className="text-gray-600 mb-8">Stand: 8. August 2025</p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Inhaltsübersicht</h2>
          <ul className="space-y-2 mb-8">
            <li><a className="text-[#e2642a] hover:text-[#d55a26] underline" href="#m3">Verantwortlicher</a></li>
            <li><a className="text-[#e2642a] hover:text-[#d55a26] underline" href="#mOverview">Übersicht der Verarbeitungen</a></li>
            <li><a className="text-[#e2642a] hover:text-[#d55a26] underline" href="#m2427">Maßgebliche Rechtsgrundlagen</a></li>
            <li><a className="text-[#e2642a] hover:text-[#d55a26] underline" href="#m27">Sicherheitsmaßnahmen</a></li>
            <li><a className="text-[#e2642a] hover:text-[#d55a26] underline" href="#m25">Übermittlung von personenbezogenen Daten</a></li>
            <li><a className="text-[#e2642a] hover:text-[#d55a26] underline" href="#m24">Internationale Datentransfers</a></li>
            <li><a className="text-[#e2642a] hover:text-[#d55a26] underline" href="#m12">Allgemeine Informationen zur Datenspeicherung und Löschung</a></li>
            <li><a className="text-[#e2642a] hover:text-[#d55a26] underline" href="#m10">Rechte der betroffenen Personen</a></li>
            <li><a className="text-[#e2642a] hover:text-[#d55a26] underline" href="#m317">Geschäftliche Leistungen</a></li>
            <li><a className="text-[#e2642a] hover:text-[#d55a26] underline" href="#m225">Bereitstellung des Onlineangebots und Webhosting</a></li>
            <li><a className="text-[#e2642a] hover:text-[#d55a26] underline" href="#m134">Einsatz von Cookies</a></li>
            <li><a className="text-[#e2642a] hover:text-[#d55a26] underline" href="#m182">Kontakt- und Anfrageverwaltung</a></li>
            <li><a className="text-[#e2642a] hover:text-[#d55a26] underline" href="#m263">Webanalyse, Monitoring und Optimierung</a></li>
            <li><a className="text-[#e2642a] hover:text-[#d55a26] underline" href="#m264">Onlinemarketing</a></li>
            <li><a className="text-[#e2642a] hover:text-[#d55a26] underline" href="#m136">Präsenzen in sozialen Netzwerken (Social Media)</a></li>
            <li><a className="text-[#e2642a] hover:text-[#d55a26] underline" href="#m328">Plug-ins und eingebettete Funktionen sowie Inhalte</a></li>
          </ul>

          <div className="prose prose-lg max-w-none">
            <h2 id="m3" className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Verantwortlicher</h2>
            <p className="mb-4">
              QuickstartAI<br />
              Zeppelinstr.73<br />
              81669 München
            </p>
            <p className="mb-4">Vertretungsberechtigte Personen: Maximilian Madou Theele</p>
            <p className="mb-6">
              E-Mail-Adresse: <a href="mailto:maximilian@quickstartai.de" className="text-[#e2642a] hover:text-[#d55a26] underline">maximilian@quickstartai.de</a>
            </p>

            <h2 id="mOverview" className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Übersicht der Verarbeitungen</h2>
            <p className="mb-4">Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer Verarbeitung zusammen und verweist auf die betroffenen Personen.</p>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Arten der verarbeiteten Daten</h3>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>Bestandsdaten.</li>
              <li>Zahlungsdaten.</li>
              <li>Kontaktdaten.</li>
              <li>Inhaltsdaten.</li>
              <li>Vertragsdaten.</li>
              <li>Nutzungsdaten.</li>
              <li>Meta-, Kommunikations- und Verfahrensdaten.</li>
              <li>Protokolldaten.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Kategorien betroffener Personen</h3>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>Leistungsempfänger und Auftraggeber.</li>
              <li>Interessenten.</li>
              <li>Kommunikationspartner.</li>
              <li>Nutzer.</li>
              <li>Geschäfts- und Vertragspartner.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Zwecke der Verarbeitung</h3>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>Erbringung vertraglicher Leistungen und Erfüllung vertraglicher Pflichten.</li>
              <li>Kommunikation.</li>
              <li>Sicherheitsmaßnahmen.</li>
              <li>Reichweitenmessung.</li>
              <li>Tracking.</li>
              <li>Büro- und Organisationsverfahren.</li>
              <li>Zielgruppenbildung.</li>
              <li>Organisations- und Verwaltungsverfahren.</li>
              <li>Feedback.</li>
              <li>Marketing.</li>
              <li>Profile mit nutzerbezogenen Informationen.</li>
              <li>Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit.</li>
              <li>Informationstechnische Infrastruktur.</li>
              <li>Öffentlichkeitsarbeit.</li>
              <li>Geschäftsprozesse und betriebswirtschaftliche Verfahren.</li>
            </ul>

            <h2 id="m2427" className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Maßgebliche Rechtsgrundlagen</h2>
            <p className="mb-4"><strong>Maßgebliche Rechtsgrundlagen nach der DSGVO:</strong> Im Folgenden erhalten Sie eine Übersicht der Rechtsgrundlagen der DSGVO, auf deren Basis wir personenbezogene Daten verarbeiten. Bitte nehmen Sie zur Kenntnis, dass neben den Regelungen der DSGVO nationale Datenschutzvorgaben in Ihrem bzw. unserem Wohn- oder Sitzland gelten können. Sollten ferner im Einzelfall speziellere Rechtsgrundlagen maßgeblich sein, teilen wir Ihnen diese in der Datenschutzerklärung mit.</p>
            
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO)</strong> - Die betroffene Person hat ihre Einwilligung in die Verarbeitung der sie betreffenden personenbezogenen Daten für einen spezifischen Zweck oder mehrere bestimmte Zwecke gegeben.</li>
              <li><strong>Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO)</strong> - Die Verarbeitung ist für die Erfüllung eines Vertrags, dessen Vertragspartei die betroffene Person ist, oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, die auf Anfrage der betroffenen Person erfolgen.</li>
              <li><strong>Rechtliche Verpflichtung (Art. 6 Abs. 1 S. 1 lit. c) DSGVO)</strong> - Die Verarbeitung ist zur Erfüllung einer rechtlichen Verpflichtung erforderlich, der der Verantwortliche unterliegt.</li>
              <li><strong>Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO)</strong> - die Verarbeitung ist zur Wahrung der berechtigten Interessen des Verantwortlichen oder eines Dritten notwendig, vorausgesetzt, dass die Interessen, Grundrechte und Grundfreiheiten der betroffenen Person, die den Schutz personenbezogener Daten verlangen, nicht überwiegen.</li>
            </ul>

            <p className="mb-6"><strong>Nationale Datenschutzregelungen in Deutschland:</strong> Zusätzlich zu den Datenschutzregelungen der DSGVO gelten nationale Regelungen zum Datenschutz in Deutschland. Hierzu gehört insbesondere das Gesetz zum Schutz vor Missbrauch personenbezogener Daten bei der Datenverarbeitung (Bundesdatenschutzgesetz – BDSG). Das BDSG enthält insbesondere Spezialregelungen zum Recht auf Auskunft, zum Recht auf Löschung, zum Widerspruchsrecht, zur Verarbeitung besonderer Kategorien personenbezogener Daten, zur Verarbeitung für andere Zwecke und zur Übermittlung sowie automatisierten Entscheidungsfindung im Einzelfall einschließlich Profiling. Ferner können Landesdatenschutzgesetze der einzelnen Bundesländer zur Anwendung gelangen.</p>

            <h2 id="m27" className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Sicherheitsmaßnahmen</h2>
            <p className="mb-4">Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter Berücksichtigung des Stands der Technik, der Implementierungskosten und der Art, des Umfangs, der Umstände und der Zwecke der Verarbeitung sowie der unterschiedlichen Eintrittswahrscheinlichkeiten und des Ausmaßes der Bedrohung der Rechte und Freiheiten natürlicher Personen geeignete technische und organisatorische Maßnahmen, um ein dem Risiko angemessenes Schutzniveau zu gewährleisten.</p>
            <p className="mb-6">Zu den Maßnahmen gehören insbesondere die Sicherung der Vertraulichkeit, Integrität und Verfügbarkeit von Daten durch Kontrolle des physischen und elektronischen Zugangs zu den Daten als auch des sie betreffenden Zugriffs, der Eingabe, der Weitergabe, der Sicherung der Verfügbarkeit und ihrer Trennung. Des Weiteren haben wir Verfahren eingerichtet, die eine Wahrnehmung von Betroffenenrechten, die Löschung von Daten und Reaktionen auf die Gefährdung der Daten gewährleisten. Ferner berücksichtigen wir den Schutz personenbezogener Daten bereits bei der Entwicklung bzw. Auswahl von Hardware, Software sowie Verfahren entsprechend dem Prinzip des Datenschutzes, durch Technikgestaltung und durch datenschutzfreundliche Voreinstellungen.</p>

            <h2 id="m25" className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Übermittlung von personenbezogenen Daten</h2>
            <p className="mb-6">Im Rahmen unserer Verarbeitung von personenbezogenen Daten kommt es vor, dass diese an andere Stellen, Unternehmen, rechtlich selbstständige Organisationseinheiten oder Personen übermittelt beziehungsweise ihnen gegenüber offengelegt werden. Zu den Empfängern dieser Daten können z. B. mit IT-Aufgaben beauftragte Dienstleister gehören oder Anbieter von Diensten und Inhalten, die in eine Website eingebunden sind. In solchen Fällen beachten wir die gesetzlichen Vorgaben und schließen insbesondere entsprechende Verträge bzw. Vereinbarungen, die dem Schutz Ihrer Daten dienen, mit den Empfängern Ihrer Daten ab.</p>

            <h2 id="m24" className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Internationale Datentransfers</h2>
            <p className="mb-4"><strong>Datenverarbeitung in Drittländern:</strong> Sofern wir Daten in ein Drittland (d. h. außerhalb der Europäischen Union (EU) oder des Europäischen Wirtschaftsraums (EWR)) übermitteln oder dies im Rahmen der Nutzung von Diensten Dritter oder der Offenlegung bzw. Übermittlung von Daten an andere Personen, Stellen oder Unternehmen geschieht (was erkennbar wird anhand der Postadresse des jeweiligen Anbieters oder wenn in der Datenschutzerklärung ausdrücklich auf den Datentransfer in Drittländer hingewiesen wird), erfolgt dies stets im Einklang mit den gesetzlichen Vorgaben.</p>
            <p className="mb-4">Für Datenübermittlungen in die USA stützen wir uns vorrangig auf das Data Privacy Framework (DPF), welches durch einen Angemessenheitsbeschluss der EU-Kommission vom 10.07.2023 als sicherer Rechtsrahmen anerkannt wurde. Zusätzlich haben wir mit den jeweiligen Anbietern Standardvertragsklauseln abgeschlossen, die den Vorgaben der EU-Kommission entsprechen und vertragliche Verpflichtungen zum Schutz Ihrer Daten festlegen.</p>
            <p className="mb-4">Diese zweifache Absicherung gewährleistet einen umfassenden Schutz Ihrer Daten: Das DPF bildet die primäre Schutzebene, während die Standardvertragsklauseln als zusätzliche Sicherheit dienen. Sollten sich Änderungen im Rahmen des DPF ergeben, greifen die Standardvertragsklauseln als zuverlässige Rückfalloption ein. So stellen wir sicher, dass Ihre Daten auch bei etwaigen politischen oder rechtlichen Veränderungen stets angemessen geschützt bleiben.</p>
            <p className="mb-4">Bei den einzelnen Diensteanbietern informieren wir Sie darüber, ob sie nach dem DPF zertifiziert sind und ob Standardvertragsklauseln vorliegen. Weitere Informationen zum DPF und eine Liste der zertifizierten Unternehmen finden Sie auf der Website des US-Handelsministeriums unter <a href="https://www.dataprivacyframework.gov/" target="_blank" className="text-[#e2642a] hover:text-[#d55a26] underline">https://www.dataprivacyframework.gov/</a> (in englischer Sprache).</p>
            <p className="mb-6">Für Datenübermittlungen in andere Drittländer gelten entsprechende Sicherheitsmaßnahmen, insbesondere Standardvertragsklauseln, ausdrückliche Einwilligungen oder gesetzlich erforderliche Übermittlungen. Informationen zu Drittlandtransfers und geltenden Angemessenheitsbeschlüssen können Sie dem Informationsangebot der EU-Kommission entnehmen: <a href="https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection_en?prefLang=de" target="_blank" className="text-[#e2642a] hover:text-[#d55a26] underline">https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection_en?prefLang=de.</a></p>

            <h2 id="m12" className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Allgemeine Informationen zur Datenspeicherung und Löschung</h2>
            <p className="mb-4">Wir löschen personenbezogene Daten, die wir verarbeiten, gemäß den gesetzlichen Bestimmungen, sobald die zugrundeliegenden Einwilligungen widerrufen werden oder keine weiteren rechtlichen Grundlagen für die Verarbeitung bestehen. Dies betrifft Fälle, in denen der ursprüngliche Verarbeitungszweck entfällt oder die Daten nicht mehr benötigt werden. Ausnahmen von dieser Regelung bestehen, wenn gesetzliche Pflichten oder besondere Interessen eine längere Aufbewahrung oder Archivierung der Daten erfordern.</p>
            <p className="mb-4">Insbesondere müssen Daten, die aus handels- oder steuerrechtlichen Gründen aufbewahrt werden müssen oder deren Speicherung notwendig ist zur Rechtsverfolgung oder zum Schutz der Rechte anderer natürlicher oder juristischer Personen, entsprechend archiviert werden.</p>
            <p className="mb-4">Unsere Datenschutzhinweise enthalten zusätzliche Informationen zur Aufbewahrung und Löschung von Daten, die speziell für bestimmte Verarbeitungsprozesse gelten.</p>
            <p className="mb-4">Bei mehreren Angaben zur Aufbewahrungsdauer oder Löschungsfristen eines Datums, ist stets die längste Frist maßgeblich. Daten, die nicht mehr für den ursprünglich vorgesehenen Zweck, sondern aufgrund gesetzlicher Vorgaben oder anderer Gründe aufbewahrt werden, verarbeiten wir ausschließlich zu den Gründen, die ihre Aufbewahrung rechtfertigen.</p>
            <p className="mb-4"><strong>Aufbewahrung und Löschung von Daten:</strong> Die folgenden allgemeinen Fristen gelten für die Aufbewahrung und Archivierung nach deutschem Recht:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>10 Jahre</strong> - Aufbewahrungsfrist für Bücher und Aufzeichnungen, Jahresabschlüsse, Inventare, Lageberichte, Eröffnungsbilanz sowie die zu ihrem Verständnis erforderlichen Arbeitsanweisungen und sonstigen Organisationsunterlagen (§ 147 Abs. 1 Nr. 1 i.V.m. Abs. 3 AO, § 14b Abs. 1 UStG, § 257 Abs. 1 Nr. 1 i.V.m. Abs. 4 HGB).</li>
              <li><strong>8 Jahre</strong> - Buchungsbelege, wie z. B. Rechnungen und Kostenbelege (§ 147 Abs. 1 Nr. 4 und 4a i.V.m. Abs. 3 Satz 1 AO sowie § 257 Abs. 1 Nr. 4 i.V.m. Abs. 4 HGB).</li>
              <li><strong>6 Jahre</strong> - Übrige Geschäftsunterlagen: empfangene Handels- oder Geschäftsbriefe, Wiedergaben der abgesandten Handels- oder Geschäftsbriefe, sonstige Unterlagen, soweit sie für die Besteuerung von Bedeutung sind, z. B. Stundenlohnzettel, Betriebsabrechnungsbögen, Kalkulationsunterlagen, Preisauszeichnungen, aber auch Lohnabrechnungsunterlagen, soweit sie nicht bereits Buchungsbelege sind und Kassenstreifen (§ 147 Abs. 1 Nr. 2, 3, 5 i.V.m. Abs. 3 AO, § 257 Abs. 1 Nr. 2 u. 3 i.V.m. Abs. 4 HGB).</li>
              <li><strong>3 Jahre</strong> - Daten, die erforderlich sind, um potenzielle Gewährleistungs- und Schadensersatzansprüche oder ähnliche vertragliche Ansprüche und Rechte zu berücksichtigen sowie damit verbundene Anfragen zu bearbeiten, basierend auf früheren Geschäftserfahrungen und üblichen Branchenpraktiken, werden für die Dauer der regulären gesetzlichen Verjährungsfrist von drei Jahren gespeichert (§§ 195, 199 BGB).</li>
            </ul>

            <h2 id="m10" className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Rechte der betroffenen Personen</h2>
            <p className="mb-4"><strong>Rechte der betroffenen Personen aus der DSGVO:</strong> Ihnen stehen als Betroffene nach der DSGVO verschiedene Rechte zu, die sich insbesondere aus Art. 15 bis 21 DSGVO ergeben:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Widerspruchsrecht:</strong> Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten, die aufgrund von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling. Werden die Sie betreffenden personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht.</li>
              <li><strong>Widerrufsrecht bei Einwilligungen:</strong> Sie haben das Recht, erteilte Einwilligungen jederzeit zu widerrufen.</li>
              <li><strong>Auskunftsrecht:</strong> Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob betreffende Daten verarbeitet werden und auf Auskunft über diese Daten sowie auf weitere Informationen und Kopie der Daten entsprechend den gesetzlichen Vorgaben.</li>
              <li><strong>Recht auf Berichtigung:</strong> Sie haben entsprechend den gesetzlichen Vorgaben das Recht, die Vervollständigung der Sie betreffenden Daten oder die Berichtigung der Sie betreffenden unrichtigen Daten zu verlangen.</li>
              <li><strong>Recht auf Löschung und Einschränkung der Verarbeitung:</strong> Sie haben nach Maßgabe der gesetzlichen Vorgaben das Recht, zu verlangen, dass Sie betreffende Daten unverzüglich gelöscht werden, bzw. alternativ nach Maßgabe der gesetzlichen Vorgaben eine Einschränkung der Verarbeitung der Daten zu verlangen.</li>
              <li><strong>Recht auf Datenübertragbarkeit:</strong> Sie haben das Recht, Sie betreffende Daten, die Sie uns bereitgestellt haben, nach Maßgabe der gesetzlichen Vorgaben in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten oder deren Übermittlung an einen anderen Verantwortlichen zu fordern.</li>
              <li><strong>Beschwerde bei Aufsichtsbehörde:</strong> Sie haben unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs das Recht auf Beschwerde bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthaltsorts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die Vorgaben der DSGVO verstößt.</li>
            </ul>

            {/* Weitere Abschnitte können hier hinzugefügt werden */}
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

export default PrivacyPage;