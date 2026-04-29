import { Apple, Circle } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import type { MarketStatus } from '@/types';

interface NavbarProps {
  status: MarketStatus;
  lastUpdated: string | null;
}

const statusConfig: Record<MarketStatus, { label: string; color: string }> = {
  open: { label: 'LIVE', color: 'bg-aapl-green-bg text-aapl-green' },
  closed: { label: 'CLOSED', color: 'bg-aapl-panel text-aapl-secondary' },
  pre: { label: 'PRE-MARKET', color: 'bg-amber-50 text-aapl-amber' },
  post: { label: 'AFTER HOURS', color: 'bg-amber-50 text-aapl-amber' },
  loading: { label: '...', color: 'bg-aapl-panel text-aapl-secondary' },
  error: { label: 'ERROR', color: 'bg-red-50 text-aapl-red' },
};

export function Navbar({ status, lastUpdated }: NavbarProps) {
  const config = statusConfig[status] || statusConfig.loading;

  return (
    <header className="flex items-center justify-between h-14 px-4 md:px-6">
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-aapl-green text-white">
          <Apple className="w-4 h-4" />
        </div>
        <span className="text-heading font-semibold text-aapl-primary tracking-tight">AAPL Scraper</span>
      </div>

      <div className="flex items-center gap-3">
        {lastUpdated && (
          <span className="hidden sm:inline text-tick text-aapl-secondary">
            Updated {new Date(lastUpdated).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
          </span>
        )}
        <ThemeToggle />
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-badge font-semibold uppercase tracking-wide ${config.color}`}
          aria-label={`Market status: ${config.label}`}
        >
          {status === 'open' && <Circle className="w-2 h-2 fill-current animate-pulse" />}
          {config.label}
        </span>
      </div>
    </header>
  );
}
