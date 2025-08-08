# QuickStartAI - E-Mail Setup Anleitung

## EmailJS Konfiguration

Um echte E-Mails zu empfangen, müssen Sie EmailJS einrichten:

### 1. EmailJS Account erstellen
1. Gehen Sie zu [EmailJS.com](https://www.emailjs.com/)
2. Erstellen Sie einen kostenlosen Account
3. Verifizieren Sie Ihre E-Mail-Adresse

### 2. E-Mail Service einrichten
1. Gehen Sie zu "Email Services" in Ihrem EmailJS Dashboard
2. Klicken Sie auf "Add New Service"
3. Wählen Sie Ihren E-Mail-Provider (Gmail, Outlook, etc.)
4. Folgen Sie den Anweisungen zur Verbindung
5. Notieren Sie sich die **Service ID** (z.B. "service_quickstartai")

### 3. E-Mail Templates erstellen

#### Template für Demo-Anfragen:
- **Template ID:** `template_demo_request`
- **Subject:** `Neue Demo-Anfrage von {{from_name}}`
- **Content:**
```
Neue Demo-Anfrage erhalten!

Von: {{from_name}}
E-Mail: {{from_email}}
Website: {{website_url}}
Zeitpunkt: {{timestamp}}

Bitte kontaktieren Sie den Interessenten innerhalb von 24 Stunden.
```

#### Template für Kontakt-Anfragen:
- **Template ID:** `template_contact_form`
- **Subject:** `Neue Kontakt-Anfrage von {{from_name}}`
- **Content:**
```
Neue Kontakt-Anfrage erhalten!

Von: {{from_name}}
E-Mail: {{from_email}}
Zeitpunkt: {{timestamp}}

Nachricht:
{{message}}
```

#### Template für Sales-Anfragen:
- **Template ID:** `template_sales_inquiry`
- **Subject:** `Neue Sales-Anfrage von {{company}} ({{from_name}})`
- **Content:**
```
Neue Sales-Anfrage erhalten!

Unternehmen: {{company}}
Name: {{from_name}}
E-Mail: {{from_email}}
Telefon: {{phone}}
Mitarbeiter: {{employees}}
Budget: {{budget}}
Zeitpunkt: {{timestamp}}

Nachricht:
{{message}}
```

### 4. Public Key konfigurieren
1. Gehen Sie zu "Account" → "General"
2. Kopieren Sie Ihren **Public Key**
3. Ersetzen Sie in `src/services/emailService.ts`:
   ```typescript
   const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY';
   ```
   mit Ihrem echten Public Key

### 5. Service IDs anpassen
Falls Ihre Service ID anders ist, passen Sie diese in `src/services/emailService.ts` an:
```typescript
const EMAILJS_SERVICE_ID = 'service_quickstartai'; // Ihre Service ID
```

### 6. Testen
1. Starten Sie die Anwendung: `npm run dev`
2. Füllen Sie eine Demo-Anfrage aus
3. Prüfen Sie Ihr E-Mail-Postfach

## E-Mail-Adressen

- **Demo-Anfragen:** maximilian@quickstartai.de
- **Kontakt-Anfragen:** maximilian@quickstartai.de  
- **Sales-Anfragen:** info@quickstartai.de

## Troubleshooting

### E-Mails kommen nicht an:
1. Prüfen Sie Spam-Ordner
2. Verifizieren Sie EmailJS Service-Verbindung
3. Kontrollieren Sie Template IDs
4. Prüfen Sie Public Key

### Fehler in der Konsole:
1. Öffnen Sie Browser-Entwicklertools (F12)
2. Schauen Sie in die Console für Fehlermeldungen
3. Prüfen Sie Network-Tab für API-Aufrufe

## Kosten
- EmailJS: 200 E-Mails/Monat kostenlos
- Danach: $15/Monat für 1000 E-Mails

## Support
Bei Problemen kontaktieren Sie: maximilian@quickstartai.de