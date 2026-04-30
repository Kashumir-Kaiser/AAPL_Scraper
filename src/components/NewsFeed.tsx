import { ExternalLink, Newspaper } from 'lucide-react';
import type { NewsItem } from '@/types';
import { formatTimeAgo } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

interface NewsFeedProps {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
}

function sentimentStyle(sentiment?: string) {
  switch (sentiment) {
    case 'positive':
      return 'bg-aapl-green-bg text-aapl-green';
    case 'negative':
      return 'bg-red-50 text-aapl-red';
    default:
      return 'bg-aapl-panel text-aapl-secondary';
  }
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 p-3.5 rounded-xl border border-aapl-border bg-aapl-panel shadow-card hover:shadow-soft hover:bg-aapl-panel/50 transition-all duration-200 min-h-[80px]"
    >
      <div className="shrink-0 w-8 h-8 rounded-lg bg-aapl-panel flex items-center justify-center mt-0.5">
        <Newspaper className="w-4 h-4 text-aapl-secondary" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-body font-semibold text-aapl-primary leading-snug line-clamp-2 group-hover:text-aapl-green transition-colors">
          {item.headline}
        </h3>

        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-tick text-aapl-secondary font-medium">{item.source}</span>
          <span className="text-tick text-aapl-secondary">·</span>
          <span className="text-tick text-aapl-secondary">{formatTimeAgo(item.created_at)}</span>

          {item.sentiment && (
            <>
              <span className="text-tick text-aapl-secondary">·</span>
              <span className={`inline-flex px-1.5 py-0.5 rounded text-badge font-semibold uppercase tracking-wide ${sentimentStyle(item.sentiment)}`}>
                {item.sentiment}
              </span>
            </>
          )}
        </div>
      </div>

      <ExternalLink className="w-3.5 h-3.5 text-aapl-secondary shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}

export function NewsFeed({ news, loading, error, onRetry }: NewsFeedProps) {
  if (loading && !news.length) {
    return (
      <div className="px-4 md:px-6 py-4 space-y-3">
        <Skeleton className="h-5 w-16 rounded mb-3" />
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (error && !news.length) {
    return (
      <div className="px-4 md:px-6 py-4">
        <div className="flex flex-col items-center justify-center py-12 rounded-xl border border-aapl-border bg-aapl-panel">
          <p className="text-body text-aapl-secondary mb-3">Unable to load news</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 rounded-lg bg-aapl-primary text-white text-body font-medium hover:bg-aapl-primary/90 transition-colors"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!news.length) {
    return (
      <div className="px-4 md:px-6 py-4">
        <div className="flex flex-col items-center justify-center py-12 rounded-xl border border-aapl-border bg-aapl-panel">
          <Newspaper className="w-8 h-8 text-aapl-secondary mb-2" />
          <p className="text-body text-aapl-secondary">No recent AAPL news</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6 py-4">
      <h2 className="text-heading font-semibold text-aapl-primary mb-3">Latest News</h2>
      <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
        {news.map((item) => (
          <NewsCard key={item.id}  item={item} />
        ))}
      </div>
    </div>
  );
}
