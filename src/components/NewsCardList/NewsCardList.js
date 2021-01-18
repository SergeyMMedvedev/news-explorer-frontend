import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import {
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';

import cardSwitchAnimation from '../../utils/switchAnimation';
import { CurrentMaxWidthContext } from '../../context/CurrentMaxWidthContext';

function NewsCardList({ mainPage, cards, onDelete, disappear }) {

  const maxWidth = useContext(CurrentMaxWidthContext);

  const [mainPageCards, setMainPageCards] = useState([]);
  const [newsCardListHeight, setNewsCardListHeight] = useState('auto');
  const [minSowCardIndex, setMinSowCardIndex] = useState(0);
  const [maxSowCardIndex, setMaxSowCardIndex] = useState(3);

  useEffect(() => {
    if (cards.length > 3) {

      for (let i = 3; i < cards.length; i++) {
        cards[i].invisible = true
      }

      setMainPageCards(cards)
    } else {
      setMainPageCards(cards)
    }
  }, [])

  const newsCardListRef = useRef();
  const newsCardListSectionRef = useRef();

  function showMoreCards() {
    console.log('showMoreCards');
    console.log(newsCardListRef.current.children);
    // var arrCards = Array.prototype.slice.call( newsCardListRef.current.children )
    // arrCards.slice(minSowCardIndex,maxSowCardIndex).forEach((card) => {
    //   card.classList.add('newscard_show')
    // });

    if (maxWidth <= 680) {
      setMinSowCardIndex(minSowCardIndex + 1)
      setMaxSowCardIndex(maxSowCardIndex + 1)
    } else {
      setMinSowCardIndex(minSowCardIndex + 3)
      setMaxSowCardIndex(maxSowCardIndex + 3)
    }



    // newsCardListSectionRef.current.scrollIntoView({
    //   behavior: "smooth",
    //   block:   "end",
    // })
  }

  useEffect(() => {
    var arrCards = Array.prototype.slice.call(newsCardListRef.current.children)
    // arrCards.slice(minSowCardIndex, maxSowCardIndex).forEach((card) => {
    //   card.classList.add('newscard_show')
    // });

    const newCards = arrCards.slice(minSowCardIndex, maxSowCardIndex)
    console.log(newCards)
    if (newCards.length !== 0) {
      newCards[0] && newCards[0].classList.add('newscard_show')
      newCards[1] && newCards[1].classList.add('newscard_show', 'newscard_show-delay1')
      newCards[2] && newCards[2].classList.add('newscard_show', 'newscard_show-delay2')
    }

    if (mainPage && minSowCardIndex > 0) {
      newsCardListSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      })
    }
  }, [minSowCardIndex, maxSowCardIndex])


  useEffect(()=> {
    // console.log('subtitleRef.current', subtitleRef.current)
    if (newsCardListRef.current) {
      if (disappear) {
        newsCardListRef.current.classList.add('disappearAnimation')
        newsCardListRef.current.classList.remove('appearAnimation')

      } else {
        newsCardListRef.current.classList.remove('disappearAnimation')
        newsCardListRef.current.classList.add('appearAnimation')
      }
    }
  }, [disappear])




  return (
    <section ref={newsCardListSectionRef} className='section newscardlist'>
      {mainPage && <h2 className='newscardlist__title section-title'>Результаты поиска</h2>}
      {/* <ul ref={newsCardListRef} className={cardSwitchAnimation((mainPage ? mainPageCards : cards), 'newscardlist__elements')}> */}
      <ul ref={newsCardListRef} className='newscardlist__elements appearAnimation'>
        {(mainPage ? mainPageCards : cards).map((card, i) => (
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
            onDelete={onDelete}
            card={card}
            cardHiddenClass={card.invisible && mainPage}
          />
        ))}
      </ul>
      {mainPage && <button onClick={showMoreCards} className='newscardlist__show-more-button'>Показать еще</button>}
    </section>


  )
}

export default NewsCardList;