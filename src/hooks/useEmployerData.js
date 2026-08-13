import { useCallback, useEffect, useState } from "react";
import { fetchEmployerSnapshot } from "../api/mockEmployerApi";
import { deriveDashboardData } from "../lib/calculations";

const initialState = { loading: true, error: null, data: null };

export function useEmployerData() {
  const [state, setState] = useState(initialState);

  const load = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const raw = await fetchEmployerSnapshot();
      setState({ loading: false, error: null, data: deriveDashboardData(raw) });
    } catch (error) {
      setState({ loading: false, error, data: null });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, refresh: load };
}
