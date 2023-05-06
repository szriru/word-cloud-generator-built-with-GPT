import { Configuration, OpenAIApi } from 'openai'
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // // request.json() expected to be {"OPEN_AI_APIKEY": "*****", "word": "*****"}
  // const req_body = await request.json()

  // const prompt = `Return a array of objects that has 2 keys, word and weight. word is a specific word that are relevent to ${req_body.word} and weight is a value how much the word is relevant to ${req_body.word}. Array's length is 30. Don't contain any newlines or spaces.`

  // const configuration = new Configuration({
  //   apiKey: req_body.OPEN_AI_APIKEY
  // })
  // const openai = new OpenAIApi(configuration)
  // const response = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: prompt,
  //   max_tokens: 600,
  //   temperature: 0.11,
  // })
  // const wordS = response?.data?.choices[0]?.text?.replace(/\n/g, '');
  // return NextResponse.json([req_body.word, wordS])
}

