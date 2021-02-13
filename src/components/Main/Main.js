import React, { useState, useEffect, useRef } from 'react';
import './Main.css';
import '../extendAnimation/extendAnimation.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import newsApi from '../../utils/NewsApi';
import getTimeInterval from '../../utils/getTimeInterval';

function Main({
  onLoginClick,
  isPopupOpen,
  onLogoutClick,
  onCardSave,
  onCardDelete,
  classNameImageBackgroun,
  classNameColorBackground,
}) {
  const [startLoading, setStartLoading] = useState(false);
  const [isCardsLoaded, setIsCardsLoaded] = useState(false);
  const [emptyQuery, setEmptyQuery] = useState(false);
  const [cards, setCards] = useState((localStorage.getItem('newscards') && JSON.parse(localStorage.getItem('newscards'))) || []);
  // const [cards, setCards] = useState([]);
  const [serverError, setServerError] = useState('');

  // console.log(localStorage.getItem('newscards'));

  function handleSearchSubmit(isKeywordValid, keyword) {
    setCards([]);
    localStorage.removeItem('newscards');
    localStorage.removeItem('minShowCardIndex');
    localStorage.removeItem('maxShowCardIndex');
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
        setCards(newsCards.articles);
        localStorage.setItem('newscards', JSON.stringify(newsCards.articles));
        console.log(newsCards);
      })
        .catch((err) => setServerError(err));
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
      <div ref={newscardlistContainerRef} className={classNameColorBackground}>
        {(startLoading || isCardsLoaded) && (
          <NewsCardList
            mainPage
            cards={cards}
            startLoading={startLoading}
            isCardsLoaded={isCardsLoaded}
            emptyQuery={emptyQuery}
            serverError={serverError}
            onCardSave={onCardSave}
            onCardDelete={onCardDelete}
          />
        )}
      </div>

      <About />
    </>
  );
}

export default Main;
