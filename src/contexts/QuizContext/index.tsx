import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

interface Props {
  children: React.ReactNode;
}
interface QuizContextType {
  channelId: string | null;
  randomQuizCount: number | null;
  randomQuizCategory: string;
  setChannelId: Dispatch<SetStateAction<string | null>>;
  setRandomQuizCount: Dispatch<SetStateAction<number | null>>;
  setRandomQuizCategory: Dispatch<SetStateAction<string | null>>;
}

const QuizContext = createContext({});
export const useQuizContext = () => useContext(QuizContext) as QuizContextType;

const QuizProvider = ({ children }: Props) => {
  const [channelId, setChannelId] = useState(null);
  const [randomQuizCount, setRandomQuizCount] = useState(null);
  const [randomQuizCategory, setRandomQuizCategory] = useState(null);

  const state = useMemo(
    () => ({
      channelId,
      randomQuizCount,
      randomQuizCategory,
      setChannelId,
      setRandomQuizCount,
      setRandomQuizCategory,
    }),
    [channelId, randomQuizCount, randomQuizCategory]
  );

  return <QuizContext.Provider value={state}>{children}</QuizContext.Provider>;
};

export default QuizProvider;
