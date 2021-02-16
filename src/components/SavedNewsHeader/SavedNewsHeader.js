import React, { useEffect, useRef, useContext } from 'react';
import './SavedNewsHeader.css';
import '../appearAnimation/appearAnimation.css';
import CurrentUserContext from '../../context/CurrentUserContext';
import { getKeyWords, getNumberForSavedNews } from '../../utils/getEndingsForNumbers';

function SavedNewsHeader({ cards, disappear }) {
  const subtitleRef = useRef();
  const keywordsRef = useRef();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (subtitleRef.current) {
      if (disappear) {
        subtitleRef.current.classList.add('disappearAnimation');
        keywordsRef.current.classList.add('disappearAnimation');
        subtitleRef.current.classList.remove('appearAnimation');
        keywordsRef.current.classList.remove('appearAnimation');
      } else {
        subtitleRef.current.classList.add('appearAnimation');
        keywordsRef.current.classList.add('appearAnimation');
        subtitleRef.current.classList.remove('disappearAnimation');
        keywordsRef.current.classList.remove('disappearAnimation');
      }
    }
  }, [disappear]);

  return (
    <div className="section saved-news-header appearAnimationDelay">
      <h2 className="saved-news-header__title">Сохранненные статьи</h2>
      <h3 ref={subtitleRef} className="section-title saved-news-header__subtitle">
        {`${currentUser.name}, у вас `}
        {`${cards.length === 0 ? ' нет' : cards.length}`}
        <br />
        {getNumberForSavedNews(cards.length)}
      </h3>
      <p ref={keywordsRef} className="saved-news-header__keywords">
        {getKeyWords(cards)}
      </p>
    </div>
  );
}

export default React.memo(SavedNewsHeader);
