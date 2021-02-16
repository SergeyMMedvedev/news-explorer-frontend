import React, {
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import './MainNewsCardList.css';
import NewsCardList from '../NewsCardList/NewsCardList';
import BadResults from '../BadResults/BadResults';
import CurrentMaxWidthContext from '../../context/CurrentMaxWidthContext';
import Preloader from '../Preloader/Preloader';

function MainNewsCardList({
  mainPage,
  cards,
  startLoading,
  isCardsLoaded,
  emptyQuery,
  newsServerError,
  onBookmarkClikToSave,
  onBookmarkClikToDelete,
  onLoginClick,
}) {
  const maxWidth = useContext(CurrentMaxWidthContext);

  const [mainPageCards, setMainPageCards] = useState([]);
  const [minShowCardIndex, setMinShowCardIndex] = useState(localStorage.getItem('minShowCardIndex') || 0);
  const [maxShowCardIndex, setMaxShowCardIndex] = useState(localStorage.getItem('maxShowCardIndex') || 3);

  useEffect(() => {
    if (cards) {
      if (cards.length > 3) {
        for (let i = +maxShowCardIndex; i < cards.length; i += 1) {
          if (cards[i]) {
            cards[i].invisible = true;
          }
        }
        setMainPageCards(cards);
      } else {
        setMainPageCards(cards);
      }
    }
  }, [cards]);

  const newsCardListRef = useRef();
  const newsCardListSectionRef = useRef();

  function showMoreCards() {
    if (maxWidth <= 680) {
      setMinShowCardIndex(+minShowCardIndex + 1);
      setMaxShowCardIndex(+maxShowCardIndex + 1);
      localStorage.setItem('minShowCardIndex', +minShowCardIndex + 1);
      localStorage.setItem('maxShowCardIndex', +maxShowCardIndex + 1);
    } else {
      setMinShowCardIndex(+minShowCardIndex + 3);
      setMaxShowCardIndex(+maxShowCardIndex + 3);
      localStorage.setItem('minShowCardIndex', +minShowCardIndex + 3);
      localStorage.setItem('maxShowCardIndex', +maxShowCardIndex + 3);
    }
  }

  useEffect(() => {
    if (newsCardListRef.current) {
      const arrCards = Array.prototype.slice.call(newsCardListRef.current.children);
      const newCards = arrCards.slice(minShowCardIndex, maxShowCardIndex);
      newCards.forEach((nawsCard) => {
        nawsCard.classList.add('newscard_show');
      });
    }

    if (mainPage && minShowCardIndex > 0) {
      newsCardListSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [minShowCardIndex, maxShowCardIndex]);

  function renderNewsCardListElements() {
    if (startLoading) return <Preloader />;
    if (isCardsLoaded && cards.length > 0) {
      return (
        <>
          <h2 className="main-newscardlist__title section-title">Результаты поиска</h2>
          <NewsCardList
            mainPage={mainPage}
            cards={mainPageCards}
            onBookmarkClikToSave={onBookmarkClikToSave}
            onBookmarkClikToDelete={onBookmarkClikToDelete}
            onLoginClick={onLoginClick}
            minShowCardIndex={minShowCardIndex}
            maxShowCardIndex={maxShowCardIndex}
            newsCardListRef={newsCardListRef}
          />
          {(maxShowCardIndex < cards.length) && <button type="button" onClick={showMoreCards} className="main-newscardlist__show-more-button">Показать еще</button>}
        </>
      );
    }
    return <BadResults emptyQuery={emptyQuery} newsServerError={newsServerError} />;
  }

  return (
    <div ref={newsCardListSectionRef} className="main-newscardlist section">
      {renderNewsCardListElements()}
    </div>
  );
}

export default MainNewsCardList;
