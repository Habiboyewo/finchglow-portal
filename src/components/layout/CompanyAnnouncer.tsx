import { useState } from "react";
import { usePortal } from "../../context/portalContext";

// Tells screen reader users when the person or company changes.
// Sighted users never see it.
export function CompanyAnnouncer() {
  const { user, company } = usePortal();
  const [last, setLast] = useState({ userId: user.id, companyId: company.id });
  const [message, setMessage] = useState("");

  if (last.userId !== user.id || last.companyId !== company.id) {
    setMessage(
      last.userId !== user.id
        ? `Signed in as ${user.name}. Showing ${company.name}`
        : `Showing ${company.name}`,
    );
    setLast({ userId: user.id, companyId: company.id });
  }

  return (
    <p role="status" className="sr-only">
      {message}
    </p>
  );
}