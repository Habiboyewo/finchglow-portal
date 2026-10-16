import { useCallback, useEffect, useState } from "react";

interface FetchState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

export function useFetch<T>(fetcher: () => Promise<T>) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;

    fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, error: null, loading: false });
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        const message =
          error instanceof Error ? error : new Error("Something went wrong");
        setState({ data: null, error: message, loading: false });
      });

    return () => {
      cancelled = true;
    };
  }, [fetcher, attempt]);

  const retry = useCallback(() => {
    setState((current) => ({ ...current, error: null, loading: true }));
    setAttempt((count) => count + 1);
  }, []);

  return { ...state, retry };
}