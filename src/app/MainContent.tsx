'use client'
import cn from 'classnames'
import WordCloud from '@/components/WordCloud'
import InputField from '@/components/InputField'
import { Context } from '@/components/ContextProvider'
import { useContext } from 'react'
import Link from 'next/link'


export default function MainContent() {
  const { word, wordS } = useContext(Context)
  return (
    <main className='gap-4 min-h-screen min-w-screen flex flex-col justify-center items-center bg-neutral-800 text-white'>
      <header className='flex flex-col justify-center items-center gap-2 '>
        <h1 className='font-semibold text-3xl'>WordCloud Generator powered by OpenAI GPT</h1>
        <p className='flex gap-2 text-3xl'>
          <Link target="_blank" href={"https://twitter.com/sz_riru"}><IconTwitterCircle /></Link>
          <Link target="_blank" href={"https://github.com/szriru/word-cloud-generator-built-with-GPT"}><IconGithub /></Link>
        </p>
        <h2 className='font-normal text-3xl underline'><span className='text-red-500 text-semibold'>{word}</span>'s wordcloud</h2>
      </header>
      <MainCard className="flex justify-center items-center">
        <WordCloud wordS={wordS} />
      </MainCard>
      <InputField className="" />
    </main>
  )
}

interface MainCardProps {
  children: React.ReactNode
  className: string
}

function MainCard({ children, className }: MainCardProps) {
  return (
    <div className={cn(className, 'rounded-xl  w-fit h-fit ring-inset ring-neutral-400 ring-8 ring-transparent bg-neutral-50 dark:bg-neutral-700')}>
      {children}
    </div>
  )
}

function IconTwitterCircle() {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="1em"
      width="1em"
    >
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm215.3 337.7c.3 4.7.3 9.6.3 14.4 0 146.8-111.8 315.9-316.1 315.9-63 0-121.4-18.3-170.6-49.8 9 1 17.6 1.4 26.8 1.4 52 0 99.8-17.6 137.9-47.4-48.8-1-89.8-33-103.8-77 17.1 2.5 32.5 2.5 50.1-2a111 111 0 01-88.9-109v-1.4c14.7 8.3 32 13.4 50.1 14.1a111.13 111.13 0 01-49.5-92.4c0-20.7 5.4-39.6 15.1-56a315.28 315.28 0 00229 116.1C492 353.1 548.4 292 616.2 292c32 0 60.8 13.4 81.1 35 25.1-4.7 49.1-14.1 70.5-26.7-8.3 25.7-25.7 47.4-48.8 61.1 22.4-2.4 44-8.6 64-17.3-15.1 22.2-34 41.9-55.7 57.6z" />
    </svg>
  );
}

function IconGithub() {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="1em"
      width="1em"
    >
      <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" />
    </svg>
  );
}