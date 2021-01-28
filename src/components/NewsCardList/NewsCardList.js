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
}) {
  const maxWidth = useContext(CurrentMaxWidthContext);

  const [mainPageCards, setMainPageCards] = useState([]);
  const [minSowCardIndex, setMinSowCardIndex] = useState(0);
  const [maxSowCardIndex, setMaxSowCardIndex] = useState(3);

  useEffect(() => {
    if (cards.length > 3) {
      for (let i = 3; i < cards.length; i += 1) {
        cards[i].invisible = true;
      }
      setMainPageCards(cards);
      // setMainPageCards([]);
    } else {
      setMainPageCards(cards);
      // setMainPageCards([]);
    }
  }, [cards]);

  const newsCardListRef = useRef();
  const newsCardListSectionRef = useRef();

  function showMoreCards() {
    if (maxWidth <= 680) {
      setMinSowCardIndex(minSowCardIndex + 1);
      setMaxSowCardIndex(maxSowCardIndex + 1);
    } else {
      setMinSowCardIndex(minSowCardIndex + 3);
      setMaxSowCardIndex(maxSowCardIndex + 3);
    }
  }

  useEffect(() => {
    if (newsCardListRef.current) {
      const arrCards = Array.prototype.slice.call(newsCardListRef.current.children);
      const newCards = arrCards.slice(minSowCardIndex, maxSowCardIndex);
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

    if (mainPage && minSowCardIndex > 0) {
      newsCardListSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [minSowCardIndex, maxSowCardIndex]);

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
        (mainPageCards.length > 0 || !mainPage)
          ? (
            <>
              {mainPage && <h2 className="newscardlist__title section-title">Результаты поиска</h2>}
              <ul ref={newsCardListRef} className="newscardlist__elements appearAnimation">
                {(mainPage ? mainPageCards : cards).map((card) => (
                  <NewsCard
                    key={card._id}
                    mainPage={mainPage}
                    pubDate={card.publishedAt}
                    image={card.urlToImage}
                    title={card.title}
                    text={card.description}
                    source={card.source.name}
                    url={card.url}
                    keyword={card.tag}
                    onDelete={onDelete}
                    card={card}
                    cardHiddenClass={card.invisible && mainPage}
                  />
                ))}
              </ul>
              {mainPage && <button type="button" onClick={showMoreCards} className="newscardlist__show-more-button">Показать еще</button>}
            </>
          )
          : (
            <>
              <div className="newscardlist__not-found-picture" />
              <p className="newscardlist__not-found-title">Ничего не найдено</p>
              <p className="newscardlist__not-found-text">К сожалению по вашему запросу ничего не найдено.</p>
            </>
          )

      )}

    </section>
  );
}

export default NewsCardList;
