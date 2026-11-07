import { useCallback, useMemo, useState } from 'react';
import { CompareContext } from './compare-context';

export const MAX_COMPARE = 3;

// Models ticked for comparison. Kept in memory only: it's a short-lived shopping aid.
export default function CompareProvider({ children }) {
  const [ids, setIds] = useState([]);

  const toggle = useCallback(
    (id) => setIds((current) => (current.includes(id) ? current.filter((x) => x !== id) : current.length < MAX_COMPARE ? [...current, id] : current)),
    [],
  );
  const clear = useCallback(() => setIds([]), []);

  const value = useMemo(() => ({ ids, toggle, clear, isFull: ids.length >= MAX_COMPARE }), [ids, toggle, clear]);
  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}
