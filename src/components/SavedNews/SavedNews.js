import React, { useState, useEffect } from 'react';
import './SavedNews.css';
import Header from '../Header/Header';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import mainApi from '../../utils/MainApi';

function SavedNews({
  savedNewsPage,
  onLoginClick,
  // cards,
  isPopupOpen,
  onLogoutClick,
  classNameColorBackground,
}) {
  const [savedNewsCards, setSavedNewsCards] = useState([]);
  const [startDisappear, setStartDisappear] = useState(false);

  function handleNewsCardDelete(card) {
    setStartDisappear(true);
    setTimeout(() => {
      savedNewsCards.splice(savedNewsCards.indexOf(card), 1);
      setSavedNewsCards(savedNewsCards);
      setStartDisappear(false);
    }, 400);
  }

  useEffect(() => {
    mainApi.getArticles().then((articles) => {
      setSavedNewsCards(articles);
    });
  }, []);

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
