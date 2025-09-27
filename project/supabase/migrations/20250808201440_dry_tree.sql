/*
  # Create inquiries table for storing customer inquiries

  1. New Tables
    - `inquiries`
      - `id` (uuid, primary key)
      - `type` (text) - Type of inquiry: demo, contact, sales
      - `name` (text) - Customer name
      - `email` (text) - Customer email
      - `website_url` (text, optional) - Website URL for demo requests
      - `company` (text, optional) - Company name for sales requests
      - `phone` (text, optional) - Phone number
      - `employees` (text, optional) - Number of employees
      - `budget` (text, optional) - Budget range
      - `message` (text, optional) - Customer message
      - `status` (text) - Status: new, contacted, qualified, closed
      - `priority` (text) - Priority: low, medium, high
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `inquiries` table
    - Add policy for anonymous users to insert inquiries
    - Add policy for authenticated users to read/update inquiries

  3. Indexes
    - Index on created_at for sorting
    - Index on status for filtering
    - Index on type for filtering
    - Index on priority for filtering

  4. Triggers
    - Auto-update updated_at timestamp
*/

-- Create the inquiries table
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

-- Enable Row Level Security
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can insert inquiries"
  ON inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_status_idx ON inquiries (status);
CREATE INDEX IF NOT EXISTS inquiries_type_idx ON inquiries (type);
CREATE INDEX IF NOT EXISTS inquiries_priority_idx ON inquiries (priority);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_inquiries_updated_at
  BEFORE UPDATE ON inquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();