import React, {
  useState,
  useContext,
} from 'react';
import './SavedNews.css';
import Header from '../Header/Header';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import CurrentSavedCardsContext from '../../context/CurrentSavedCardsContext';
import getCardId from '../../utils/getCardId';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews({
  savedNewsPage,
  onLoginClick,
  isPopupOpen,
  onLogoutClick,
  classNameColorBackground,
  onTrashClick,
}) {
  const savedNewsCards = useContext(CurrentSavedCardsContext);
  const [startDisappear, setStartDisappear] = useState(false);

  function handleTrashCkick(card) {
    setStartDisappear(true);
    const cardId = getCardId(savedNewsCards, card);
    onTrashClick({ cardId, setStartDisappear });
  }

  return (
    <>
      <Header
        savedNewsPage={savedNewsPage}
        onLoginClick={onLoginClick}
        onLogoutClick={onLogoutClick}
        isPopupOpen={isPopupOpen}
      />
      <SavedNewsHeader
        cards={savedNewsCards}
        disappear={startDisappear}
      />
      <div className={`${classNameColorBackground} section savednews appearAnimationDelay`}>
        <NewsCardList
          cards={savedNewsCards}
          onTrashClick={handleTrashCkick}
          disappear={startDisappear}
        />
      </div>
    </>
  );
}

export default SavedNews;
