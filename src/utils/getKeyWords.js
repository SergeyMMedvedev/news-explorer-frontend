function getNumberEnding(number) {
  const stringNumber = number.toString();
  if (number < 100) {
    if (stringNumber.endsWith('1')) {
      return `${number}-у`
    } else if (10 <= number && number <= 20) {
      return `${number}-и`
    } else if (['2', '3', '4'].includes(stringNumber[stringNumber.length - 1])) {
      return `${number}-м`
    } else {
      return `${number}-и`
    }
  } else {
    return `${number}`
  }
}

export default function getKeyWords(cards) {
  const keywords = []
  cards.forEach((card) => {
    if (card.tag) {
      if (!keywords.includes(card.tag)) {
        keywords.push(card.tag)
      }
    }
  });
  if (keywords.length === 1) {
    return (
      <span>
        По ключевым словам:
        <strong> {keywords[0]}</strong>
      </span>
    )
  } else if (keywords.length === 2) {
    return (
      <span>
        По ключевым словам:
        <strong> {keywords[0]}</strong> и
        <strong> {keywords[1]}</strong>
      </span>
    )
  } else if (keywords.length === 3) {
    return (
      <span>
        По ключевым словам:
        <strong> {keywords[0]}</strong>,
        <strong> {keywords[1]}</strong> и
        <strong> {keywords[2]}</strong>
      </span>
    )
  } else if (keywords.length > 3) {
    return (
      <span>
        По ключевым словам:
        <strong> {keywords[0]}</strong>,
        <strong> {keywords[1]}</strong> и
        <strong> {getNumberEnding(keywords.length - 2)} другим</strong>
      </span>
    )
  }
}


