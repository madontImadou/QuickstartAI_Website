// =====================
// Typen
// =====================

export interface DemoRequest {
  name: string
  email: string
  websiteUrl: string
}

export interface ContactRequest {
  name: string
  email: string
  message: string
}

export interface SalesRequest {
  company: string
  name: string
  email: string
  phone: string
  employees: string
  budget: string
  message: string
}

// =====================
// Webhook Config
// =====================

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL

if (!WEBHOOK_URL) {
  throw new Error('Webhook URL missing')
}

// =====================
// Zentrale Funktion
// =====================

const sendInquiry = async (
  type: 'demo' | 'contact' | 'sales',
  data: DemoRequest | ContactRequest | SalesRequest
): Promise<boolean> => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        data,
        source: 'website',
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      console.error('Webhook error:', await response.text())
      return false
    }

    return true
  } catch (error) {
    console.error('Network error:', error)
    return false
  }
}

// =====================
// Öffentliche API
// =====================

export const saveDemoRequest = (data: DemoRequest) =>
  sendInquiry('demo', data)

export const saveContactRequest = (data: ContactRequest) =>
  sendInquiry('contact', data)

export const saveSalesInquiry = (data: SalesRequest) =>
  sendInquiry('sales', data)
