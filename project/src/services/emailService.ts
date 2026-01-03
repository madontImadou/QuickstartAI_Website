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

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;

export const sendEmailRequest = async (
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
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error('Webhook error:', await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error('Network error:', error);
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