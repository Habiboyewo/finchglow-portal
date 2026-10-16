import type { Alert, AppItem, NewsItem } from "../types";
import appsData from "../data/apps.json";
import alertsData from "../data/alerts.json";
import newsData from "../data/news.json";

const DELAY_MS = 700;

// Failure rate comes from .env (0 = never fails, 0.2 = about 1 in 5 requests)
const parsedRate = Number(import.meta.env.VITE_FAILURE_RATE ?? 0.2);
const FAILURE_RATE = Number.isNaN(parsedRate) ? 0 : parsedRate;

function simulateRequest<T>(data: T, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < FAILURE_RATE) {
        reject(new Error(`Could not load ${label}`));
      } else {
        resolve(data);
      }
    }, DELAY_MS);
  });
}

export const fetchApps = () => simulateRequest(appsData as AppItem[], "apps");

export const fetchAlerts = () =>
  simulateRequest(alertsData as Alert[], "alerts");

export const fetchNews = () => simulateRequest(newsData as NewsItem[], "news");