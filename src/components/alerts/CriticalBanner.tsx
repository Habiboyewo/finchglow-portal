import { fetchAlerts } from "../../api/mockApi";
import { usePortal } from "../../context/portalContext";
import { useFetch } from "../../hooks/useFetch";
import { visibleAlerts } from "../../utils/filters";

export function CriticalBanner() {
  const { company, companies } = usePortal();
  const { data, error, retry } = useFetch(fetchAlerts);

  if (error) {
    return (
      <div role="status" className="border-b border-line bg-surface">
        <p className="mx-auto max-w-6xl px-4 py-2 text-sm text-fg sm:px-8">
          Couldn't load alerts.{" "}
          <button
            type="button"
            onClick={retry}
            className="font-semibold text-accent underline"
          >
            Try again
          </button>
        </p>
      </div>
    );
  }

  const critical = visibleAlerts(data ?? [], company.id).filter(
    (alert) => alert.severity === "critical",
  );

  if (critical.length === 0) return null;

  return (
    <div className="bg-critical-bg text-critical-text">
      {critical.map((alert) => {
        const scopeName =
          alert.scope === "group"
            ? "Group-wide"
            : (companies.find((c) => c.id === alert.scope)?.name ?? alert.scope);
        const time = new Date(alert.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div
            key={alert.id}
            role="alert"
            className="border-b-4 border-critical-line"
          >
            <div className="mx-auto flex max-w-6xl items-start gap-3 px-4 py-4 sm:px-8">
              <svg
                aria-hidden="true"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                className="mt-1 shrink-0 text-critical-line"
              >
                <path d="M12 3l10 18H2zM12 10v5M12 18v.5" />
              </svg>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-critical-line">
                  Critical · {scopeName}
                </p>
                <p className="text-lg font-bold">{alert.title}</p>
                <p>
                  {alert.message} Updated {time}.
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}