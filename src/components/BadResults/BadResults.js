import React from 'react';
import './BadResults.css';
import '../appearAnimation/appearAnimation.css';

function BadResults({ emptyQuery, newsServerError }) {
  function getBadResult(empty, error) {
    if (empty) {
      return 'Нужно ввести ключевое слово';
    }
    if (error) {
      return 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
    }
    return 'К сожалению по вашему запросу ничего не найдено.';
  }

  return (
    <div className="badresults appearAnimation">
      <div className="badresults__not-found-picture" />
      <p className="badresults__not-found-title">Ничего не найдено</p>
      <p className="badresults__not-found-text">{getBadResult(emptyQuery, newsServerError)}</p>
    </div>
  );
}

export default BadResults;
