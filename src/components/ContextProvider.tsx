'use client';
import { createContext, useState } from 'react';
import { defaultWordS } from '@/utils/constants'

export const Context = createContext<createContextProps>({
  word: "",
  setWord: () => {},
  wordS: [],
  setWordS: () => {},
  fetching: false,
  setFetching: () => {},
});

type Word = string
type WordS = Array<{
  text: string
  value: number
}>

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

export default function contextProvider({ children }: contextProviderProps) {
  const [word, setWord] = useState<Word>("Mike O'hearn")
  const [wordS, setWordS] = useState<WordS>(defaultWordS)
  const [fetching, setFetching] = useState(false)

  return (
    <Context.Provider value={{ word, setWord, wordS, setWordS, fetching, setFetching }}>
      {children}
    </Context.Provider>
  );
}