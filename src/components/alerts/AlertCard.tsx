import type { Alert, Severity } from "../../types";
import { formatDate } from "../../utils/format";

const severityStyle: Record<
  Severity,
  { label: string; box: string; tag: string; icon: string }
> = {
  critical: {
    label: "Critical",
    box: "border-2 border-critical-line bg-critical-bg text-critical-text",
    tag: "text-critical-line",
    icon: "M12 3l10 18H2zM12 10v5M12 18v.5",
  },
  warning: {
    label: "Warning",
    box: "border-2 border-warning-line bg-warning-bg text-warning-text",
    tag: "text-warning-text",
    icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8v5M12 16v.5",
  },
  info: {
    label: "Information",
    box: "border border-line bg-surface text-fg",
    tag: "text-accent",
    icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 11v5M12 8v.5",
  },
};

interface AlertCardProps {
  alert: Alert;
  scopeName: string;
}

export function AlertCard({ alert, scopeName }: AlertCardProps) {
  const style = severityStyle[alert.severity];

  return (
    <article className={`flex gap-3 rounded-xl p-4 ${style.box}`}>
      <svg
        aria-hidden="true"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        className={`mt-0.5 shrink-0 ${style.tag}`}
      >
        <path d={style.icon} />
      </svg>
      <div>
        <p className={`text-xs font-bold uppercase tracking-wide ${style.tag}`}>
          {style.label} · {scopeName}
        </p>
        <h4 className="font-bold">{alert.title}</h4>
        <p className="text-sm">{alert.message}</p>
        <p className="mt-1 text-xs">{formatDate(alert.time)}</p>
      </div>
    </article>
  );
}