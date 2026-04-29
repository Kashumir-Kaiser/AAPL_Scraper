import { useState, useEffect, useCallback, useRef } from 'react';
import { getLatestTrade, getBars, getNews } from '@/lib/alpaca';
import type { PriceData, ChartBar, NewsItem, MarketStatus, Timeframe } from '@/types';
import { getMarketStatus } from '@/types';

function isTrade(obj: unknown): obj is { p: number; s: number; t: string } {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'p' in obj &&
    typeof (obj as Record<string, unknown>).p === 'number'
  );
}

export function useQuote() {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const prevPrice = useRef<number | null>(null);
  const [flash, setFlash] = useState<'green' | 'red' | null>(null);

  const fetchQuote = useCallback(async () => {
    try {
      setError(null);
      const data = await getLatestTrade('AAPL');
      const trade = data.trade || data.quote;

      if (trade) {
        // Safely extract price based on the object shape
        const price = isTrade(trade) ? trade.p : trade.ap ?? 0;
        // Volume only exists on trade objects
        const volume = isTrade(trade) ? trade.s : 0;

        // Calculate mock change if not available from API
        const change = prevPrice.current ? price - prevPrice.current : (Math.random() - 0.4) * 2;
        const changePct = prevPrice.current ? (change / prevPrice.current) * 100 : (Math.random() - 0.4) * 1.5;

        if (prevPrice.current !== null) {
          if (price > prevPrice.current) setFlash('green');
          else if (price < prevPrice.current) setFlash('red');
          setTimeout(() => setFlash(null), 1000);
        }

        prevPrice.current = price;

        setPriceData({
          price,
          change,
          changePct,
          volume,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch quote');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuote();
    const interval = setInterval(fetchQuote, 60000);
    return () => clearInterval(interval);
  }, [fetchQuote]);

  return { priceData, error, loading, flash };
}

export function useBars(timeframe: Timeframe) {
  const [bars, setBars] = useState<ChartBar[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBars = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getBars(timeframe, 'AAPL');
      const barArray = Array.isArray(data) ? data : data.bars || [];
      setBars(barArray);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch chart data');
    } finally {
      setLoading(false);
    }
  }, [timeframe]);

  useEffect(() => {
    fetchBars();
    const interval = setInterval(fetchBars, 60000);
    return () => clearInterval(interval);
  }, [fetchBars]);

  return { bars, error, loading, refetch: fetchBars };
}

export function useNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getNews('AAPL', 20);
      const items = data.news || [];
      setNews(items.map((item: Record<string, unknown>) => ({
        id: item.id as string || String(Math.random()),
        headline: item.headline as string || 'No headline',
        source: item.source as string || 'Unknown',
        url: (item.url as string) || '#',
        created_at: item.created_at as string || new Date().toISOString(),
        sentiment: (['positive', 'negative', 'neutral'].includes(item.sentiment as string)
          ? (item.sentiment as 'positive' | 'negative' | 'neutral')
          : undefined),
      })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 300000);
    return () => clearInterval(interval);
  }, [fetchNews]);

  return { news, error, loading, refetch: fetchNews };
}

export function useMarketStatus() {
  const [status, setStatus] = useState<MarketStatus>('loading');

  useEffect(() => {
    const check = () => setStatus(getMarketStatus());
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, []);

  return status;
}
