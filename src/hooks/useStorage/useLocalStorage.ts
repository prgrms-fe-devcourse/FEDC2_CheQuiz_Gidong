import useStorage, { ReturnTypes } from './useStorage';

function useLocalStorage<T>(key: string, defaultValue: T): ReturnTypes<T> {
  const [storage, setStorage] = useStorage(key, defaultValue, 'localStorage');
  return [storage, setStorage];
}

export default useLocalStorage;
