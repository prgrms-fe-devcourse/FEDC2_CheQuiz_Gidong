import { useCallback, useState } from 'react';

export type ReturnTypes<T> = [T, (value: T) => void];

function useStorage<T>(
  key: string,
  defaultValue: T,
  storageType = 'localStorage',
): ReturnTypes<T> {
  const [value, setStorageItem] = useState(() => {
    try {
      const item = (
        storageType === 'localStorage' ? localStorage : sessionStorage
      ).getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch (error) {
      console.error(error as Error);
      return defaultValue;
    }
  });

  const setValue = useCallback(
    (newValue: T) => {
      try {
        setStorageItem(newValue);
        (storageType === 'localStorage'
          ? localStorage
          : sessionStorage
        ).setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.error(error as Error);
      }
    },
    [key, storageType],
  );

  return [value, setValue];
}

export default useStorage;
