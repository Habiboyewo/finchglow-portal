import { createContext, useContext } from "react";
import type { Company, Role, User } from "../types";

export interface PortalValue {
  user: User;
  company: Company;
  role: Role;
  users: User[];
  companies: Company[];
  selectUser: (id: string) => void;
  selectCompany: (id: string) => void;
}

export const PortalContext = createContext<PortalValue | null>(null);

export function usePortal() {
  const value = useContext(PortalContext);
  if (!value) {
    throw new Error("usePortal must be used inside PortalProvider");
  }
  return value;
}