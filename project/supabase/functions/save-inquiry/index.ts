/*
  # Anfragen in Datenbank speichern

  1. Funktionalität
    - Empfängt Anfragen von der Website
    - Speichert sie in der Supabase Datenbank
    - Unterstützt Demo-, Kontakt- und Sales-Anfragen
    - Automatische Prioritätszuweisung

  2. Sicherheit
    - CORS-Header für Website-Integration
    - Input-Validierung
    - Fehlerbehandlung
*/

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface InquiryRequest {
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
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { type, data }: InquiryRequest = await req.json()

    // Enhanced validation
    if (!type || !data.name?.trim() || !data.email?.trim()) {
      throw new Error('Required fields missing: type, name, email')
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      throw new Error('Invalid email format')
    }
    
    // Type validation
    if (!['demo', 'contact', 'sales'].includes(type)) {
      throw new Error('Invalid inquiry type')
    }
    
    // Sanitize inputs
    const sanitizedData = {
      name: data.name.trim().substring(0, 100),
      email: data.email.trim().toLowerCase().substring(0, 100),
      website_url: data.websiteUrl?.trim().substring(0, 200) || null,
      company: data.company?.trim().substring(0, 100) || null,
      phone: data.phone?.trim().substring(0, 20) || null,
      employees: data.employees?.trim().substring(0, 20) || null,
      budget: data.budget?.trim().substring(0, 20) || null,
      message: data.message?.trim().substring(0, 2000) || null
    }

    // Priorität basierend auf Anfrage-Typ bestimmen
    let priority = 'medium'
    if (type === 'sales') priority = 'high'
    if (type === 'demo') priority = 'high'

    // Anfrage in Datenbank speichern
    const { data: inquiry, error } = await supabaseClient
      .from('inquiries')
      .insert({
        type,
        name: sanitizedData.name,
        email: sanitizedData.email,
        website_url: sanitizedData.website_url,
        company: sanitizedData.company,
        phone: sanitizedData.phone,
        employees: sanitizedData.employees,
        budget: sanitizedData.budget,
        message: sanitizedData.message,
        priority,
        status: 'new'
      })
      .select()
      .single()

    if (error) {
      console.error('Datenbank-Fehler:', error)
      throw new Error('Anfrage konnte nicht gespeichert werden')
    }

    console.log('Neue Anfrage gespeichert:', inquiry)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Anfrage erfolgreich gespeichert',
        inquiryId: inquiry.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Fehler beim Speichern der Anfrage:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Unbekannter Fehler beim Speichern der Anfrage' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})