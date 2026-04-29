import { Skeleton } from '@/components/ui/skeleton';

export function LoadingSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-32 rounded-lg" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      <div className="space-y-3">
        <Skeleton className="h-14 w-48 rounded-lg" />
        <div className="flex gap-3">
          <Skeleton className="h-5 w-24 rounded" />
          <Skeleton className="h-5 w-24 rounded" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex gap-2 mb-3">
          <Skeleton className="h-8 w-12 rounded" />
          <Skeleton className="h-8 w-12 rounded" />
          <Skeleton className="h-8 w-12 rounded" />
        </div>
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>

      <div className="space-y-3">
        <Skeleton className="h-5 w-24 rounded" />
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
