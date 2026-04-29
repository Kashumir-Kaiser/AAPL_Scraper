import { useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { PriceData } from '@/types';
import { formatPrice, formatChange, formatChangePct, formatVolume } from '@/types';

interface PriceCardProps {
  data: PriceData | null;
  flash: 'green' | 'red' | null;
}

export function PriceCard({ data, flash }: PriceCardProps) {
  const isPositive = (data?.change ?? 0) >= 0;
  const glowColor = isPositive ? 'rgba(106, 158, 114, 0.5)' : 'transparent';

  const sparklinePoints = useMemo(() => {
    if (!data) return '';
    const points = [];
    const base = data.price - data.change;
    for (let i = 0; i <= 20; i++) {
      const val = base + (data.change * i) / 20;
      const x = (i / 20) * 100;
      const y = 30 - ((val - base) / (Math.abs(data.change) + 0.1)) * 15;
      points.push(`${x},${Math.max(5, Math.min(25, y))}`);
    }
    return points.join(' ');
  }, [data]);

  if (!data) {
    return (
      <div className="relative px-4 py-5 md:px-6">
        <div className="animate-pulse">
          <div className="h-10 w-40 bg-aapl-panel rounded-lg mb-2" />
          <div className="flex gap-3">
            <div className="h-5 w-24 bg-aapl-panel rounded" />
            <div className="h-5 w-24 bg-aapl-panel rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative px-4 py-5 md:px-6 transition-colors duration-500 ${
        flash === 'green' ? 'animate-flash-green' : flash === 'red' ? 'animate-flash-red' : ''
      }`}
      style={{
        background: isPositive
          ? `radial-gradient(ellipse at 50% 100%, ${glowColor} 0%, transparent 70%)`
          : undefined,
      }}
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <div
            className="text-hero font-bold text-aapl-primary tracking-tight"
            aria-live="polite"
            aria-atomic="true"
            aria-label={`Current price ${formatPrice(data.price)}`}
          >
            {formatPrice(data.price)}
          </div>

          <div className="flex items-center gap-3 mt-1.5">
            <span
              className={`text-delta inline-flex items-center gap-1 ${
                isPositive ? 'text-aapl-green' : 'text-aapl-red'
              }`}
            >
              {isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {formatChange(data.change)}
            </span>
            <span
              className={`text-delta ${isPositive ? 'text-aapl-green' : 'text-aapl-red'}`}
            >
              {formatChangePct(data.changePct)}
            </span>
            <span className="text-tick text-aapl-secondary ml-1">
              Vol {formatVolume(data.volume)}
            </span>
          </div>

          <p className="text-tick text-aapl-secondary mt-2">
            Last updated {new Date(data.timestamp).toLocaleTimeString('en-US', { hour12: false })}
          </p>
        </div>

        {sparklinePoints && (
          <svg
            viewBox="0 0 100 30"
            className="w-28 h-10 shrink-0 opacity-60"
            preserveAspectRatio="none"
          >
            <polyline
              points={sparklinePoints}
              fill="none"
              stroke={isPositive ? '#6A9E72' : '#C0392B'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
