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
  const [startDisappear, setStartDisappear] = useState(false);

  function handleNewsCardDelete(evt, card) {


    setStartDisappear(true)
    // let promise = new Promise(function (resolve, reject) {
    //   setTimeout(() => {
    //     resolve('done')
    //   }, 500)
    // })
    // promise.then(() => {
    //   savedNewsCards.splice(savedNewsCards.indexOf(card), 1)
    //   setSavedNewsCards(savedNewsCards)
    //   setSavedNewsCardsLength(savedNewsCards.length)
    //   setStartFading(false)
    // })

    setTimeout(() => {
      savedNewsCards.splice(savedNewsCards.indexOf(card), 1)
      setSavedNewsCards(savedNewsCards)
      setSavedNewsCardsLength(savedNewsCards.length)
      setStartDisappear(false)
    }, 400)

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
        disappear={startDisappear}
      />
      <NewsCardList
        cards={savedNewsCards}
        onDelete={handleNewsCardDelete}
        disappear={startDisappear}
      />

    </>
  )
}

export default SavedNews;
