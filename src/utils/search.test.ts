import { describe, expect, it } from "vitest";
import type { AppItem, NewsItem } from "../types";
import { searchAppsAndNews } from "./search";

const ids = (items: { id: string }[]) => items.map((item) => item.id);

const apps: AppItem[] = [
  {
    id: "booking",
    name: "Booking tool",
    description: "Search and book fares",
    url: "#",
    companies: ["ota"],
  },
  {
    id: "crm",
    name: "CRM",
    description: "Customer records",
    url: "#",
    companies: ["ota"],
  },
];

const news: NewsItem[] = [
  {
    id: "partners",
    scope: "ota",
    title: "New hotel partners added",
    summary: "Twelve new partners are now bookable.",
    time: "2026-10-13T14:00:00Z",
  },
  {
    id: "fire-drill",
    scope: "facilities",
    title: "Fire drill on Wednesday",
    summary: "Drills run in each building.",
    time: "2026-10-09T08:00:00Z",
  },
];

describe("searchAppsAndNews", () => {
  it("finds an app by its name", () => {
    const result = searchAppsAndNews(apps, news, "booking");
    expect(ids(result.apps)).toEqual(["booking"]);
    expect(result.news).toEqual([]);
  });

  it("finds an app by its description", () => {
    const result = searchAppsAndNews(apps, news, "customer");
    expect(ids(result.apps)).toEqual(["crm"]);
  });

  it("finds news by its title", () => {
    const result = searchAppsAndNews(apps, news, "hotel");
    expect(ids(result.news)).toEqual(["partners"]);
    expect(result.apps).toEqual([]);
  });

  it("finds news by its summary", () => {
    const result = searchAppsAndNews(apps, news, "bookable");
    expect(ids(result.news)).toEqual(["partners"]);
  });

  it("ignores capital letters and extra spaces", () => {
    const result = searchAppsAndNews(apps, news, "  BOOKING ");
    expect(ids(result.apps)).toEqual(["booking"]);
  });

  it("returns nothing for an empty search", () => {
    const result = searchAppsAndNews(apps, news, "");
    expect(result).toEqual({ apps: [], news: [] });
  });

  it("returns nothing for a search of only spaces", () => {
    const result = searchAppsAndNews(apps, news, "   ");
    expect(result).toEqual({ apps: [], news: [] });
  });

  it("returns nothing when nothing matches", () => {
    const result = searchAppsAndNews(apps, news, "zzzz");
    expect(result).toEqual({ apps: [], news: [] });
  });
});