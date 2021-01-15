import './SavedNews.css';
import Header from '../Header/Header';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList'

function SavedNews({ savedNewsTheme, cards }) {
  console.log(savedNewsTheme)
  return (
    <>
      <Header
        savedNewsTheme
      />
      <SavedNewsHeader
        cards={cards}
      />
      <NewsCardList
        cards={cards}
      />

    </>
  )
}

export default SavedNews;
