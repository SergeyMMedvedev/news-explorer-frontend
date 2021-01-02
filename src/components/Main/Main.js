import './Main.css';
// import SearchForm from '../SearchForm/SearchForm';
import NewCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';

function Main() {
  return (
    <main className='section'>
      <NewCardList />
      <About />

    </main>
  )
}

export default Main;
