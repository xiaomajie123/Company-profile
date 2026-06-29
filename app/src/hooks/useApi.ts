// ==========================================
// 矢量猫科技 数据获取 Hook
// ==========================================

import { useState, useEffect, useCallback } from 'react';
import { ApiError } from '@/lib/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = [],
): UseApiState<T> & { refetch: () => void } {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetch = useCallback(() => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    fetcher()
      .then((data) => {
        setState({ data, loading: false, error: null });
      })
      .catch((err) => {
        const message =
          err instanceof ApiError
            ? err.message
            : '加载失败，请检查网络连接后重试';
        setState((prev) => ({ ...prev, loading: false, error: message }));
      });
  }, deps);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
}
