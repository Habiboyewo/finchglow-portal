import { fetchApps } from "../../api/mockApi";
import { usePortal } from "../../context/portalContext";
import { useFetch } from "../../hooks/useFetch";
import { splitQuickAccess, visibleApps } from "../../utils/filters";
import { ErrorCard } from "../ui/ErrorCard";
import { Skeleton } from "../ui/Skeleton";
import { AppTile } from "./AppTile";

export function AppGrid() {
  const { user, company, role } = usePortal();
  const { data, error, loading, retry } = useFetch(fetchApps);

  if (loading) return <Skeleton count={6} />;
  if (error) {
    return <ErrorCard message="Couldn't load your apps." onRetry={retry} />;
  }

  const apps = visibleApps(data ?? [], user, company.id);
  const { pinned, others } = splitQuickAccess(apps, role);

  if (apps.length === 0) {
    return (
      <p className="text-muted">No apps are available for you in this company.</p>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {pinned.length > 0 && (
        <section aria-labelledby="quick-access-heading">
          <h2 id="quick-access-heading" className="mb-3 text-xl font-bold">
            Quick access
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {pinned.map((app) => (
              <li key={app.id}>
                <AppTile app={app} pinned />
              </li>
            ))}
          </ul>
        </section>
      )}

      {others.length > 0 && (
        <section aria-labelledby="all-apps-heading">
          <h2 id="all-apps-heading" className="mb-3 text-xl font-bold">
            All your apps
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((app) => (
              <li key={app.id}>
                <AppTile app={app} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}