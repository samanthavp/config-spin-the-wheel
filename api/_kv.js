// Picks whichever Redis-compatible client Vercel actually wired up: the
// "Vercel KV" product (KV_REST_API_URL/KV_REST_API_TOKEN) or the Marketplace
// "Upstash for Redis" integration (UPSTASH_REDIS_REST_URL/_TOKEN). Both expose
// the same Upstash-derived method names (get/set/hset/hincrby/lpush/...), so
// the rest of the API code doesn't need to know which one is in play.
const { seedPrizes } = require('./_seed');

let client = null;

function getClient() {
  if (client) return client;
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    client = require('@vercel/kv').kv;
  } else if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    client = require('@upstash/redis').Redis.fromEnv();
  } else {
    throw new Error(
      'No KV/Redis credentials found (KV_REST_API_URL/TOKEN or UPSTASH_REDIS_REST_URL/TOKEN). ' +
      'Link a KV/Upstash database to this Vercel project, then `vercel env pull .env.local` for local dev.'
    );
  }
  return client;
}

// Stored values come back already JSON-deserialized in the common case, but
// fall back to parsing a raw string defensively (e.g. hash field values).
function safeParse(v) {
  if (v == null || typeof v === 'object') return v;
  if (typeof v === 'number' || typeof v === 'boolean') return v;
  try { return JSON.parse(v); } catch { return v; }
}

async function ensureSeeded(c) {
  const won = await c.set('wheel:seeded', '1', { nx: true });
  if (!won) return;
  const prizes = seedPrizes();
  const qtyMap = {};
  for (const p of prizes) qtyMap[p.id] = p.initialQty;
  await c.set('wheel:meta', prizes);
  if (Object.keys(qtyMap).length) await c.hset('wheel:qty', qtyMap);
  await c.set('wheel:soundOn', true);
}

module.exports = { getClient, ensureSeeded, safeParse };
