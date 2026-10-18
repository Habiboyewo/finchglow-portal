import type { NewsItem } from "../../types";
import { formatDate } from "../../utils/format";

interface NewsCardProps {
  item: NewsItem;
  scopeName: string;
}

export function NewsCard({ item, scopeName }: NewsCardProps) {
  return (
    <article className="rounded-xl border border-line bg-surface p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-muted">
        News · {scopeName}
      </p>
      <h4 className="font-bold">
        {/* Placeholder address: the prototype has no real news pages */}
        <a
          href={`https://example.com/news/${item.id}`}
          target="_blank"
          rel="noreferrer"
          className="text-accent underline"
        >
          {item.title}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </h4>
      <p className="text-sm text-muted">{item.summary}</p>
      <p className="mt-1 text-xs text-muted">{formatDate(item.time)}</p>
    </article>
  );
}