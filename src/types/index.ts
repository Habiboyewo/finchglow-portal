export type Severity = "info" | "warning" | "critical";

// "group" means everyone, otherwise a company id such as "ota"
export type Scope = string;

export interface Company {
  id: string;
  name: string;
  accent: string;
  accentDark: string;
  logo: string;
}

export interface Role {
  label: string;
  pinned: string[];
}

export interface User {
  id: string;
  name: string;
  company: string;
  role: string;
  apps: string[];
}

export interface AppItem {
  id: string;
  name: string;
  description: string;
  url: string;
  companies: string[];
}

export interface Alert {
  id: string;
  severity: Severity;
  scope: Scope;
  title: string;
  message: string;
  time: string;
}

export interface NewsItem {
  id: string;
  scope: Scope;
  title: string;
  summary: string;
  time: string;
}