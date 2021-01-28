import './Navigation.css';
import { NavLink } from 'react-router-dom';
import React, { useContext } from 'react';
import CurrentMaxWidthContext from '../../context/CurrentMaxWidthContext';
import CurrentUserContext from '../../context/CurrentUserContext';
import Logout from '../svg/Logout';

function Navigation({ savedNewsTheme, onLoginClick, onLogoutClick }) {
  const currenUser = useContext(CurrentUserContext);
  const maxWidth = useContext(CurrentMaxWidthContext);
  const navigationTheme = (savedNewsTheme && maxWidth > 320) ? ' saved-news-theme' : '';
  const navigationButtonTheme = (savedNewsTheme && maxWidth > 320) ? ' saved-news-theme_hover' : '';

  return (
    <nav className="navigation__container">
      <NavLink exact to="/" activeClassName="navigation__link_active" className={`navigation__link ${navigationTheme}`}>Главная</NavLink>
      { currenUser.name && <NavLink to="/saved-news" activeClassName="navigation__link_active" className={`navigation__link ${navigationTheme}`}>Сохраненные статьи</NavLink>}

      {currenUser.name
        ? (
          <button type="button" onClick={currenUser.name ? onLogoutClick : onLoginClick} className={`navigation__button ${navigationTheme} ${navigationButtonTheme}`}>
            <>
              <span className="navigation__button-text">{currenUser.name}</span>
              <Logout
                className="navigation__button-icon"
                savedNewsTheme={savedNewsTheme}
              />
            </>
          </button>
        )
        : (
          <button type="button" onClick={currenUser.name ? onLogoutClick : onLoginClick} className={`navigation__button ${navigationTheme} ${navigationButtonTheme}`}>
            <span className="navigation__button-text">
              Авторизоваться
            </span>
          </button>
        )}
    </nav>
  );
}

export default Navigation;
