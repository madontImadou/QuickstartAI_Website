/*
  # E-Mail Versendung über Supabase Edge Function

  1. Funktionalität
    - Empfängt E-Mail-Anfragen von der Website
    - Versendet E-Mails über Resend API
    - Unterstützt Demo-, Kontakt- und Sales-Anfragen

  2. Sicherheit
    - CORS-Header für Website-Integration
    - Fehlerbehandlung für robuste Funktion
    - API-Key Schutz über Umgebungsvariablen
*/

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface EmailRequest {
  type: 'demo' | 'contact' | 'sales'
  data: {
    name: string
    email: string
    websiteUrl?: string
    message?: string
    company?: string
    phone?: string
    employees?: string
    budget?: string
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { type, data }: EmailRequest = await req.json()

    // Bestimme Empfänger und Betreff basierend auf Anfrage-Typ
    let toEmail = 'maximilian@quickstartai.de'
    let subject = ''
    let htmlContent = ''

    switch (type) {
      case 'demo':
        subject = `Neue Demo-Anfrage von ${data.name}`
        htmlContent = `
          <h2>Neue Demo-Anfrage erhalten!</h2>
          <p><strong>Von:</strong> ${data.name}</p>
          <p><strong>E-Mail:</strong> ${data.email}</p>
          <p><strong>Website:</strong> ${data.websiteUrl}</p>
          <p><strong>Zeitpunkt:</strong> ${new Date().toLocaleString('de-DE')}</p>
          <hr>
          <p>Bitte kontaktieren Sie den Interessenten innerhalb von 24 Stunden.</p>
        `
        break

      case 'contact':
        subject = `Neue Kontakt-Anfrage von ${data.name}`
        htmlContent = `
          <h2>Neue Kontakt-Anfrage erhalten!</h2>
          <p><strong>Von:</strong> ${data.name}</p>
          <p><strong>E-Mail:</strong> ${data.email}</p>
          <p><strong>Zeitpunkt:</strong> ${new Date().toLocaleString('de-DE')}</p>
          <hr>
          <h3>Nachricht:</h3>
          <p>${data.message}</p>
        `
        break

      case 'sales':
        toEmail = 'info@quickstartai.de'
        subject = `Neue Sales-Anfrage von ${data.company} (${data.name})`
        htmlContent = `
          <h2>Neue Sales-Anfrage erhalten!</h2>
          <p><strong>Unternehmen:</strong> ${data.company}</p>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>E-Mail:</strong> ${data.email}</p>
          <p><strong>Telefon:</strong> ${data.phone || 'Nicht angegeben'}</p>
          <p><strong>Mitarbeiter:</strong> ${data.employees || 'Nicht angegeben'}</p>
          <p><strong>Budget:</strong> ${data.budget || 'Nicht angegeben'}</p>
          <p><strong>Zeitpunkt:</strong> ${new Date().toLocaleString('de-DE')}</p>
          <hr>
          <h3>Nachricht:</h3>
          <p>${data.message}</p>
        `
        break

      default:
        throw new Error('Unbekannter E-Mail-Typ')
    }

    // E-Mail über Resend API versenden
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'QuickStartAI <noreply@quickstartai.de>',
        to: [toEmail],
        subject: subject,
        html: htmlContent,
      }),
    })

    if (!resendResponse.ok) {
      const error = await resendResponse.text()
      console.error('Resend API Fehler:', error)
      throw new Error('E-Mail konnte nicht gesendet werden')
    }

    const result = await resendResponse.json()
    console.log('E-Mail erfolgreich gesendet:', result)

    return new Response(
      JSON.stringify({ success: true, message: 'E-Mail erfolgreich gesendet' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Fehler beim E-Mail-Versand:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Unbekannter Fehler beim E-Mail-Versand' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})