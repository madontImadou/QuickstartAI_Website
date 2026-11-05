// Einwilligung für das Meta-Pixel. Das Pixel darf erst nach „Akzeptieren“ laden;
// alle fbq-Aufrufe im Code prüfen vorher, ob window.fbq existiert.

const STORAGE_KEY = 'cookie-consent-v1';
const META_PIXEL_ID = '846696994370829';

export const OPEN_COOKIE_SETTINGS = 'open-cookie-settings';

export type Consent = 'granted' | 'denied';

interface PixelStub {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: PixelStub;
  loaded: boolean;
  version: string;
}

export function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

function saveConsent(consent: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, consent);
  } catch {
    // Ohne Speicher erscheint das Banner beim nächsten Besuch erneut.
  }
}

export function loadMetaPixel() {
  if (window.fbq) return;

  const stub = ((...args: unknown[]) => {
    if (stub.callMethod) stub.callMethod(...args);
    else stub.queue.push(args);
  }) as PixelStub;
  stub.push = stub;
  stub.loaded = true;
  stub.version = '2.0';
  stub.queue = [];
  window.fbq = stub;
  (window as unknown as { _fbq: PixelStub })._fbq = stub;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  stub('init', META_PIXEL_ID);
  stub('track', 'PageView');
}

function deletePixelCookies() {
  const domains = ['', `; domain=.${location.hostname.replace(/^www\./, '')}`];
  for (const name of ['_fbp', '_fbc']) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}

export function grantConsent() {
  saveConsent('granted');
  loadMetaPixel();
}

export function denyConsent() {
  const wasGranted = readConsent() === 'granted';
  saveConsent('denied');
  if (wasGranted) {
    // Ein bereits geladenes Pixel lässt sich nur per Neuladen stoppen.
    deletePixelCookies();
    location.reload();
  }
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS));
}
