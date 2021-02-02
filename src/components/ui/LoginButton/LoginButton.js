import React, { useContext } from 'react';
import CurrentUserContext from '../../../context/CurrentUserContext';
import CurrentMaxWidthContext from '../../../context/CurrentMaxWidthContext';
import './LoginButton.css';
import Logout from '../../svg/Logout';

function LoginButton({
  onLogoutClick,
  onLoginClick,
  savedNewsPage,
  className,
}) {
  const currenUser = useContext(CurrentUserContext);
  const maxWidth = useContext(CurrentMaxWidthContext);
  const navigationTheme = (savedNewsPage && maxWidth > 320) ? 'darktheme' : '';
  const navigationButtonTheme = (savedNewsPage && maxWidth > 320) ? 'darktheme_hover' : '';

  return (
    <button type="button" onClick={currenUser.name ? onLogoutClick : onLoginClick} className={`login-button ${className} ${navigationTheme} ${navigationButtonTheme} ${maxWidth < 480 && 'appearAnimationDelay'}`}>
      {currenUser.name
        ? (
          <>
            <span className="login-button__text">{currenUser.name}</span>
            <Logout
              className="login-button__icon"
              savedNewsPage={savedNewsPage}
            />
          </>
        )
        : (
          <span className="login-button__text">
            Авторизоваться
          </span>
        )}
    </button>
  );
}

export default LoginButton;
