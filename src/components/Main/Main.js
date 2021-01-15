import './Main.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';


function Main({ onLoginClick, cards, }) {

  return (
    <>
      <div className='backgrount-container'>
        <Header
          onLoginClick={onLoginClick}
        />
        <SearchForm />
      </div>

      <NewsCardList
        mainPage
        cards={cards}
      />


      <About />
    </>
  )
}

export default Main;
