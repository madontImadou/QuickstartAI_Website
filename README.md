# QuickStartAI - Supabase Datenbank-System

## Anfragen-Management mit Supabase

### 1. Supabase Projekt erstellen
1. Gehen Sie zu [Supabase.com](https://supabase.com/)
2. Erstellen Sie ein neues Projekt
3. Notieren Sie sich:
   - **Project URL** (z.B. `https://abc123.supabase.co`)
   - **Anon Key** (aus Settings → API)

### 2. Umgebungsvariablen konfigurieren
Erstellen Sie eine `.env` Datei:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Datenbank-Schema
Die Datenbank-Migration wird automatisch ausgeführt und erstellt:

**Tabelle: `inquiries`**
- `id` - Eindeutige ID
- `type` - Art der Anfrage (demo/contact/sales)
- `name` - Name des Anfragenden
- `email` - E-Mail-Adresse
- `website_url` - Website (nur bei Demo-Anfragen)
- `company` - Unternehmen (nur bei Sales-Anfragen)
- `phone` - Telefonnummer (optional)
- `employees` - Anzahl Mitarbeiter (optional)
- `budget` - Budget-Range (optional)
- `message` - Nachricht/Anfrage
- `status` - Status (new/contacted/qualified/closed)
- `priority` - Priorität (low/medium/high)
- `created_at` - Erstellungszeitpunkt
- `updated_at` - Letzte Aktualisierung

### 4. Anfragen-Typen
- **Demo-Anfragen** → Priorität: HIGH
- **Kontakt-Anfragen** → Priorität: MEDIUM  
- **Sales-Anfragen** → Priorität: HIGH

### 5. Testen
1. Starten Sie den Dev Server: `npm run dev`
2. Füllen Sie eine Demo-Anfrage aus
3. Prüfen Sie die Supabase Datenbank
4. Schauen Sie in die Browser-Konsole für Debug-Infos

### 6. Anfragen verwalten
**Supabase Dashboard:**
1. Gehen Sie zu Ihrem Supabase Projekt
2. Klicken Sie auf "Table Editor"
3. Wählen Sie die "inquiries" Tabelle
4. Sehen Sie alle Anfragen in Echtzeit

**SQL-Queries für häufige Aufgaben:**
```sql
-- Alle neuen Anfragen
SELECT * FROM inquiries WHERE status = 'new' ORDER BY created_at DESC;

-- Nur Demo-Anfragen
SELECT * FROM inquiries WHERE type = 'demo' ORDER BY created_at DESC;

-- Hochpriorisierte Anfragen
SELECT * FROM inquiries WHERE priority = 'high' ORDER BY created_at DESC;

-- Status einer Anfrage ändern
UPDATE inquiries SET status = 'contacted' WHERE id = 'your-inquiry-id';
```

### 7. Kosten
- **Supabase:** Kostenlos bis 500MB Datenbank
- **Keine E-Mail-Kosten** mehr nötig!
- **Skaliert automatisch** mit Ihrem Business

### 8. Vorteile des Datenbank-Systems
- ✅ Keine verlorenen E-Mails mehr
- ✅ Vollständige Anfragen-Historie
- ✅ Status-Tracking möglich
- ✅ Prioritäten-Management
- ✅ Echtzeit-Dashboard
- ✅ Exportierbare Daten
- ✅ Automatische Backups
- ✅ Suchfunktionen

### 9. Nächste Schritte (Optional)
- **Admin-Dashboard** für bessere Verwaltung
- **E-Mail-Benachrichtigungen** bei neuen Anfragen
- **Automatische Follow-ups** nach X Tagen
- **Analytics** und Reporting
- **CRM-Integration** (HubSpot, Salesforce)

### 10. Troubleshooting

**Anfragen kommen nicht an:**
1. Prüfen Sie Supabase Dashboard → Table Editor
2. Kontrollieren Sie API-Keys in `.env`
3. Schauen Sie in Browser-Konsole für Fehlermeldungen
4. Prüfen Sie Supabase Edge Function Logs

**Datenbank-Fehler:**
1. Öffnen Sie Supabase Dashboard
2. Gehen Sie zu "Logs" → "Functions"
3. Prüfen Sie auf Fehler in der `save-inquiry` Funktion

### 11. Support
Bei Problemen kontaktieren Sie: maximilian@quickstartai.de

## Nächste Schritte
1. Supabase Projekt erstellen
2. `.env` Datei konfigurieren  
3. Erste Test-Anfrage speichern
4. Datenbank im Dashboard prüfen