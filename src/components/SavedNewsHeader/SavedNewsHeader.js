import './SavedNewsHeader.css';
import { getKeyWords, getNumberForSavedNews } from '../../utils/getEndingsForNumbers';
import cardSwitchAnimation from '../../utils/switchAnimation';
import { useEffect, useRef } from 'react';

function SavedNewsHeader({ cards, disappear }) {

  const subtitleRef = useRef()
  const keywordsRef = useRef()

  useEffect(()=> {
    // console.log('subtitleRef.current', subtitleRef.current)
    if (subtitleRef.current) {
      if (disappear) {
        subtitleRef.current.classList.add('disappearAnimation')
        keywordsRef.current.classList.add('disappearAnimation')
        subtitleRef.current.classList.remove('appearAnimation')
        keywordsRef.current.classList.remove('appearAnimation')
      } else {
        subtitleRef.current.classList.add('appearAnimation')
        keywordsRef.current.classList.add('appearAnimation')
        subtitleRef.current.classList.remove('disappearAnimation')
        keywordsRef.current.classList.remove('disappearAnimation')
      }
    }
  }, [disappear])

  return (
    <div className='section saved-news-header'>
      <h2 className='saved-news-header__title'>Сохранненные статьи</h2>
      {/* <h3 ref={subtitleRef} className={`section-title saved-news-header__subtitle ${startFading ? 'fading' : cardSwitchAnimation(cards, 'saved-news-header__subtitle')} `}>Сергей, у вас {cards.length || 'нет'}<br></br> {getNumberForSavedNews(cards.length)}</h3> */}
      <h3 ref={subtitleRef} className='section-title saved-news-header__subtitle appearAnimation'>Сергей, у вас {cards.length || 'нет'}<br></br> {getNumberForSavedNews(cards.length)}</h3>
      {/* <p ref={keywordsRef} className={cardSwitchAnimation(cards, 'saved-news-header__keywords')}>{getKeyWords(cards)}</p> */}
      <p ref={keywordsRef} className='saved-news-header__keywords appearAnimation'>{getKeyWords(cards)}</p>
    </div>
  )
}

export default SavedNewsHeader;
