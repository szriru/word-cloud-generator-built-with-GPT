'use client';
import { createContext, useState } from 'react';
import { defaultWordS } from '@/utils/constants'
import { Word, WordS } from '@/utils/types';

interface createContextProps {
  word: Word
  setWord: React.Dispatch<React.SetStateAction<Word>>
  wordS: WordS
  setWordS: React.Dispatch<React.SetStateAction<WordS>>
  fetching: boolean
  setFetching: React.Dispatch<React.SetStateAction<boolean>>
}

interface contextProviderProps {
  children: React.ReactNode;
}

export const wcContext = createContext<createContextProps>({
  word: "",
  setWord: () => {},
  wordS: [{text: "", value: 1}],
  setWordS: () => {},
  fetching: false,
  setFetching: () => {},
});

export default function ContextProvider({ children }: contextProviderProps) {
  const [word, setWord] = useState<Word>("Mike O'hearn")
  const [wordS, setWordS] = useState<WordS>(defaultWordS)
  const [fetching, setFetching] = useState(false)

  return (
    <wcContext.Provider value={{ word, setWord, wordS, setWordS, fetching, setFetching }}>
      {children}
    </wcContext.Provider>
  );
}