import { useCallback, useState } from 'react';

const useLoading: (
  initialValue?: boolean
) => [boolean, <T>(promise: Promise<T>) => Promise<T>] = (
  initialValue = false
) => {
  const [isLoading, setIsLoading] = useState(initialValue);

  const startTransition = useCallback(async <T>(promise: Promise<T>) => {
    try {
      setIsLoading(true);
      const data = await promise;

      return data;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, startTransition];
};

export default useLoading;
