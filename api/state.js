const { getClient, ensureSeeded, safeParse } = require('./_kv');

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'method not allowed' });
  try {
    const client = getClient();
    await ensureSeeded(client);
    const [metaRaw, qtyMap, historyRaw, soundOnRaw] = await Promise.all([
      client.get('wheel:meta'),
      client.hgetall('wheel:qty'),
      client.lrange('wheel:history', 0, 99),
      client.get('wheel:soundOn')
    ]);
    const meta = safeParse(metaRaw) || [];
    const qty = qtyMap || {};
    const prizes = meta.map((p) => ({ ...p, qty: Number(safeParse(qty[p.id])) || 0 }));
    const history = (historyRaw || []).map(safeParse).filter(Boolean);
    const soundOn = safeParse(soundOnRaw);
    res.status(200).json({ prizes, history, soundOn: soundOn === null || soundOn === undefined ? true : soundOn });
  } catch (e) {
    res.status(500).json({ error: e.message || String(e) });
  }
};
