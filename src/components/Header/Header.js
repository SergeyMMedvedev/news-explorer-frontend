import './Header.css';
import Navigation from '../Navigation/Navigation'

function Header() {
  return (
    <div className='header header_main-theme'>
      <h1 className='header__title'>News Explorer</h1>
      <div className='header__navigation-container'>
        < Navigation />
      </div>
    </div>
  )
}

export default Header;