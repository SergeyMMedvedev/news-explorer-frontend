import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { CurrentMaxWidthContext } from '../../context/CurrentMaxWidthContext';

function Navigation({ savedNewsTheme, onLoginClick }) {

  const maxWidth = useContext(CurrentMaxWidthContext)
  const navigationTheme = (savedNewsTheme && maxWidth > 320) ? ' saved-news-theme' : '';
  const navigationButtonTheme = (savedNewsTheme && maxWidth > 320) ? ' saved-news-theme_hover' : '';
  
  return (
    <nav className='navigation__container'>

      <NavLink exact to='/' activeClassName='navigation__link_active' className={'navigation__link' + navigationTheme}>Главная</NavLink>
      <NavLink to='/saved-news' activeClassName='navigation__link_active' className={'navigation__link' + navigationTheme}>Сохраненные статьи</NavLink>

      <button onClick={onLoginClick} className={'navigation__button' + navigationTheme + navigationButtonTheme}>Авторизоваться</button>
    </nav>

  );
}

export default Navigation;