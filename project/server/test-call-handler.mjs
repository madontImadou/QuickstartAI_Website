// Logik des Website-Testanrufs. Getrennt von der Cloudflare Pages Function, damit
// sie ohne Cloudflare-Laufzeit getestet werden kann. Jede Anfrage löst einen echten,
// kostenpflichtigen Anruf aus. Deshalb gilt überall: im Zweifel nicht anrufen.

const CONVOCORE_CALLS_URL = 'https://eu-gcp-api.vg-stuff.com/v3/calls';
const TIME_ZONE = 'Europe/Berlin';
const CALL_HOURS = { from: 8, to: 20 };
const MAX_CALLS_PER_IP_PER_DAY = 3;
const DEFAULT_MAX_CALLS_PER_DAY = 30;
const ALLOWED_ORIGINS = ['https://quickstartai.de', 'https://www.quickstartai.de'];

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

// Wandelt deutsche Eingabeformate in E.164 um und erlaubt nur Mobilfunk- und
// Ortsnetze. So sind Mehrwert-, Service- und Auslandsnummern ausgeschlossen.
export function normalizeGermanPhone(input) {
  if (typeof input !== 'string') return null;
  const cleaned = input.replace(/[\s()/.-]/g, '');
  let national;
  if (cleaned.startsWith('+49')) national = cleaned.slice(3);
  else if (cleaned.startsWith('0049')) national = cleaned.slice(4);
  else if (cleaned.startsWith('0')) national = cleaned.slice(1);
  else return null;

  national = national.replace(/^0/, '');
  if (!/^\d{7,13}$/.test(national)) return null;

  const isMobile = /^1[567]/.test(national);
  const isLandline = /^[2-9]/.test(national) && !/^[789]00/.test(national);
  return isMobile || isLandline ? `+49${national}` : null;
}

function berlinClock(now) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const get = (type) => parts.find((part) => part.type === type).value;
  return { day: `${get('year')}-${get('month')}-${get('day')}`, hour: Number(get('hour')) };
}

// Sarah begrüßt nach Tageszeit und kann sie am Telefon nicht selbst wissen.
function daytimeOf(hour) {
  if (hour < 11) return 'morgens';
  return hour < 17 ? 'tagsüber' : 'abends';
}

async function fingerprint(value, secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function readCount(store, key) {
  return Number((await store.get(key)) ?? 0);
}

export async function handleTestCall(request, { store, env, ip, now = new Date(), fetchFn = fetch }) {
  if (request.method !== 'POST') return json(405, { error: 'Methode nicht erlaubt.' });

  // Nur in der lokalen .dev.vars gesetzt, niemals in Cloudflare.
  const isLocalTest = env.LOCAL_TEST === '1';
  const origin = request.headers.get('origin') ?? '';
  const isLocalOrigin = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
  if (!ALLOWED_ORIGINS.includes(origin) && !(isLocalTest && isLocalOrigin)) {
    return json(403, { error: 'Anfrage nicht erlaubt.' });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: 'Ungültige Anfrage.' });
  }

  if (typeof body !== 'object' || body === null) {
    return json(400, { error: 'Ungültige Anfrage.' });
  }

  // Bots füllen das versteckte Feld aus. Sie bekommen keinen Hinweis darauf.
  if (body.company) return json(200, { ok: true });

  if (body.consent !== true) {
    return json(400, { error: 'Bitte bestätigen Sie die Einwilligung zum Testanruf.' });
  }

  const to = normalizeGermanPhone(body.phone);
  if (!to) {
    return json(400, {
      error: 'Bitte geben Sie eine deutsche Mobil- oder Festnetznummer ein, zum Beispiel 0171 2345678.',
    });
  }

  const { CONVOCORE_API_KEY, CONVOCORE_AGENT_ID, CONVOCORE_FROM } = env;
  if (!CONVOCORE_API_KEY || !CONVOCORE_AGENT_ID || !CONVOCORE_FROM) {
    console.error('Testanruf: Umgebungsvariablen fehlen');
    return json(503, { error: 'Der Testanruf ist gerade nicht verfügbar.' });
  }

  const { day, hour } = berlinClock(now);
  if (!isLocalTest && (hour < CALL_HOURS.from || hour >= CALL_HOURS.to)) {
    return json(422, {
      error: `Testanrufe sind täglich von ${CALL_HOURS.from} bis ${CALL_HOURS.to} Uhr möglich. Bitte versuchen Sie es dann noch einmal.`,
    });
  }

  const numberKey = `${day}/number/${await fingerprint(to, CONVOCORE_API_KEY)}`;
  const ipKey = `${day}/ip/${await fingerprint(ip || 'unbekannt', CONVOCORE_API_KEY)}`;
  const totalKey = `${day}/total`;

  try {
    const [numberUsed, ipCount, total] = await Promise.all([
      store.get(numberKey),
      readCount(store, ipKey),
      readCount(store, totalKey),
    ]);

    if (numberUsed) {
      return json(429, { error: 'Diese Nummer hat heute bereits einen Testanruf erhalten.' });
    }
    const maxPerDay = Number(env.TEST_CALL_DAILY_LIMIT) || DEFAULT_MAX_CALLS_PER_DAY;
    if (ipCount >= MAX_CALLS_PER_IP_PER_DAY || total >= maxPerDay) {
      return json(429, {
        error: 'Heute sind keine weiteren Testanrufe möglich. Bitte versuchen Sie es morgen wieder.',
      });
    }

    await Promise.all([
      store.set(numberKey, '1'),
      store.set(ipKey, String(ipCount + 1)),
      store.set(totalKey, String(total + 1)),
    ]);
  } catch (error) {
    console.error('Testanruf: Limit-Speicher nicht erreichbar', error);
    return json(503, { error: 'Der Testanruf ist gerade nicht verfügbar.' });
  }

  try {
    const response = await fetchFn(CONVOCORE_CALLS_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CONVOCORE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONVOCORE_FROM,
        to,
        agentId: CONVOCORE_AGENT_ID,
        options: {
          messagesHistory: [{ role: 'system', content: `Tageszeit: ${daytimeOf(hour)}` }],
          messagesHistoryMergeMode: 'append',
        },
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const detail = (await response.text()).slice(0, 300);
      throw new Error(`Convocore antwortet mit Status ${response.status}: ${detail}`);
    }
  } catch (error) {
    console.error('Testanruf fehlgeschlagen', error);
    // Der Anruf kam nicht zustande, die Person darf es also erneut versuchen.
    await store.delete(numberKey).catch(() => {});
    return json(502, { error: 'Der Anruf konnte gerade nicht gestartet werden.' });
  }

  return json(200, { ok: true });
}
