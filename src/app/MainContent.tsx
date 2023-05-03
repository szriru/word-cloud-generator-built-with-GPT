'use client'
import WordCloud from '@/components/WordCloud'
import InputField from '@/components/InputField'
import { wcContext } from '@/components/ContextProvider'
import { useContext } from 'react'
import Link from 'next/link'
import MainCard from '@/components/MainCard'
import { IconTwitterCircle, IconGithub } from '@/components/Icons'


export default function MainContent() {
  const { word, wordS } = useContext(wcContext)
  return (
    <main className='gap-4 min-h-screen min-w-screen flex flex-col justify-center items-center bg-neutral-800 text-white'>
      <header className='flex flex-col justify-center items-center gap-2 '>
        <h1 className='font-semibold text-3xl'>WordCloud Generator powered by OpenAI GPT</h1>
        <p className='flex gap-2 text-3xl'>
          <Link target="_blank" href={"https://twitter.com/sz_riru"}><IconTwitterCircle /></Link>
          <Link target="_blank" href={"https://github.com/szriru/word-cloud-generator-built-with-GPT"}><IconGithub /></Link>
          <Link target="_blank" href={"https://www.szriru.com/post/created-word-cloud-generator-with-gpt"}>My blog</Link>
        </p>
        <h2 className='font-normal text-3xl underline'><span className='text-red-500 text-semibold'>{word ? word : ""}</span>'s wordcloud</h2>
      </header>
      <MainCard className="flex justify-center items-center">
        <WordCloud wordS={wordS} />
      </MainCard>
      <InputField />
    </main>
  )
}