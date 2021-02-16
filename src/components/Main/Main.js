import React, { useState, useEffect, useRef } from 'react';
import './Main.css';
import '../extendAnimation/extendAnimation.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MainNewsCardList from '../MainNewsCardList/MainNewsCardList';
import About from '../About/About';
import newsApi from '../../utils/NewsApi';
import getTimeInterval from '../../utils/getTimeInterval';
import { clearNewscardsFromLocalStorage } from '../../utils/clearLocalStorage';

function Main({
  onLoginClick,
  onLogoutClick,
  isPopupOpen,
  onBookmarkClikToSave,
  onBookmarkClikToDelete,
  classNameImageBackgroun,
  classNameColorBackground,
}) {
  const [startLoading, setStartLoading] = useState(false);
  const [isCardsLoaded, setIsCardsLoaded] = useState(false);
  const [emptyQuery, setEmptyQuery] = useState(false);
  const [cards, setCards] = useState((localStorage.getItem('newscards') && JSON.parse(localStorage.getItem('newscards'))) || []);
  const [newsServerError, setNewsServerError] = useState('');

  // function clearNewscardsFromLocalStorage() {
  //   localStorage.removeItem('newscards');
  //   localStorage.removeItem('minShowCardIndex');
  //   localStorage.removeItem('maxShowCardIndex');
  // }

  function handleSearchSubmit(isKeywordValid, keyword) {
    setCards([]);
    clearNewscardsFromLocalStorage();
    setStartLoading(true);
    setIsCardsLoaded(false);
    if (isKeywordValid === false) {
      setEmptyQuery(true);
      setStartLoading(false);
      setIsCardsLoaded(true);
    } else {
      setEmptyQuery(false);
      const timeInterval = getTimeInterval();

      newsApi.getNews({
        from: timeInterval.from,
        to: timeInterval.to,
        q: keyword,
        pageSize: 100,
      }).then((newsCards) => {
        setStartLoading(false);
        setIsCardsLoaded(true);
        newsCards.articles.forEach((card) => {
          card.keyword = keyword;
        });
        setCards(newsCards.articles);
        localStorage.setItem('newscards', JSON.stringify(newsCards.articles));
      })
        .catch((err) => setNewsServerError(err));
    }
  }

  const newscardlistContainerRef = useRef();

  useEffect(() => {
    if (!newscardlistContainerRef.current.classList.contains('extendContainerAnimation') && startLoading) {
      newscardlistContainerRef.current.classList.add('extendContainerAnimation');
    }
  }, [startLoading]);

  useEffect(() => {
    if (cards.length !== 0) {
      setIsCardsLoaded(true);
    }
  }, []);

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
      <div ref={newscardlistContainerRef} className={`${classNameColorBackground}`}>
        {(startLoading || isCardsLoaded) && (
          <MainNewsCardList
            mainPage
            cards={cards}
            startLoading={startLoading}
            isCardsLoaded={isCardsLoaded}
            emptyQuery={emptyQuery}
            newsServerError={newsServerError}
            onBookmarkClikToSave={onBookmarkClikToSave}
            onBookmarkClikToDelete={onBookmarkClikToDelete}
            onLoginClick={onLoginClick}
          />
        )}
      </div>

      <About />
    </>
  );
}

export default Main;
