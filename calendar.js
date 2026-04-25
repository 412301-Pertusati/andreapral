export default async function handler(req, res) {
  // Solo GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { year, month } = req.query;

  if (!year || !month) {
    return res.status(400).json({ error: 'Parámetros requeridos: year, month' });
  }

  const { CALENDAR_ID, API_KEY } = process.env;

  if (!CALENDAR_ID || !API_KEY) {
    return res.status(500).json({
      error: 'Variables de entorno CALENDAR_ID y API_KEY no configuradas en Vercel',
    });
  }

  const y = parseInt(year, 10);
  const m = parseInt(month, 10) - 1; // el cliente manda 1-12; Date() usa 0-11

  if (isNaN(y) || isNaN(m) || m < 0 || m > 11) {
    return res.status(400).json({ error: 'year o month inválidos' });
  }

  const timeMin = new Date(y, m, 1).toISOString();
  const timeMax = new Date(y, m + 1, 0, 23, 59, 59).toISOString();

  const gcUrl =
    `https://www.googleapis.com/calendar/v3/calendars/` +
    `${encodeURIComponent(CALENDAR_ID)}/events` +
    `?key=${API_KEY}` +
    `&timeMin=${encodeURIComponent(timeMin)}` +
    `&timeMax=${encodeURIComponent(timeMax)}` +
    `&singleEvents=true&orderBy=startTime`;

  let gcRes;
  try {
    gcRes = await fetch(gcUrl);
  } catch (err) {
    return res.status(502).json({ error: `No se pudo contactar a Google Calendar: ${err.message}` });
  }

  if (!gcRes.ok) {
    const body = await gcRes.json().catch(() => ({}));
    return res.status(gcRes.status).json({
      error: body?.error?.message || `Google Calendar respondió con ${gcRes.status}`,
    });
  }

  const data = await gcRes.json();

  const durationStr = minutes => {
    const h = Math.floor(minutes / 60), m = minutes % 60;
    return h > 0 ? `${h}h${m ? ` ${m} min` : ''}` : `${m} min`;
  };

  const events = (data.items || []).map(item => {
    const startISO = item.start.dateTime || item.start.date;
    const endISO   = item.end.dateTime   || item.end.date;
    const timeMatch = startISO.match(/T(\d{2}:\d{2})/);
    const durationMin = item.start.dateTime
      ? Math.round((new Date(endISO) - new Date(startISO)) / 60000)
      : null;
    return {
      date:     startISO.slice(0, 10),
      title:    item.summary     || '(Sin título)',
      type:     /zoom/i.test(item.summary || '') ? 'zoom' : 'presencial',
      time:     timeMatch ? timeMatch[1] : null,
      duration: durationMin !== null ? durationStr(durationMin) : null,
      desc:     item.description || null,
      spots:    null,
    };
  });

  // CDN de Vercel cachea 5 min; el cliente puede revalidar hasta 1 hora
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
  return res.status(200).json(events);
}
