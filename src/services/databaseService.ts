import { createClient } from '@supabase/supabase-js'

// Supabase Client initialisieren
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase configuration missing')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Typen für die Datenbank
export interface Inquiry {
  id: string
  type: 'demo' | 'contact' | 'sales'
  name: string
  email: string
  website_url?: string
  company?: string
  phone?: string
  employees?: string
  budget?: string
  message?: string
  status: 'new' | 'contacted' | 'qualified' | 'closed'
  priority: 'low' | 'medium' | 'high'
  created_at: string
  updated_at: string
}

// Interface für neue Anfragen
interface DemoRequest {
  name: string
  email: string
  websiteUrl: string
}

interface ContactRequest {
  name: string
  email: string
  message: string
}

interface SalesRequest {
  company: string
  name: string
  email: string
  phone: string
  employees: string
  budget: string
  message: string
}

// Supabase Edge Function URL
const INQUIRY_FUNCTION_URL = `${supabaseUrl}/functions/v1/save-inquiry`

const saveInquiryRequest = async (type: 'demo' | 'contact' | 'sales', data: any): Promise<boolean> => {
  try {
    const response = await fetch(INQUIRY_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        type,
        data
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Anfrage-Speicherung Fehler:', errorData)
      return false
    }

    const result = await response.json()
    console.log('Anfrage erfolgreich gespeichert:', result)
    return result.success

  } catch (error) {
    console.error('Fehler beim Speichern der Anfrage:', error)
    return false
  }
}

// Öffentliche Funktionen für die Components
export const saveDemoRequest = async (data: DemoRequest): Promise<boolean> => {
  return saveInquiryRequest('demo', data)
}

export const saveContactRequest = async (data: ContactRequest): Promise<boolean> => {
  return saveInquiryRequest('contact', data)
}

export const saveSalesInquiry = async (data: SalesRequest): Promise<boolean> => {
  return saveInquiryRequest('sales', data)
}

// Admin-Funktionen für Dashboard (später)
export const getInquiries = async (filters?: {
  type?: string
  status?: string
  limit?: number
}): Promise<Inquiry[]> => {
  try {
    let query = supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })

    if (filters?.type) {
      query = query.eq('type', filters.type)
    }

    if (filters?.status) {
      query = query.eq('status', filters.status)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) {
      console.error('Fehler beim Laden der Anfragen:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Fehler beim Laden der Anfragen:', error)
    return []
  }
}

export const updateInquiryStatus = async (
  id: string, 
  status: 'new' | 'contacted' | 'qualified' | 'closed'
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', id)

    if (error) {
      console.error('Fehler beim Aktualisieren des Status:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Status:', error)
    return false
  }
}