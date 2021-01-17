import './SavedNews.css';
import Header from '../Header/Header';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import { 
  useState, 
  useEffect
} from 'react';

function SavedNews({ savedNewsTheme, onLoginClick, cards, isPopupOpen }) {
  

  const [savedNewsCards, setSavedNewsCards] = useState(cards);
  const [savedNewsCardsLength, setSavedNewsCardsLength] = useState(cards.length);

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
    <>
      <Header
        savedNewsTheme={savedNewsTheme}
        onLoginClick={onLoginClick}
        isPopupOpen={isPopupOpen}
      />
      <SavedNewsHeader
        cards={savedNewsCards}
      />
      <NewsCardList
        cards={savedNewsCards}
        onDelete={handleNewsCardDelete}
      />

    </>
  )
}

export default SavedNews;
