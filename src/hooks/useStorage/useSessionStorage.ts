import useStorage from './useStorage';

import type { ReturnTypes } from './useStorage';

function useSessionStorage<T>(key: string, defaultValue: T): ReturnTypes<T> {
  const [value, setItem, removeItem] = useStorage(
    key,
    defaultValue,
    'sessionStorage'
  );

  return [value, setItem, removeItem];
}

export default useSessionStorage;
