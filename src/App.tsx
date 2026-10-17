import { useState } from "react";
import { AppGrid } from "./components/apps/AppGrid";
import { AppShell } from "./components/layout/AppShell";
import { Feed } from "./components/news/Feed";
import { SearchBox } from "./components/search/SearchBox";
import { SearchResults } from "./components/search/SearchResults";
import { usePortal } from "./context/portalContext";
import { useDebounce } from "./hooks/useDebounce";
import { getGreeting } from "./utils/greeting";

export default function App() {
  const { user, company, role } = usePortal();
  const [hour] = useState(() => new Date().getHours());
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const searching = query.trim() !== "";

  return (
    <AppShell>
      <h1 className="text-3xl font-bold">
        {getGreeting(hour)}, {user.name.split(" ")[0]}
      </h1>
      <p className="mb-6 text-muted">
        Finchglow {company.name} · {role.label}
      </p>

      <SearchBox value={query} onChange={setQuery} />

      {searching ? (
        <SearchResults
          query={debouncedQuery}
          pending={query !== debouncedQuery}
          onClear={() => setQuery("")}
        />
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AppGrid />
          </div>
          <Feed />
        </div>
      )}
    </AppShell>
  );
}