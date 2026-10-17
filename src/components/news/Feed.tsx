import { fetchAlerts, fetchNews } from "../../api/mockApi";
import { usePortal } from "../../context/portalContext";
import { useFetch } from "../../hooks/useFetch";
import { visibleAlerts, visibleNews } from "../../utils/filters";
import { AlertCard } from "../alerts/AlertCard";
import { ErrorCard } from "../ui/ErrorCard";
import { NewsCard } from "./NewsCard";

function Loading() {
  return (
    <div aria-busy="true" className="flex flex-col gap-3">
      <p role="status" className="sr-only">
        Loading
      </p>
      <div className="h-20 animate-pulse rounded-xl bg-line" />
      <div className="h-20 animate-pulse rounded-xl bg-line" />
    </div>
  );
}

export function Feed() {
  const { company, companies } = usePortal();
  const alerts = useFetch(fetchAlerts);
  const news = useFetch(fetchNews);

  const scopeName = (scope: string) =>
    scope === "group"
      ? "Group-wide"
      : (companies.find((c) => c.id === scope)?.name ?? scope);

  // Critical alerts already show in the banner, so the feed skips them
  const notices = visibleAlerts(alerts.data ?? [], company.id).filter(
    (alert) => alert.severity !== "critical",
  );
  const stories = visibleNews(news.data ?? [], company.id).slice(0, 5);

  let alertContent;
  if (alerts.loading) {
    alertContent = <Loading />;
  } else if (alerts.error) {
    alertContent = (
      <ErrorCard message="Couldn't load alerts." onRetry={alerts.retry} />
    );
  } else if (notices.length === 0) {
    alertContent = <p className="text-muted">No other alerts right now.</p>;
  } else {
    alertContent = (
      <ul className="flex flex-col gap-3">
        {notices.map((alert) => (
          <li key={alert.id}>
            <AlertCard alert={alert} scopeName={scopeName(alert.scope)} />
          </li>
        ))}
      </ul>
    );
  }

  let newsContent;
  if (news.loading) {
    newsContent = <Loading />;
  } else if (news.error) {
    newsContent = (
      <ErrorCard message="Couldn't load news." onRetry={news.retry} />
    );
  } else if (stories.length === 0) {
    newsContent = <p className="text-muted">No news for {company.name} yet.</p>;
  } else {
    newsContent = (
      <ul className="flex flex-col gap-3">
        {stories.map((item) => (
          <li key={item.id}>
            <NewsCard item={item} scopeName={scopeName(item.scope)} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section aria-labelledby="feed-heading" className="flex flex-col gap-6">
      <h2 id="feed-heading" className="text-xl font-bold">
        Alerts and news
      </h2>
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Alerts</h3>
        {alertContent}
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">News</h3>
        {newsContent}
      </div>
    </section>
  );
}