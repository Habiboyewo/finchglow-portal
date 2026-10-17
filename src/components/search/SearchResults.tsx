import { fetchApps, fetchNews } from "../../api/mockApi";
import { usePortal } from "../../context/portalContext";
import { useFetch } from "../../hooks/useFetch";
import { visibleApps, visibleNews } from "../../utils/filters";
import { searchAppsAndNews } from "../../utils/search";
import { AppTile } from "../apps/AppTile";
import { NewsCard } from "../news/NewsCard";
import { ErrorCard } from "../ui/ErrorCard";
import { Skeleton } from "../ui/Skeleton";

interface SearchResultsProps {
  query: string;
  pending: boolean;
  onClear: () => void;
}

export function SearchResults({ query, pending, onClear }: SearchResultsProps) {
  const { user, company, companies } = usePortal();
  const apps = useFetch(fetchApps);
  const news = useFetch(fetchNews);

  if (apps.error || news.error) {
    return (
      <ErrorCard
        message="Couldn't load search results."
        onRetry={() => {
          apps.retry();
          news.retry();
        }}
      />
    );
  }

  if (apps.loading || news.loading || pending) {
    return (
      <div>
        <p className="mb-3 text-muted">Searching…</p>
        <Skeleton count={3} />
      </div>
    );
  }

  // Search only what this person is allowed to see in this company
  const results = searchAppsAndNews(
    visibleApps(apps.data ?? [], user, company.id),
    visibleNews(news.data ?? [], company.id),
    query,
  );
  const total = results.apps.length + results.news.length;

  if (total === 0) {
    return (
      <div className="rounded-xl border border-line bg-surface p-6">
        <p role="status" className="font-bold">
          No results for "{query.trim()}"
        </p>
        <p className="mb-4 text-muted">
          Check the spelling or try another word.
        </p>
        <button
          type="button"
          onClick={onClear}
          className="h-11 rounded-lg border border-muted bg-surface px-4 font-semibold text-fg"
        >
          Clear search
        </button>
      </div>
    );
  }

  const scopeName = (scope: string) =>
    scope === "group"
      ? "Group-wide"
      : (companies.find((c) => c.id === scope)?.name ?? scope);

  return (
    <div className="flex flex-col gap-8">
      <p role="status" className="text-muted">
        {total} {total === 1 ? "result" : "results"} for "{query.trim()}"
      </p>

      {results.apps.length > 0 && (
        <section aria-labelledby="search-apps-heading">
          <h2 id="search-apps-heading" className="mb-3 text-xl font-bold">
            Apps
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {results.apps.map((app) => (
              <li key={app.id}>
                <AppTile app={app} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {results.news.length > 0 && (
        <section aria-labelledby="search-news-heading">
          <h2 id="search-news-heading" className="mb-3 text-xl font-bold">
            News
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {results.news.map((item) => (
              <li key={item.id}>
                <NewsCard item={item} scopeName={scopeName(item.scope)} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}