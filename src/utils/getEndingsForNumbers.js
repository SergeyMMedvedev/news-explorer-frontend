import React from 'react';

function getNumberEnding(number) {
  const stringNumber = number.toString();
  if (number >= 1) {
    if (['11', '12', '13', '14', '15', '16', '17', '18', '19'].includes(stringNumber.slice((stringNumber.length - 2), stringNumber.length))) {
      return `${number}-и`;
    }
    if (['40', '90'].includes(stringNumber.slice((stringNumber.length - 2), stringNumber.length))) {
      return `${number}-а`;
    }
    if (stringNumber.endsWith('100')) {
      return `${number}-а`;
    }

    if (stringNumber.endsWith('1')) {
      return `${number}-у`;
    }
    if (['2', '3', '4'].includes(stringNumber[stringNumber.length - 1])) {
      return `${number}-м`;
    }
    if (stringNumber.endsWith('00')) {
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
  const keywordsArr = {};
  const keywords = [];
  cards.forEach((card) => {
    keywordsArr[card.keyword] = (keywordsArr[card.keyword] || 0) + 1;
  });

  Object.keys(keywordsArr).forEach((keyword) => {
    keywords.push([keyword, keywordsArr[keyword]]);
  });

  keywords.sort((a, b) => b[1] - a[1]);

  if (keywords.length === 1) {
    return (
      <span>
        {'По ключевым словам: '}
        <strong>
          {keywords[0][0]}
        </strong>
      </span>
    );
  }
  if (keywords.length === 2) {
    return (
      <span>
        {'По ключевым словам: '}
        <strong>
          {`${keywords[0][0]}`}
        </strong>
        {' и '}
        <strong>
          {`${keywords[1][0]} `}
        </strong>
      </span>
    );
  }

  if (keywords.length === 3) {
    return (
      <span>
        {'По ключевым словам: '}
        <strong>
          {`${keywords[0][0]}`}
        </strong>
        {', '}
        <strong>
          {`${keywords[1][0]}`}
        </strong>
        {' и '}
        <strong>
          {keywords[2][0]}
        </strong>
      </span>
    );
  }
  if (keywords.length > 3) {
    return (
      <span>
        {'По ключевым словам: '}
        <strong>
          {`${keywords[0][0]}`}
        </strong>
        {', '}
        <strong>
          {`${keywords[1][0]}`}
        </strong>
        {' и '}
        <strong>
          {getNumberEnding(keywords.length - 2)}
          {' другим'}
        </strong>
      </span>
    );
  }
  return (<span />);
}
