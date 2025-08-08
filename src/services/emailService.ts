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

// EmailJS Konfiguration
const EMAILJS_SERVICE_ID = 'service_quickstartai';
const EMAILJS_TEMPLATE_DEMO = 'template_demo_request';
const EMAILJS_TEMPLATE_CONTACT = 'template_contact_form';
const EMAILJS_TEMPLATE_SALES = 'template_sales_inquiry';
const EMAILJS_PUBLIC_KEY = 'KXCxtVUDSVmV3Iw8m'; // Muss durch echten Key ersetzt werden

// EmailJS dynamisch laden
const loadEmailJS = async () => {
  if (typeof window !== 'undefined' && !(window as any).emailjs) {
    const emailjs = await import('@emailjs/browser');
    (window as any).emailjs = emailjs;
    return emailjs;
  }
  return (window as any).emailjs;
};

export const sendDemoRequest = async (data: DemoRequest): Promise<boolean> => {
  try {
    const emailjs = await loadEmailJS();
    
    const templateParams = {
      to_email: 'maximilian@quickstartai.de',
      from_name: data.name,
      from_email: data.email,
      website_url: data.websiteUrl,
      request_type: 'Demo-Anfrage',
      timestamp: new Date().toLocaleString('de-DE'),
      subject: `Neue Demo-Anfrage von ${data.name}`
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_DEMO,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('Demo-Anfrage erfolgreich gesendet:', response);
    return response.status === 200;
  } catch (error) {
    console.error('Fehler beim Senden der Demo-Anfrage:', error);
    return false;
  }
};

export const sendContactRequest = async (data: ContactRequest): Promise<boolean> => {
  try {
    const emailjs = await loadEmailJS();
    
    const templateParams = {
      to_email: 'maximilian@quickstartai.de',
      from_name: data.name,
      from_email: data.email,
      message: data.message,
      request_type: 'Kontakt-Anfrage',
      timestamp: new Date().toLocaleString('de-DE'),
      subject: `Neue Kontakt-Anfrage von ${data.name}`
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_CONTACT,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('Kontakt-Anfrage erfolgreich gesendet:', response);
    return response.status === 200;
  } catch (error) {
    console.error('Fehler beim Senden der Kontakt-Anfrage:', error);
    return false;
  }
};

export const sendSalesInquiry = async (data: SalesRequest): Promise<boolean> => {
  try {
    const emailjs = await loadEmailJS();
    
    const templateParams = {
      to_email: 'info@quickstartai.de',
      from_name: data.name,
      from_email: data.email,
      company: data.company,
      phone: data.phone || 'Nicht angegeben',
      employees: data.employees || 'Nicht angegeben',
      budget: data.budget || 'Nicht angegeben',
      message: data.message,
      request_type: 'Sales-Anfrage',
      timestamp: new Date().toLocaleString('de-DE'),
      subject: `Neue Sales-Anfrage von ${data.company} (${data.name})`
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_SALES,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('Sales-Anfrage erfolgreich gesendet:', response);
    return response.status === 200;
  } catch (error) {
    console.error('Fehler beim Senden der Sales-Anfrage:', error);
    return false;
  }
};