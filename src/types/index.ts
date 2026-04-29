export type MarketStatus = 'open' | 'closed' | 'pre' | 'post' | 'loading' | 'error';

export interface PriceData {
  price: number;
  change: number;
  changePct: number;
  volume: number;
  timestamp: string;
}

export interface ChartBar {
  t: string;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
}

export interface NewsItem {
  id: string;
  headline: string;
  source: string;
  url: string;
  created_at: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export type Timeframe = '1D' | '1W' | '1M';

export function getMarketStatus(): MarketStatus {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const timeVal = hour * 60 + minute;

  // Weekend
  if (day === 0 || day === 6) return 'closed';

  // Pre-market: 4:00 AM - 9:30 AM ET (approximate)
  if (timeVal < 570) return 'pre';

  // Market open: 9:30 AM - 4:00 PM ET
  if (timeVal >= 570 && timeVal < 960) return 'open';

  // Post-market: 4:00 PM - 8:00 PM ET
  if (timeVal >= 960 && timeVal < 1200) return 'post';

  return 'closed';
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function formatChange(change: number): string {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}`;
}

export function formatChangePct(pct: number): string {
  const sign = pct >= 0 ? '+' : '';
  return `${sign}${pct.toFixed(2)}%`;
}

export function formatVolume(vol: number): string {
  if (vol >= 1_000_000) return `${(vol / 1_000_000).toFixed(2)}M`;
  if (vol >= 1_000) return `${(vol / 1_000).toFixed(1)}K`;
  return vol.toString();
}

export function formatTimeAgo(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay === 1) return 'Yesterday';
  return `${diffDay}d ago`;
}

export function formatChartTime(timestamp: string, timeframe: Timeframe): string {
  const date = new Date(timestamp);
  if (timeframe === '1D') {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  }
  if (timeframe === '1W') {
    return date.toLocaleDateString('en-US', { weekday: 'short', hour: '2-digit', hour12: false });
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
