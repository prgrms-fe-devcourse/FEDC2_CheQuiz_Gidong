import { useCallback, useState } from 'react';

export type ReturnTypes<T> = [T, (value: T) => void];

function useStorage<T>(
  key: string,
  defaultValue: T,
  storageType = 'localStorage',
): ReturnTypes<T> {
  const [storageItem, setStorageItem] = useState(() => {
    try {
      const item = (
        storageType === 'localStorage' ? localStorage : sessionStorage
      ).getItem(key);
      return item ? (JSON.parse(item) as unknown as T) : defaultValue;
    } catch (error) {
      console.error(error as Error);
      return defaultValue;
    }
  });

  const setStorage = useCallback(
    (value: T) => {
      try {
        setStorageItem(value);
        (storageType === 'localStorage'
          ? localStorage
          : sessionStorage
        ).setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(error as Error);
      }
    },
    [key, storageType],
  );

  return [storageItem, setStorage];
}

export default useStorage;
