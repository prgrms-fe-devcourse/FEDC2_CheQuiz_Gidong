import useStorage, { ReturnTypes } from './useStorage';

function useSessionStorage<T>(key: string, defaultValue: T): ReturnTypes<T> {
  const [storage, setStorage] = useStorage(key, defaultValue, 'sessionStorage');
  return [storage, setStorage];
}

export default useSessionStorage;
