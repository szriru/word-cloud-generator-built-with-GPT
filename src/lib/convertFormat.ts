type RawWords = Array<{
  word: string,
  weight: number
}>
export function convertFormat(rawWords: RawWords) {
  const convertedWords = [];
  for (let i = 0; i < rawWords.length; i++) {
    const word = rawWords[i];
    convertedWords.push({
      text: word.word,
      value: word.weight,
    });
  }
  return convertedWords
}