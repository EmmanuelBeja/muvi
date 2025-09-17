import { useEffect, useState } from 'react';

/**
 * useDebounce hook
 * Returns a debounced value after a specified delay
 * Useful for reducing API calls when typing in search inputs
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 500)
 */
export function useDebounce<T>(value: T, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}
