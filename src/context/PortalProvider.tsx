import { useEffect, useMemo, useState, type ReactNode } from "react";
import companiesData from "../data/companies.json";
import usersData from "../data/users.json";
import rolesData from "../data/roles.json";
import type { Company, Role, User } from "../types";
import { PortalContext, type PortalValue } from "./portalContext";

const companies = companiesData as Company[];
const users = usersData as User[];
const roles = rolesData as Record<string, Role>;

export function PortalProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState(users[0].id);
  const [companyId, setCompanyId] = useState(users[0].company);

  const user = users.find((u) => u.id === userId) ?? users[0];
  const company = companies.find((c) => c.id === companyId) ?? companies[0];
  const role = roles[user.role];

  // Re-theme the whole portal by changing one CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", company.accent);
  }, [company]);

  const value = useMemo<PortalValue>(
    () => ({
      user,
      company,
      role,
      users,
      companies,
      selectUser: (id: string) => {
        const next = users.find((u) => u.id === id);
        if (!next) return;
        setUserId(next.id);
        setCompanyId(next.company); // start on that person's own company
      },
      selectCompany: (id: string) => setCompanyId(id),
    }),
    [user, company, role],
  );

  return (
    <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
  );
}