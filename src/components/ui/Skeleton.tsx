export function Skeleton({ count = 3 }: { count?: number }) {
  return (
    <div aria-busy="true">
      <p role="status" className="sr-only">
        Loading
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="h-24 animate-pulse rounded-xl bg-line" />
        ))}
      </div>
    </div>
  );
}