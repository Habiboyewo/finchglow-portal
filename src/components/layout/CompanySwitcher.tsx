import { usePortal } from "../../context/portalContext";
import { Dropdown } from "../ui/Dropdown";

export function CompanySwitcher() {
  const { company, companies, selectCompany } = usePortal();

  return (
    <Dropdown
      label="Company"
      value={company.id}
      options={companies.map((c) => ({ id: c.id, label: c.name }))}
      onSelect={selectCompany}
    />
  );
}