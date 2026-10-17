import { useState } from "react";
import { usePortal } from "./context/portalContext";
import { getGreeting } from "./utils/greeting";

export default function App() {
  const { user, company, role } = usePortal();
  const [hour] = useState(() => new Date().getHours());

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-accent">
        {getGreeting(hour)}, {user.name.split(" ")[0]}
      </h1>
      <p className="text-muted">
        Finchglow {company.name} · {role.label}
      </p>
    </main>
  );
}