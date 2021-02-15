import React, {
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import './NewsCardList.css';
import '../appearAnimation/appearAnimation.css';
import NewsCard from '../NewsCard/NewsCard';
import CurrentMaxWidthContext from '../../context/CurrentMaxWidthContext';
import Preloader from '../Preloader/Preloader';

function NewsCardList({
  mainPage,
  cards,
  startLoading,
  isCardsLoaded,
  emptyQuery,
  serverError,
  onBookmarkClikToSave,
  onBookmarkClikToDelete,
  onTrashClick,
  disappear,
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

  function getBadResult(empty, error) {
    if (empty) {
      return 'Нужно ввести ключевое слово';
    }
    if (error) {
      return 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
    }
    return 'К сожалению по вашему запросу ничего не найдено.';
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

  useEffect(() => {
    if (newsCardListRef.current) {
      if (disappear) {
        newsCardListRef.current.classList.add('disappearAnimation');
        newsCardListRef.current.classList.remove('appearAnimation');
      } else {
        newsCardListRef.current.classList.remove('disappearAnimation');
        newsCardListRef.current.classList.add('appearAnimation');
      }
    }
  }, [disappear]);

  function renderNewsCardListElements() {
    if (startLoading) {
      return <Preloader />;
    }
    if (!mainPage) {
      return (
        <ul ref={newsCardListRef} className="newscardlist__elements appearAnimation">
          {cards.map((card) => (
            <NewsCard
              key={card.link}
              mainPage={mainPage}
              pubDate={card.date}
              image={card.image}
              title={card.title}
              text={card.text}
              source={card.source}
              url={card.link}
              keyword={card.keyword}
              card={card}
              onTrashClick={onTrashClick}
            />
          ))}
        </ul>
      );
    }
    if (isCardsLoaded && cards.length > 0) {
      return (
        <>
          <h2 className="newscardlist__title section-title">Результаты поиска</h2>
          <ul ref={newsCardListRef} className="newscardlist__elements appearAnimation">
            {mainPageCards.map((card) => (
              <NewsCard
                key={card.url}
                mainPage={mainPage}
                pubDate={card.publishedAt}
                image={card.urlToImage}
                title={card.title}
                text={card.description}
                source={card.source.name}
                url={card.url}
                keyword={card.keyword}
                card={card}
                onBookmarkClikToSave={onBookmarkClikToSave}
                onBookmarkClikToDelete={onBookmarkClikToDelete}
                onLoginClick={onLoginClick}
              />
            ))}
          </ul>
          {(maxShowCardIndex < cards.length) && <button type="button" onClick={showMoreCards} className="newscardlist__show-more-button">Показать еще</button>}
        </>
      );
    }
    return (
      <div className="appearAnimation">
        <div className="newscardlist__not-found-picture" />
        <p className="newscardlist__not-found-title">Ничего не найдено</p>
        <p className="newscardlist__not-found-text">{getBadResult(emptyQuery, serverError)}</p>
      </div>
    );
  }

  return (

    <section ref={newsCardListSectionRef} className={`section newscardlist ${!mainPage ? 'newscardlist_saved' : ''}`}>
      {renderNewsCardListElements()}
    </section>
  );
}

export default NewsCardList;
