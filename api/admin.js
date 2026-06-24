const { getClient, ensureSeeded } = require('./_kv');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' });
  const { prizes, soundOn } = req.body || {};
  if (!Array.isArray(prizes)) return res.status(400).json({ error: 'prizes array required' });

  try {
    const client = getClient();
    await ensureSeeded(client);

    const meta = prizes.map((p) => ({
      id: p.id,
      name: p.name,
      initialQty: p.initialQty ?? p.qty ?? 0,
      weight: p.weight,
      color: p.color,
      deleted: !!p.deleted
    }));
    const qtyMap = {};
    for (const p of prizes) qtyMap[p.id] = Math.max(0, Number(p.qty) || 0);

    await client.set('wheel:meta', meta);
    if (Object.keys(qtyMap).length) await client.hset('wheel:qty', qtyMap);
    if (typeof soundOn === 'boolean') await client.set('wheel:soundOn', soundOn);

    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message || String(e) });
  }
};
