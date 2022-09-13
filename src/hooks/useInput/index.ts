import type React from 'react';
import { useCallback, useState } from 'react';

type ReturnTypes<T> = [
  T,
  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  React.Dispatch<React.SetStateAction<T>>
];

function useInput<T = string>(initialValue: T): ReturnTypes<T> {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value as unknown as T);
    },
    []
  );
  return [value, handler, setValue];
}

export default useInput;
