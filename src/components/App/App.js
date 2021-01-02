import './App.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Main from '../Main/Main';
import Footer from '../Footer/Footer'

function App() {
  return (
    <div className='page'>
      <div className='page__backgrount-container'>
        <Header />
        <SearchForm />
      </div>
      <Main />
      <Footer />

    </div>
  )
}

export default App;
