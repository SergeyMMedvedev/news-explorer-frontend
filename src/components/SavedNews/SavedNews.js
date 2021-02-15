// import React, { useState, useEffect } from 'react';
import React, {
  useState,
  useContext,
  // useEffect,
} from 'react';
import './SavedNews.css';
import Header from '../Header/Header';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import CurrentSavedCardsContext from '../../context/CurrentSavedCardsContext';
import getCardId from '../../utils/getCardId';
// import mainApi from '../../utils/MainApi';

function SavedNews({
  savedNewsPage,
  onLoginClick,
  // cards,
  isPopupOpen,
  onLogoutClick,
  classNameColorBackground,
  onTrashClick,
}) {
  const savedNewsCards = useContext(CurrentSavedCardsContext);
  const [startDisappear, setStartDisappear] = useState(false);

  function handleTrashCkick(card) {
    setStartDisappear(true);
    setTimeout(() => {
      const cardId = getCardId(savedNewsCards, card);
      onTrashClick(cardId);
      setStartDisappear(false);
    }, 400);
  }
  console.log(savedNewsCards);
  console.log(savedNewsCards);

  return (
    <>
      <Header
        savedNewsPage={savedNewsPage}
        onLoginClick={onLoginClick}
        onLogoutClick={onLogoutClick}
        isPopupOpen={isPopupOpen}
      />
      <SavedNewsHeader
        cards={savedNewsCards}
        disappear={startDisappear}
      />
      <div className={classNameColorBackground}>
        <NewsCardList
          cards={savedNewsCards}
          onTrashClick={handleTrashCkick}
          disappear={startDisappear}
        />
      </div>
    </>
  );
}

export default SavedNews;
