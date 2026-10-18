import { describe, expect, it } from "vitest";
import type { Alert, AppItem, NewsItem, Role, User } from "../types";
import {
  splitQuickAccess,
  visibleAlerts,
  visibleApps,
  visibleNews,
} from "./filters";

const ids = (items: { id: string }[]) => items.map((item) => item.id);

const alerts: Alert[] = [
  {
    id: "group-critical",
    severity: "critical",
    scope: "group",
    title: "Payment gateway failure",
    message: "",
    time: "2026-10-16T09:42:00Z",
  },
  {
    id: "ota-critical",
    severity: "critical",
    scope: "ota",
    title: "Booking platform outage",
    message: "",
    time: "2026-10-16T08:58:00Z",
  },
  {
    id: "academy-info",
    severity: "info",
    scope: "academy",
    title: "New cohort",
    message: "",
    time: "2026-10-15T11:20:00Z",
  },
];

const news: NewsItem[] = [
  {
    id: "academy-news",
    scope: "academy",
    title: "Course catalogue",
    summary: "",
    time: "2026-10-13T10:00:00Z",
  },
  {
    id: "group-news",
    scope: "group",
    title: "Quarter results",
    summary: "",
    time: "2026-10-14T09:00:00Z",
  },
  {
    id: "ota-news",
    scope: "ota",
    title: "New hotel partners",
    summary: "",
    time: "2026-10-13T14:00:00Z",
  },
];

const apps: AppItem[] = [
  { id: "booking", name: "Booking tool", description: "", url: "#", companies: ["ota", "tmc"] },
  { id: "fare-monitor", name: "Fare monitor", description: "", url: "#", companies: ["ota"] },
  { id: "learning", name: "Learning", description: "", url: "#", companies: ["ota", "academy"] },
  { id: "course-scheduler", name: "Course scheduler", description: "", url: "#", companies: ["academy"] },
];

const ola: User = {
  id: "u1",
  name: "Ola",
  company: "ota",
  role: "travel-consultant",
  apps: ["booking", "fare-monitor", "learning"],
};

describe("visibleAlerts", () => {
  it("always keeps group-wide alerts, whichever company is selected", () => {
    for (const company of ["ota", "academy", "tmc"]) {
      expect(ids(visibleAlerts(alerts, company))).toContain("group-critical");
    }
  });

  it("hides alerts that belong to another company", () => {
    expect(ids(visibleAlerts(alerts, "academy"))).not.toContain("ota-critical");
    expect(ids(visibleAlerts(alerts, "ota"))).not.toContain("academy-info");
  });

  it("puts the newest alert first", () => {
    expect(ids(visibleAlerts(alerts, "ota"))).toEqual([
      "group-critical",
      "ota-critical",
    ]);
  });

  it("does not change the original list", () => {
    const before = ids(alerts);
    visibleAlerts(alerts, "ota");
    expect(ids(alerts)).toEqual(before);
  });
});

describe("visibleNews", () => {
  it("always keeps group-wide news, whichever company is selected", () => {
    for (const company of ["ota", "academy", "tmc"]) {
      expect(ids(visibleNews(news, company))).toContain("group-news");
    }
  });

  it("hides news that belongs to another company", () => {
    expect(ids(visibleNews(news, "ota"))).not.toContain("academy-news");
  });

  it("puts the newest story first", () => {
    expect(ids(visibleNews(news, "ota"))).toEqual(["group-news", "ota-news"]);
  });
});

describe("visibleApps", () => {
  it("shows apps that belong to the company and that the user may use", () => {
    expect(ids(visibleApps(apps, ola, "ota"))).toEqual([
      "booking",
      "fare-monitor",
      "learning",
    ]);
  });

  it("hides apps that belong to another company", () => {
    expect(ids(visibleApps(apps, ola, "academy"))).toEqual(["learning"]);
  });

  it("hides apps the user is not allowed, even if the company has them", () => {
    expect(ids(visibleApps(apps, ola, "academy"))).not.toContain(
      "course-scheduler",
    );
  });
});

describe("splitQuickAccess", () => {
  const role: Role = {
    label: "Travel consultant",
    pinned: ["booking", "course-scheduler"],
  };

  it("separates pinned apps from the rest", () => {
    const { pinned, others } = splitQuickAccess(
      visibleApps(apps, ola, "ota"),
      role,
    );
    expect(ids(pinned)).toEqual(["booking"]);
    expect(ids(others)).toEqual(["fare-monitor", "learning"]);
  });

  it("never adds an app just because it is pinned", () => {
    const { pinned } = splitQuickAccess(visibleApps(apps, ola, "academy"), role);
    expect(pinned).toEqual([]);
  });
});