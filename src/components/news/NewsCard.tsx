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
      <h4 className="font-bold">{item.title}</h4>
      <p className="text-sm text-muted">{item.summary}</p>
      <p className="mt-1 text-xs text-muted">{formatDate(item.time)}</p>
    </article>
  );
}