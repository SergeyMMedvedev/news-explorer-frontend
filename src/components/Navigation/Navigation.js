import './Navigation.css';
import '../appearAnimation/appearAnimation.css';
import { NavLink } from 'react-router-dom';
import React, { useContext } from 'react';
import CurrentMaxWidthContext from '../../context/CurrentMaxWidthContext';
import CurrentUserContext from '../../context/CurrentUserContext';
import LoginButton from '../ui/LoginButton/LoginButton';

function Navigation({
  savedNewsPage,
  onLoginClick,
  onLogoutClick,
}) {
  const currenUser = useContext(CurrentUserContext);
  const maxWidth = useContext(CurrentMaxWidthContext);
  const navigationTheme = (savedNewsPage && maxWidth > 320) ? 'navigation__link_darktheme' : '';

  return (
    <nav className="navigation__container">
      <NavLink exact to="/" activeClassName="navigation__link_active" className={`navigation__link ${navigationTheme}`}>Главная</NavLink>
      { currenUser.name && <NavLink to="/saved-news" activeClassName="navigation__link_active" className={`navigation__link ${navigationTheme}`}>Сохраненные статьи</NavLink>}
      <LoginButton
        onLoginClick={onLoginClick}
        onLogoutClick={onLogoutClick}
        savedNewsPage={savedNewsPage}
        className="navigation__button"
      />
    </nav>
  );
}

export default Navigation;
