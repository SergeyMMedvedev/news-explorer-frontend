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
}) {
  const [loadedCards, setLoadedCards] = useState([]);
  const [startLoading, setStartLoading] = useState(false);
  const [isCardsLoaded, setIsCardsLoaded] = useState(false);

  function handleSearchSubmit(e) {
    e.preventDefault();
    setStartLoading(true);
    setIsCardsLoaded(false);
    setLoadedCards([]);
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
    if (isCardsLoaded) {
      setLoadedCards(cards);
    }
  }, [isCardsLoaded]);

  return (
    <>
      <div className="backgrount-container">
        <Header
          onLoginClick={onLoginClick}
          onLogoutClick={onLogoutClick}
          isPopupOpen={isPopupOpen}
        />
        <SearchForm
          onSubmit={handleSearchSubmit}
        />
      </div>
      {(startLoading || isCardsLoaded) && (
        <NewsCardList
          mainPage
          cards={loadedCards}
          startLoading={startLoading}
          isCardsLoaded={isCardsLoaded}
        />
      )}
      <About />
    </>
  );
}

export default Main;
