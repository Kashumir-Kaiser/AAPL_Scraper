import { useState, useMemo } from 'react';
import { useQuote, useBars, useNews, useMarketStatus } from '@/hooks/useAlpaca';
import { Navbar } from '@/components/Navbar';
import { PriceCard } from '@/components/PriceCard';
import { IntraChart } from '@/components/IntraChart';
import { NewsFeed } from '@/components/NewsFeed';
import { Footer } from '@/components/Footer';
import { ErrorBanner } from '@/components/ErrorBanner';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { isUsingMockData } from '@/lib/alpaca';
import type { Timeframe } from '@/types';

export default function Home() {
  const { priceData, error: priceError, loading: priceLoading, flash } = useQuote();
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  const { bars, error: barsError, loading: barsLoading } = useBars(timeframe);
  const { news, error: newsError, loading: newsLoading, refetch: refetchNews } = useNews();
  const marketStatus = useMarketStatus();

  const isFullyLoading = priceLoading && !priceData && barsLoading && newsLoading;

  const errors = useMemo(() => {
    const list = [];
    if (priceError) list.push(priceError);
    if (barsError) list.push(barsError);
    if (newsError) list.push(newsError);
    return list;
  }, [priceError, barsError, newsError]);

  if (isFullyLoading) {
    return (
      <div className="min-h-screen bg-aapl-base">
        <Navbar status="loading" lastUpdated={null} />
        <main className="max-w-2xl mx-auto">
          <LoadingSkeleton />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-aapl-base flex flex-col">
      <Navbar status={marketStatus} lastUpdated={priceData?.timestamp || null} />

      <main className="flex-1 max-w-2xl mx-auto w-full pb-4">
        <div className="mx-4 md:mx-6 mt-3 h-[44px]">
          {isUsingMockData() && (
            <div className="px-3 py-2 rounded-lg bg-aapl-blue/10 border border-aapl-blue/20 text-body text-aapl-blue">
              Demo mode: Add your Alpaca API key to see live data.
            </div>
          )}
        </div>

        {errors.length > 0 && (
          <div className="mx-4 md:mx-6 mt-3 space-y-2">
            {errors.map((err, i) => (
              <ErrorBanner
                key={i}
                message={err.includes('429') ? 'Data temporarily unavailable — retrying in 60s' : err}
                onRetry={i === errors.length - 1 ? refetchNews : undefined}
              />
            ))}
          </div>
        )}

        <div className="mt-2 space-y-1">
          <PriceCard data={priceData} flash={flash} />

          <div className="mx-4 md:mx-6 rounded-xl border border-aapl-border bg-aapl-panel shadow-card overflow-hidden">
            <IntraChart
              bars={bars}
              loading={barsLoading}
              timeframe={timeframe}
              onTimeframeChange={setTimeframe}
            />
          </div>

          <div className="mx-4 md:mx-6 rounded-xl border border-aapl-border bg-aapl-panel shadow-card overflow-hidden">
            <NewsFeed news={news} loading={newsLoading} error={newsError} onRetry={refetchNews} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}