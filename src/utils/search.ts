import type { AppItem, NewsItem } from "../types";

export interface SearchResult {
  apps: AppItem[];
  news: NewsItem[];
}

// Case-insensitive match on the text people actually read.
export function searchAppsAndNews(
  apps: AppItem[],
  news: NewsItem[],
  query: string,
): SearchResult {
  const term = query.trim().toLowerCase();
  if (term === "") return { apps: [], news: [] };

  const matches = (...fields: string[]) =>
    fields.some((field) => field.toLowerCase().includes(term));

  return {
    apps: apps.filter((app) => matches(app.name, app.description)),
    news: news.filter((item) => matches(item.title, item.summary)),
  };
}