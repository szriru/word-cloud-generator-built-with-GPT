import { Configuration, OpenAIApi } from 'openai'

interface reqToOpenAiProps {
  word: string,
  OPEN_AI_APIKEY: string
}

export default async function reqToOpenAi(data: reqToOpenAiProps ) {
  // request.json() expected to be {"OPEN_AI_APIKEY": "*****", "word": "*****"}
  const { word, OPEN_AI_APIKEY} = data
  console.log({word, OPEN_AI_APIKEY})
  const prompt = `Return a array of objects that has 2 keys, word and weight. word is a specific word that are relevent to ${word} and weight is a value how much the word is relevant to ${word}. Array's length is 30. Don't contain any newlines or spaces.`
  const configuration = new Configuration({
    apiKey: OPEN_AI_APIKEY
  })
  const openai = new OpenAIApi(configuration)
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 600,
    temperature: 0.11,
  })
  const wordS = response?.data?.choices[0]?.text?.replace(/\n/g, '');
  return [word, wordS]
}