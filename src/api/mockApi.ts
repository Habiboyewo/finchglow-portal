import type { Alert, AppItem, NewsItem } from "../types";
import appsData from "../data/apps.json";
import alertsData from "../data/alerts.json";
import newsData from "../data/news.json";

const DELAY_MS = 700;

// Default failure rate comes from .env (0 = never fails, 0.2 = about 1 in 5)
const parsedRate = Number(import.meta.env.VITE_FAILURE_RATE ?? 0.2);
const DEFAULT_RATE = Number.isNaN(parsedRate) ? 0 : parsedRate;

// Demo switch: adding ?fail=1 to the address makes every request fail,
// ?fail=0.5 makes about half fail. This lets the error and retry states be
// shown on the live site without changing any setting.
function getFailureRate(): number {
  const param = new URLSearchParams(window.location.search).get("fail");
  if (param === null) return DEFAULT_RATE;
  if (param === "") return 1;
  const value = Number(param);
  return Number.isNaN(value) ? DEFAULT_RATE : Math.min(Math.max(value, 0), 1);
}

function simulateRequest<T>(data: T, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < getFailureRate()) {
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