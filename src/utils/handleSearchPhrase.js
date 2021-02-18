export default function handleSearchPhrase(phrase) {
  const words = phrase.trim().toLowerCase().split(' ');
  const result = [];
  words.forEach((word) => {
    if (word) {
      result.push(word[0].toUpperCase() + word.slice(1));
    }
  });
  return result.join(' ');
}
