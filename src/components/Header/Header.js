import React, { useContext, useState, useEffect } from 'react';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import CurrentMaxWidthContext from '../../context/CurrentMaxWidthContext';
import CurrentUserContext from '../../context/CurrentUserContext';
import ExtendButton from '../svg/ExtendButton';

function Header({
  savedNewsPage,
  onLoginClick,
  isPopupOpen,
  onLogoutClick,
}) {
  const maxWidth = useContext(CurrentMaxWidthContext);
  const currenUser = useContext(CurrentUserContext);

  const headerPopupOpenStyle = (isPopupOpen && maxWidth <= 480) ? ' header_popupOpen' : '';

  const [isExtend, setIsExtend] = useState(false);
  const headerExtend = isExtend ? ' header_extend' : '';
  const headerTheme = (savedNewsPage && (!isExtend || maxWidth > 320)) ? 'header_darktheme' : '';

  function handleExtend() {
    setIsExtend(!isExtend);
  }

  useEffect(() => {
    setIsExtend(false);
  }, [maxWidth]);

  return (
    <>
      <header className={`section header ${headerTheme} ${headerExtend} ${headerPopupOpenStyle}`}>
        <h1 className={`header__title ${headerTheme}`}>News Explorer</h1>
        {maxWidth >= 480
          ? (
            <div className="header__navigation-container">
              <Navigation
                onLoginClick={onLoginClick}
                onLogoutClick={onLogoutClick}
                savedNewsPage={savedNewsPage}
              />
            </div>
          )
          : (
            <>
              <button type="button" onClick={handleExtend} className="header__navigation-extend-button">
                <ExtendButton
                  isExtend={isExtend}
                  darkTheme={savedNewsPage}
                  classNames={{
                    openedClass: 'header__svg-extend-button_opened',
                    closedClass: 'header__svg-extend-button_closed',
                  }}
                />
              </button>
              <div
                className={`
                  header__navigation-container 
                  ${isExtend && (!currenUser.name ? 'header__navigation-container_mobile-open-not-auth' : 'header__navigation-container_mobile-open')}  
                `}
              >
                {isExtend && (
                  <Navigation
                    onLoginClick={onLoginClick}
                    onLogoutClick={onLogoutClick}
                    savedNewsPage={savedNewsPage}
                  />
                )}
              </div>
            </>
          )}
      </header>
      <div className={`header__extend-background ${(isExtend && maxWidth <= 320) ? 'header__extend-background_active' : ''}`} />
    </>
  );
}

export default Header;
