import React, { useState, useEffect } from 'react';
import './Main.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';

function Main({
  onLoginClick,
  cards,
  isPopupOpen,
  onLogoutClick,
  classNameImageBackgroun,
  classNameColorBackground,
}) {
  const [loadedCards, setLoadedCards] = useState([]);
  const [startLoading, setStartLoading] = useState(false);
  const [isCardsLoaded, setIsCardsLoaded] = useState(false);
  const [emptyQuery, setEmptyQuery] = useState(false);

  function handleSearchSubmit(keyword) {
    setStartLoading(true);
    setIsCardsLoaded(false);
    if (!keyword) {
      setEmptyQuery(true);
    } else {
      setEmptyQuery(false);
    }
  }

  useEffect(() => {
    if (startLoading) {
      setTimeout(() => {
        setStartLoading(false);
        setIsCardsLoaded(true);
      }, 1000);
    }
  }, [startLoading]);

  useEffect(() => {
    if (isCardsLoaded && !emptyQuery) {
      setLoadedCards(cards);
    } else {
      setLoadedCards([]);
    }
  }, [isCardsLoaded]);

  return (
    <>
      <div className={classNameImageBackgroun}>
        <Header
          onLoginClick={onLoginClick}
          onLogoutClick={onLogoutClick}
          isPopupOpen={isPopupOpen}
        />
        <SearchForm
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div className={classNameColorBackground}>
        {(startLoading || isCardsLoaded) && (
          <NewsCardList
            mainPage
            cards={loadedCards}
            startLoading={startLoading}
            isCardsLoaded={isCardsLoaded}
            emptyQuery={emptyQuery}
          />
        )}
      </div>

      <About />
    </>
  );
}

export default Main;
