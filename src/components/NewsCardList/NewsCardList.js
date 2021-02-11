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
  disappear,
  onDelete,
  startLoading,
  isCardsLoaded,
  emptyQuery,
  serverError,
}) {
  const maxWidth = useContext(CurrentMaxWidthContext);

  const [mainPageCards, setMainPageCards] = useState([]);
  const [minShowCardIndex, setMinShowCardIndex] = useState(localStorage.getItem('minShowCardIndex') || 0);
  const [maxShowCardIndex, setMaxShowCardIndex] = useState(localStorage.getItem('maxShowCardIndex') || 3);
  // const [minShowCardIndex, setMinShowCardIndex] = useState(0);
  // const [maxShowCardIndex, setMaxShowCardIndex] = useState(3);

  console.log('minShowCardIndex', minShowCardIndex);
  console.log('maxShowCardIndex', maxShowCardIndex);

  useEffect(() => {
    if (cards) {
      if (cards.length > 3) {
        for (let i = maxShowCardIndex; i < cards.length; i += 1) {
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
      const newMinShowCardIndex = +minShowCardIndex + 1;
      const newMaxShowCardIndex = +maxShowCardIndex + 1;
      setMinShowCardIndex(newMinShowCardIndex);
      localStorage.setItem('minShowCardIndex', newMinShowCardIndex);
      setMaxShowCardIndex(newMaxShowCardIndex);
      localStorage.setItem('maxShowCardIndex', newMaxShowCardIndex);
    } else {
      const newMinShowCardIndex = +minShowCardIndex + 3;
      const newMaxShowCardIndex = +maxShowCardIndex + 3;
      setMinShowCardIndex(newMinShowCardIndex);
      localStorage.setItem('minShowCardIndex', newMinShowCardIndex);
      setMaxShowCardIndex(newMaxShowCardIndex);
      localStorage.setItem('maxShowCardIndex', newMaxShowCardIndex);
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
      console.log('newCards', newCards);
      if (newCards.length !== 0) {
        if (newCards[0]) {
          newCards[0].classList.add('newscard_show');
        }
        if (newCards[1]) {
          newCards[1].classList.add('newscard_show', 'newscard_show-delay1');
        }
        if (newCards[2]) {
          newCards[2].classList.add('newscard_show', 'newscard_show-delay2');
        }
      }
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

  return (
    <section ref={newsCardListSectionRef} className={`section newscardlist ${!mainPage ? 'newscardlist_saved' : ''}`}>

      {startLoading && (
        <Preloader />
      )}

      {(isCardsLoaded || !mainPage) && (
        (cards.length > 0 || !mainPage)
          ? (
            <>
              {mainPage && <h2 className="newscardlist__title section-title">Результаты поиска</h2>}
              <ul ref={newsCardListRef} className="newscardlist__elements appearAnimation">
                {(mainPage ? mainPageCards : cards).map((card, i) => (
                  <NewsCard
                    key={card._id || i}
                    mainPage={mainPage}
                    pubDate={card.publishedAt || card.date}
                    image={card.urlToImage || card.image}
                    title={card.title}
                    text={card.description || card.text}
                    source={card.source.name || card.source}
                    url={card.url || card.link}
                    keyword={card.tag}
                    onDelete={onDelete}
                    card={card}
                    cardHiddenClass={card.invisible && mainPage}
                  />
                ))}
              </ul>
              {(mainPage && (maxShowCardIndex) < cards.length) && <button type="button" onClick={showMoreCards} className="newscardlist__show-more-button">Показать еще</button>}
            </>
          )
          : (
            <div className="appearAnimation">
              <div className="newscardlist__not-found-picture" />
              <p className="newscardlist__not-found-title">Ничего не найдено</p>
              <p className="newscardlist__not-found-text">{getBadResult(emptyQuery, serverError)}</p>
            </div>
          )
      )}

    </section>
  );
}

export default NewsCardList;
