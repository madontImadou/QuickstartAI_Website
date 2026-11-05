import { handleTestCall } from '../../server/test-call-handler.mjs';

// Limit-Einträge laufen nach zwei Tagen von selbst ab.
const LIMIT_TTL_SECONDS = 2 * 24 * 60 * 60;

export const onRequest = ({ request, env }) =>
  handleTestCall(request, {
    store: {
      get: async (key) => env.TEST_CALL_LIMITS.get(key),
      set: async (key, value) =>
        env.TEST_CALL_LIMITS.put(key, value, { expirationTtl: LIMIT_TTL_SECONDS }),
      delete: async (key) => env.TEST_CALL_LIMITS.delete(key),
    },
    env,
    ip: request.headers.get('CF-Connecting-IP'),
  });
