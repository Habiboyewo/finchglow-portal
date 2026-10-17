import { usePortal } from "../../context/portalContext";

export function CompanySwitcher() {
  const { company, companies, selectCompany } = usePortal();

  return (
    <div>
      <label htmlFor="company-select" className="sr-only">
        Company
      </label>
      <select
        id="company-select"
        value={company.id}
        onChange={(event) => selectCompany(event.target.value)}
        className="h-11 rounded-lg border border-muted bg-surface px-3 font-semibold text-fg"
      >
        {companies.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}