// 加载骨架屏
export function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/50 animate-pulse">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 mb-5" />
      <div className="h-5 bg-slate-100 rounded w-3/4 mb-2" />
      <div className="h-4 bg-slate-100 rounded w-full mb-1" />
      <div className="h-4 bg-slate-100 rounded w-2/3" />
    </div>
  );
}

// Cards grid skeleton
export function CardsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

// Error banner
export function ErrorBanner({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-50 flex items-center justify-center">
        <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <p className="text-muted-foreground mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          重新加载
        </button>
      )}
    </div>
  );
}

// Section title
export function SectionTitle({ title, subtitle }: { title?: string; subtitle?: string }) {
  if (!title && !subtitle) return null;
  return (
    <div className="text-center mb-14">
      {title && <h2 className="text-3xl font-bold text-foreground mb-4">{title}</h2>}
      {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{subtitle}</p>}
    </div>
  );
}
