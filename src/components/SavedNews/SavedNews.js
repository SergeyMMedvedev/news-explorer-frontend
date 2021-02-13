// import React, { useState, useEffect } from 'react';
import React, {
  useState,
  useContext,
  // useEffect
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
  onCardDelete,
}) {
  const savedNewsCards = useContext(CurrentSavedCardsContext);
  const [startDisappear, setStartDisappear] = useState(false);

  function handleNewsCardDelete(card) {
    setStartDisappear(true);
    setTimeout(() => {
      const cardId = getCardId(savedNewsCards, card);
      onCardDelete(cardId);
      setStartDisappear(false);
    }, 400);
  }

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
          onDelete={handleNewsCardDelete}
          disappear={startDisappear}
        />
      </div>
    </>
  );
}

export default SavedNews;
