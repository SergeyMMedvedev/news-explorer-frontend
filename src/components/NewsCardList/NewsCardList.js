import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import { 
  useState,
  useRef, 
  useEffect
} from 'react';

function NewsCardList({ mainPage, cards,}) {

  const [mainPageCards, setMainPageCards] = useState([]);
  const [savedNewsCards, setSavedNewsCards] = useState(cards);
  const [savedNewsCardsLength, setSavedNewsCardsLength] = useState(cards.length);

  useEffect(()=> {
    if (cards.length > 3) {
      setMainPageCards(cards.slice(0, 3))
    } else {
      setMainPageCards(cards)
    }
  }, [])

  function showMoreCards() {
    if ((mainPageCards.length + 3) <= cards.length) {
      setMainPageCards(cards.slice(0, mainPageCards.length + 3))
    } else {
      setMainPageCards(cards)
    }
  }

  function handleNewsCardDelete(card) {
    console.log(savedNewsCards.indexOf(card))
    console.log('before', savedNewsCards)
    // savedNewsCards.splice(savedNewsCards.indexOf(card), 1)
    const delcard = savedNewsCards.splice(savedNewsCards.indexOf(card), 1)
    console.log('delcard', delcard)
    const newCards = savedNewsCards
    console.log('newCards', newCards)
    setSavedNewsCards(savedNewsCards)
    setSavedNewsCardsLength(savedNewsCards.length)
  }

  return (
    <section className='section newscardlist'>
      {mainPage && <h2 className='newscardlist__title section-title'>Результаты поиска</h2>}
      <ul className='newscardlist__elements'>
        {(mainPage ? mainPageCards : savedNewsCards).map((card, i) => (
          <NewsCard
            key={i}
            mainPage={mainPage}
            pubDate={card.publishedAt}
            image={card.urlToImage}
            title={card.title}
            text={card.description}
            source={card.source.name}
            url={card.url}
            keyword={card.tag}
            onDelete={handleNewsCardDelete}
            card={card}
            savedNewsCards={savedNewsCards}
          />
        ))}
      </ul>
      {mainPage && <button onClick={showMoreCards} className='newscardlist__show-more-button'>Показать еще</button>}
    </section>

  )
}

export default NewsCardList;