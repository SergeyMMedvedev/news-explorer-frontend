import React, { useState } from 'react';
import './SavedNews.css';
import Header from '../Header/Header';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews({
  savedNewsTheme,
  onLoginClick,
  cards,
  isPopupOpen,
  onLogoutClick,
}) {
  const [savedNewsCards, setSavedNewsCards] = useState(cards);
  const [startDisappear, setStartDisappear] = useState(false);

  function handleNewsCardDelete(card) {
    setStartDisappear(true);
    setTimeout(() => {
      savedNewsCards.splice(savedNewsCards.indexOf(card), 1);
      setSavedNewsCards(savedNewsCards);
      setStartDisappear(false);
    }, 400);
  }

  return (
    <>
      <Header
        savedNewsTheme={savedNewsTheme}
        onLoginClick={onLoginClick}
        onLogoutClick={onLogoutClick}
        isPopupOpen={isPopupOpen}
      />
      <SavedNewsHeader
        cards={savedNewsCards}
        disappear={startDisappear}
      />
      <NewsCardList
        cards={savedNewsCards}
        onDelete={handleNewsCardDelete}
        disappear={startDisappear}
      />
    </>
  );
}

export default SavedNews;
