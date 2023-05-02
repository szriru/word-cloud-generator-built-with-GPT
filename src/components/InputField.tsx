'use client'
import cn from 'classnames'
import { useState, useContext, useEffect } from 'react';
import { Context } from './ContextProvider';
import convertFormat from '@/lib/convertFormat'

interface InputFieldProps {
  className: string
}

const apiKeyRegex = /^sk-[a-zA-Z0-9]+$/;

function isValidApiKey(apiKeyValue: string) {
  return apiKeyRegex.test(apiKeyValue.trim());
}

const InputField = ({ className }: InputFieldProps) => {
  const [tmpWord, setTmpWord] = useState<string>('')
  const [apiKeyValue, setApiKeyValue] = useState<string>('')
  const [isApiKeyValid, setIsApiKeyValid] = useState<boolean>(false);
  const { setWord, setWordS, fetching, setFetching } = useContext(Context)

  useEffect(() => {
    setIsApiKeyValid(isValidApiKey(apiKeyValue));
  }, [apiKeyValue]);

  useEffect(() => {
    const localWord = localStorage.getItem("Word")
    const localWordS = localStorage.getItem("WordS")
    const localApiKey = localStorage.getItem("OPENAI_APIKEY")
    if (localWord) {
      setTmpWord(localWord)
      setWord(localWord)
    }
    if (localWordS) {
      setWordS(JSON.parse(localWordS))
    }
    if (localApiKey) {
      setApiKeyValue(localApiKey)
    }
  }, [])

  const handleTmpWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTmpWord(e.target.value)
  }
  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKeyValue(e.target.value)
  }

  const handleClick = () => {
    if (!isApiKeyValid) { throw new Error("Invalid OPEN-AI APY KEY") }
    setFetching(true)
    const data = {
      // CHANGE WHEN DEPLOY PRODUCTION
      'OPEN_AI_APIKEY': apiKeyValue,
      'word': tmpWord
    }

    const getWordCloud = async () => {
      const res = await fetch('/api/getwordcloud', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })
      return res
    }

    getWordCloud().then(res => res.json()).then(res => {
      // res expected to be [word, wordS]
      const evaled = eval(res[1])
      const processed = JSON.parse(JSON.stringify(evaled))
      const convertedWords = convertFormat(processed)
      setWord(res[0])
      setWordS(convertedWords)
      setFetching(false)
      localStorage.setItem("Word", res[0])
      localStorage.setItem("WordS", JSON.stringify(convertedWords))
      localStorage.setItem("OPENAI_APIKEY", apiKeyValue)
    }).catch(err => { throw new Error(err) })
  }

  return (
    <div className={cn(className, 'flex flex-col gap-4')}>
      <input
        type="text"
        value={apiKeyValue}
        onChange={handleApiKeyChange}
        className='p-2 rounded-xl text-black'
        placeholder="enter your OPEN AI API KEY"
        max="100"
        disabled={fetching}
      />
      {!isApiKeyValid && (
        <div className="error-message">Invalid API key. Please enter a valid OpenAI API key.</div>
      )}
      <input
        type="text"
        value={tmpWord}
        onChange={handleTmpWordChange}
        className='p-2 rounded-xl text-black'
        placeholder="enter your word"
        max="30"
        disabled={fetching}
      />
      <button disabled={fetching || !isApiKeyValid} onClick={handleClick} className=' bg-blue-500 p-2 rounded-xl'>
        {fetching || !isApiKeyValid ? (
          <div role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ): (
          <span>Make</span>
        )}
      </button>
    </div>
  )
}

export default InputField