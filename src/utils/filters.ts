import type { Alert } from "../types";

// Group-wide alerts always show. Company alerts show for that company only.
// Newest first.
export function visibleAlerts(alerts: Alert[], companyId: string): Alert[] {
  return alerts
    .filter((a) => a.scope === "group" || a.scope === companyId)
    .sort((a, b) => b.time.localeCompare(a.time));
}