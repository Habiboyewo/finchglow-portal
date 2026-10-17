import type { AppItem } from "../../types";

interface AppTileProps {
  app: AppItem;
  pinned?: boolean;
}

export function AppTile({ app, pinned = false }: AppTileProps) {
  return (
    <a
      href={app.url}
      target="_blank"
      rel="noreferrer"
      className={`flex min-h-24 flex-col gap-1 rounded-xl bg-surface p-4 text-fg hover:border-accent ${
        pinned ? "border-2 border-accent" : "border border-line"
      }`}
    >
      <span className="text-base font-semibold">
        {app.name}
        <span className="sr-only"> (opens in a new tab)</span>
      </span>
      <span className="text-sm text-muted">{app.description}</span>
    </a>
  );
}
