import type { Alert, AppItem, NewsItem, Role, User } from "../types";

// Group-wide alerts always show. Company alerts show for that company only.
// Newest first.
export function visibleAlerts(alerts: Alert[], companyId: string): Alert[] {
  return alerts
    .filter((a) => a.scope === "group" || a.scope === companyId)
    .sort((a, b) => b.time.localeCompare(a.time));
}

// Same rule for news: group-wide always shows. Newest first.
export function visibleNews(news: NewsItem[], companyId: string): NewsItem[] {
  return news
    .filter((n) => n.scope === "group" || n.scope === companyId)
    .sort((a, b) => b.time.localeCompare(a.time));
}

// An app shows only if it belongs to the selected company
// AND the signed-in user is allowed to use it.
export function visibleApps(
  apps: AppItem[],
  user: User,
  companyId: string,
): AppItem[] {
  return apps.filter(
    (app) => app.companies.includes(companyId) && user.apps.includes(app.id),
  );
}

// Splits apps into the role's pinned shortcuts and everything else.
export function splitQuickAccess(apps: AppItem[], role: Role) {
  const pinned = apps.filter((app) => role.pinned.includes(app.id));
  const others = apps.filter((app) => !role.pinned.includes(app.id));
  return { pinned, others };
}