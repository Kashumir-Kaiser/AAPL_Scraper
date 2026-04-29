import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { ChartBar, Timeframe } from '@/types';
import { formatChartTime } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

interface IntraChartProps {
  bars: ChartBar[];
  loading: boolean;
  timeframe: Timeframe;                       // new
  onTimeframeChange: (tf: Timeframe) => void; // new
}

const TABS: { key: Timeframe; label: string }[] = [
  { key: '1D', label: '1D' },
  { key: '1W', label: '1W' },
  { key: '1M', label: '1M' },
];

export function IntraChart({ bars, loading, timeframe, onTimeframeChange }: IntraChartProps) {
  const chartData = useMemo(() => {
    if (!bars.length) return [];
    return bars.map((bar) => ({
      time: formatChartTime(bar.t, timeframe),     // use prop
      fullTime: new Date(bar.t).toLocaleString(),
      open: bar.o,
      high: bar.h,
      low: bar.l,
      close: bar.c,
      volume: bar.v,
    }));
  }, [bars, timeframe]);

  if (loading) {
    return (
      <div className="px-4 md:px-6 py-4">
        <div className="flex gap-2 mb-3">
          {TABS.map((t) => (
            <Skeleton key={t.key} className="h-8 w-10 rounded" />
          ))}
        </div>
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (!chartData.length) {
    return (
      <div className="px-4 md:px-6 py-4">
        <div className="flex gap-1 mb-3">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => onTimeframeChange(t.key)}           // call prop
              className={`px-3 py-1.5 rounded-lg text-body font-medium transition-colors ${
                timeframe === t.key
                  ? 'text-aapl-green bg-aapl-green-bg'
                  : 'text-aapl-secondary hover:text-aapl-primary hover:bg-aapl-panel'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center h-64 rounded-xl border border-aapl-border bg-aapl-panel">
          <p className="text-body text-aapl-secondary">No trading data for this period</p>
        </div>
      </div>
    );
  }

  const strokeColor = '#6A9E72';

  return (
    <div className="px-4 md:px-6 py-4">
      <div className="flex gap-1 mb-3">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => onTimeframeChange(t.key)}           // call prop
            className={`px-3 py-1.5 rounded-lg text-body font-medium transition-colors ${
              timeframe === t.key
                ? 'text-aapl-green bg-aapl-green-bg'
                : 'text-aapl-secondary hover:text-aapl-primary hover:bg-aapl-panel'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      + <div className="h-64 rounded-xl border border-aapl-border bg-background p-3 shadow-card">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={strokeColor} stopOpacity={0.2} />
                <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10, fill: 'var(--text-secondary)', fontFamily: 'Inter' }}
              tickLine={false}
              axisLine={{ stroke: 'var(--border)' }}
              minTickGap={30}
            />
            <YAxis
              domain={['auto', 'auto']}
              tick={{ fontSize: 10, fill: 'var(--text-secondary)', fontFamily: 'Inter' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val: number) => `$${val.toFixed(2)}`}
              width={55}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-background border border-aapl-border rounded-lg shadow-soft px-3 py-2 text-body">
                    <p className="text-tick text-aapl-secondary mb-1">{d.fullTime}</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                      <span className="text-aapl-secondary">Open</span>
                      <span className="text-aapl-primary font-medium">${d.open.toFixed(2)}</span>
                      <span className="text-aapl-secondary">High</span>
                      <span className="text-aapl-primary font-medium">${d.high.toFixed(2)}</span>
                      <span className="text-aapl-secondary">Low</span>
                      <span className="text-aapl-primary font-medium">${d.low.toFixed(2)}</span>
                      <span className="text-aapl-secondary">Close</span>
                      <span className="text-aapl-primary font-medium">${d.close.toFixed(2)}</span>
                      <span className="text-aapl-secondary">Vol</span>
                      <span className="text-aapl-primary font-medium">{d.volume.toLocaleString()}</span>
                    </div>
                  </div>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="close"
              stroke={strokeColor}
              strokeWidth={2}
              fill="url(#areaGradient)"
              dot={false}
              activeDot={{ r: 4, fill: strokeColor, stroke: '#fff', strokeWidth: 2 }}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}