const BASE_URL = "/api/alpaca"

const USE_MOCK = import.meta.env.VITE_USE_PROXY !== "true"

interface QuoteTradeResponse {
  quote?: { ap: number; bp: number; as: number; bs: number };
  trade?: { p: number; s: number; t: string };
}

function generateMockBars(timeframe: string) {
  const now = new Date();
  const bars = [];
  const count = timeframe === '1D' ? 78 : timeframe === '1W' ? 35 : 22;
  const basePrice = 213.45;
  let currentPrice = basePrice;

  for (let i = count; i >= 0; i--) {
    const t = new Date(now);
    if (timeframe === '1D') {
      t.setMinutes(t.getMinutes() - i * 5);
    } else if (timeframe === '1W') {
      t.setDate(t.getDate() - i);
    } else {
      t.setDate(t.getDate() - i);
    }

    const volatility = 0.8;
    const change = (Math.random() - 0.5) * volatility;
    const open = currentPrice;
    const close = currentPrice + change;
    const high = Math.max(open, close) + Math.random() * 0.3;
    const low = Math.min(open, close) - Math.random() * 0.3;
    const volume = Math.floor(500000 + Math.random() * 1500000);

    bars.push({
      t: t.toISOString(),
      o: parseFloat(open.toFixed(2)),
      h: parseFloat(high.toFixed(2)),
      l: parseFloat(low.toFixed(2)),
      c: parseFloat(close.toFixed(2)),
      v: volume,
    });

    currentPrice = close;
  }

  return { bars };
}

function generateMockQuote() {
  const base = 213.45;
  const change = (Math.random() - 0.4) * 3;
  return {
    quote: {
      ap: parseFloat((base + 0.05).toFixed(2)),
      bp: parseFloat((base - 0.05).toFixed(2)),
      as: 100,
      bs: 100,
    },
    trade: {
      p: parseFloat((base + change).toFixed(2)),
      s: Math.floor(1000 + Math.random() * 5000),
      t: new Date().toISOString(),
    },
  };
}

function generateMockNews() {
  const headlines = [
    { headline: 'Apple unveils new AI features for iPhone 16 lineup', source: 'Bloomberg', sentiment: 'positive' },
    { headline: 'AAPL stock climbs as analysts raise price targets ahead of earnings', source: 'CNBC', sentiment: 'positive' },
    { headline: 'Apple\'s services revenue hits record high in latest quarter', source: 'Reuters', sentiment: 'positive' },
    { headline: 'Supply chain concerns weigh on Apple production targets', source: 'WSJ', sentiment: 'negative' },
    { headline: 'iPhone sales in China show resilience amid market competition', source: 'FT', sentiment: 'neutral' },
    { headline: 'Apple Vision Pro receives mixed reviews from early adopters', source: 'The Verge', sentiment: 'neutral' },
    { headline: 'EU regulatory pressure mounts on App Store business model', source: 'Politico', sentiment: 'negative' },
    { headline: 'Apple announces expanded partnership with major chip supplier', source: 'TechCrunch', sentiment: 'positive' },
    { headline: 'MacBook Pro refresh brings performance boost for creative pros', source: 'Ars Technica', sentiment: 'positive' },
    { headline: 'Apple\'s environmental initiatives receive industry recognition', source: 'GreenBiz', sentiment: 'positive' },
    { headline: 'Market volatility impacts tech sector valuations broadly', source: 'MarketWatch', sentiment: 'neutral' },
    { headline: 'Apple Pay expands to new markets in Latin America', source: 'Reuters', sentiment: 'positive' },
  ];

  return headlines.map((item, i) => ({
    id: `mock-${i}`,
    headline: item.headline,
    source: item.source,
    author: '',
    created_at: new Date(Date.now() - i * 1000 * 60 * 30).toISOString(),
    updated_at: new Date(Date.now() - i * 1000 * 60 * 30).toISOString(),
    summary: '',
    url: '#',
    images: [],
    symbols: ['AAPL'],
    sentiment: item.sentiment,
  }));
}

export async function getLatestQuote(symbols: string = "AAPL") {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 400))
    return generateMockQuote()
  }

  const res = await fetch(
    `${BASE_URL}/v2/stocks/quotes/latest?symbols=${symbols}&feed=iex`
  )
  if (!res.ok) throw new Error(`Quote API error: ${res.status}`)
  const data = await res.json()
  const quote = data?.quotes?.[symbols]
  return { quote }
}

export async function getLatestTrade(symbols: string = 'AAPL'): Promise<QuoteTradeResponse> {
  if (USE_MOCK) {
    await new Promise(r => setTimeout(r, 300));
    return generateMockQuote(); // already returns { quote, trade }
  }

  const res = await fetch(`${BASE_URL}/v2/stocks/trades/latest?symbols=${symbols}&feed=iex`);
  if (!res.ok) throw new Error(`Trade API error: ${res.status}`);
  const data = await res.json();
  const trade = data?.trades?.[symbols];
  return { trade, quote: undefined };
}

export async function getBars(timeframe: string = "1D", symbols: string = "AAPL") {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 600))
    return generateMockBars(timeframe)
  }

  const now = new Date()
  let start: Date
  let resolution: string
  if (timeframe === "1D") {
    start = new Date(now)
    start.setDate(start.getDate() - 1)
    resolution = "5Min"
  } else if (timeframe === "1W") {
    start = new Date(now)
    start.setDate(start.getDate() - 7)
    resolution = "1Hour"
  } else {
    start = new Date(now)
    start.setMonth(start.getMonth() - 1)
    resolution = "1Day"
  }

  const startIso = start.toISOString()
  const endIso = now.toISOString()
  const url = `${BASE_URL}/v2/stocks/bars?symbols=${symbols}&timeframe=${resolution}&start=${encodeURIComponent(startIso)}&end=${encodeURIComponent(endIso)}&feed=iex&sort=asc`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`Bars API error: ${res.status}`)
  const data = await res.json()
  return data.bars?.[symbols] || { bars: [] }
}

export async function getNews(symbols: string = "AAPL", limit: number = 20) {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 500))
    return { news: generateMockNews() }
  }

  const res = await fetch(
    `${BASE_URL}/v1beta1/news?symbols=${symbols}&limit=${limit}&sort=desc`
  )
  if (!res.ok) throw new Error(`News API error: ${res.status}`)
  return res.json()
}

export function isUsingMockData() {
  return USE_MOCK
}