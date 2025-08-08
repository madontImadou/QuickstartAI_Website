/*
  # Anfragen-Tabelle für QuickStartAI

  1. Neue Tabellen
    - `inquiries`
      - `id` (uuid, primary key)
      - `type` (text) - Art der Anfrage: 'demo', 'contact', 'sales'
      - `name` (text) - Name des Anfragenden
      - `email` (text) - E-Mail-Adresse
      - `website_url` (text, optional) - Website für Demo-Anfragen
      - `company` (text, optional) - Unternehmen für Sales-Anfragen
      - `phone` (text, optional) - Telefonnummer
      - `employees` (text, optional) - Anzahl Mitarbeiter
      - `budget` (text, optional) - Budget-Range
      - `message` (text, optional) - Nachricht/Anfrage
      - `status` (text) - Status: 'new', 'contacted', 'qualified', 'closed'
      - `priority` (text) - Priorität: 'low', 'medium', 'high'
      - `created_at` (timestamp) - Erstellungszeitpunkt
      - `updated_at` (timestamp) - Letzte Aktualisierung

  2. Sicherheit
    - Enable RLS auf `inquiries` Tabelle
    - Policies für authentifizierte Benutzer (Admin-Zugriff)
    - Public Insert für Website-Anfragen

  3. Indizes
    - Index auf `type` für schnelle Filterung
    - Index auf `status` für Dashboard-Queries
    - Index auf `created_at` für chronologische Sortierung
*/

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('demo', 'contact', 'sales')),
  name text NOT NULL,
  email text NOT NULL,
  website_url text,
  company text,
  phone text,
  employees text,
  budget text,
  message text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Policy für öffentliche Inserts (Website-Anfragen)
CREATE POLICY "Anyone can insert inquiries"
  ON inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy für authentifizierte Benutzer (Admin-Dashboard)
CREATE POLICY "Authenticated users can view all inquiries"
  ON inquiries
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update inquiries"
  ON inquiries
  FOR UPDATE
  TO authenticated
  USING (true);

-- Indizes für bessere Performance
CREATE INDEX IF NOT EXISTS inquiries_type_idx ON inquiries(type);
CREATE INDEX IF NOT EXISTS inquiries_status_idx ON inquiries(status);
CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_priority_idx ON inquiries(priority);

-- Trigger für updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_inquiries_updated_at
  BEFORE UPDATE ON inquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();