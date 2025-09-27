interface DemoRequest {
  name: string;
  email: string;
  websiteUrl: string;
}

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

interface SalesRequest {
  company: string;
  name: string;
  email: string;
  phone: string;
  employees: string;
  budget: string;
  message: string;
}

// Supabase Edge Function URL
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const EMAIL_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/send-email`;

const sendEmailRequest = async (type: 'demo' | 'contact' | 'sales', data: any): Promise<boolean> => {
  try {
    const response = await fetch(EMAIL_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        type,
        data
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('E-Mail-Versand Fehler:', errorData);
      return false;
    }

    const result = await response.json();
    console.log('E-Mail erfolgreich gesendet:', result);
    return result.success;

  } catch (error) {
    console.error('Fehler beim E-Mail-Versand:', error);
    return false;
  }
};

export const sendDemoRequest = async (data: DemoRequest): Promise<boolean> => {
  return sendEmailRequest('demo', data);
};

export const sendContactRequest = async (data: ContactRequest): Promise<boolean> => {
  return sendEmailRequest('contact', data);
};

export const sendSalesInquiry = async (data: SalesRequest): Promise<boolean> => {
  return sendEmailRequest('sales', data);
};