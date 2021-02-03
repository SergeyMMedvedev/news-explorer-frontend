import React, { useEffect, useRef } from 'react';
import './SavedNewsHeader.css';
import '../appearAnimation/appearAnimation.css';
import { getKeyWords, getNumberForSavedNews } from '../../utils/getEndingsForNumbers';

function SavedNewsHeader({ cards, disappear }) {
  const subtitleRef = useRef();
  const keywordsRef = useRef();

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
    <div className="section saved-news-header">
      <h2 className="saved-news-header__title">Сохранненные статьи</h2>
      <h3 ref={subtitleRef} className="section-title saved-news-header__subtitle appearAnimation">
        Сергей, у вас
        {` ${cards.length}` || ' нет'}
        <br />
        {getNumberForSavedNews(cards.length)}
      </h3>
      <p ref={keywordsRef} className="saved-news-header__keywords appearAnimation">
        {getKeyWords(cards)}
      </p>
    </div>
  );
}

export default SavedNewsHeader;
