interface ErrorCardProps {
  message: string;
  onRetry: () => void;
}

export function ErrorCard({ message, onRetry }: ErrorCardProps) {
  return (
    <div
      role="status"
      className="rounded-xl border-2 border-critical-line bg-critical-bg p-4 text-critical-text"
    >
      <p className="font-bold">{message}</p>
      <p className="text-sm">Check your connection and try again.</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 h-11 rounded-lg border border-critical-line bg-surface px-4 font-semibold text-fg"
      >
        Try again
      </button>
    </div>
  );
}