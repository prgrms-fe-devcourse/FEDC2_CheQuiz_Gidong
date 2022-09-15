import useStorage from './useStorage';

import type { ReturnTypes } from './useStorage';

function useLocalStorage<T>(key: string, defaultValue: T): ReturnTypes<T> {
  const [value, setItem, removeItem] = useStorage(
    key,
    defaultValue,
    'localStorage'
  );

  return [value, setItem, removeItem];
}

export default useLocalStorage;
