import React from 'react';

function getNumberEnding(number) {
  const stringNumber = number.toString();
  if (number >= 1 && number < 100) {
    if (stringNumber.endsWith('1')) {
      return `${number}-у`;
    }
    if (number >= 10 && number <= 20) {
      return `${number}-и`;
    }
    if (['2', '3', '4'].includes(stringNumber[stringNumber.length - 1])) {
      return `${number}-м`;
    }
    return `${number}-и`;
  }
  return `${number}`;
}

export function getNumberForSavedNews(number) {
  const stringNumber = number.toString();
  if (stringNumber.endsWith('1')) {
    return 'сохраненная статья';
  }
  if (number >= 10 && number <= 20) {
    return 'сохраненных статей';
  }
  if (['2', '3', '4'].includes(stringNumber[stringNumber.length - 1])) {
    return 'сохраненные статьи';
  }
  return 'сохраненных статей';
}

export function getKeyWords(cards) {
  const keywords = [];
  cards.forEach((card) => {
    if (card.tag) {
      if (!keywords.includes(card.tag)) {
        keywords.push(card.tag);
      }
    }
  });

  if (keywords.length === 1) {
    return (
      <span>
        По ключевым словам:
        <strong>
          {keywords[0]}
        </strong>
      </span>
    );
  }
  if (keywords.length === 2) {
    return (
      <span>
        По ключевым словам:
        <strong>
          {keywords[0]}
        </strong>
        и
        <strong>
          {keywords[1]}
        </strong>
      </span>
    );
  }

  if (keywords.length === 3) {
    return (
      <span>
        По ключевым словам:
        <strong>
          {keywords[0]}
        </strong>
        ,
        <strong>
          {keywords[1]}
        </strong>
        и
        <strong>
          {keywords[2]}
        </strong>
      </span>
    );
  }
  if (keywords.length > 3) {
    return (
      <span>
        По ключевым словам:
        <strong>
          {keywords[0]}
        </strong>
        ,
        <strong>
          {keywords[1]}
        </strong>
        и
        <strong>
          {getNumberEnding(keywords.length - 2)}
          другим
        </strong>
      </span>
    );
  }
  return (<span />);
}
