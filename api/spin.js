const { getClient, ensureSeeded, safeParse } = require('./_kv');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' });
  const { prizeId } = req.body || {};
  if (!prizeId) return res.status(400).json({ error: 'prizeId required' });

  try {
    const client = getClient();
    await ensureSeeded(client);

    // Atomic decrement — this is the one operation two laptops could race on.
    const newQty = await client.hincrby('wheel:qty', prizeId, -1);
    if (newQty < 0) {
      await client.hincrby('wheel:qty', prizeId, 1); // undo, someone else got the last unit
      return res.status(409).json({ error: 'sold out' });
    }

    const metaRaw = await client.get('wheel:meta');
    const meta = safeParse(metaRaw) || [];
    const prize = meta.find((p) => p.id === prizeId);
    const entry = {
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      name: prize ? prize.name : prizeId,
      color: prize ? prize.color : '#6C5CE7'
    };
    await client.lpush('wheel:history', entry);
    await client.ltrim('wheel:history', 0, 99);

    const [qtyMap, historyRaw, soundOnRaw] = await Promise.all([
      client.hgetall('wheel:qty'),
      client.lrange('wheel:history', 0, 99),
      client.get('wheel:soundOn')
    ]);
    const qty = qtyMap || {};
    const prizes = meta.map((p) => ({ ...p, qty: Number(safeParse(qty[p.id])) || 0 }));
    const history = (historyRaw || []).map(safeParse).filter(Boolean);
    const soundOn = safeParse(soundOnRaw);
    res.status(200).json({ prizes, history, soundOn: soundOn === null || soundOn === undefined ? true : soundOn });
  } catch (e) {
    res.status(500).json({ error: e.message || String(e) });
  }
};
