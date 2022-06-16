import { useCallback, useState } from 'react';

export type ReturnTypes<T> = [T, (value: T) => void, () => void];

type StorageType = 'localStorage' | 'sessionStorage';

const getStorage = (storageType: StorageType) => {
  return storageType === 'localStorage' ? localStorage : sessionStorage;
};

function useStorage<T>(
  key: string,
  defaultValue: T,
  storageType: StorageType,
): ReturnTypes<T> {
  const [value, setValue] = useState(() => {
    try {
      const item = getStorage(storageType).getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(error);
      return defaultValue;
    }
  });

  const setItem = useCallback(
    (newValue: T) => {
      try {
        setValue(newValue);
        getStorage(storageType).setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.error(error);
      }
    },
    [key, storageType],
  );

  const removeItem = useCallback(() => {
    try {
      getStorage(storageType).removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }, [key, storageType]);

  return [value, setItem, removeItem];
}

export default useStorage;
