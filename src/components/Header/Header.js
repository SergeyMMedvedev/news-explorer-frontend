import './Header.css';
import Navigation from '../Navigation/Navigation';
import { useContext, useState } from 'react';
import { CurrentMaxWidthContext } from '../../context/CurrentMaxWidthContext';
import ExtendButton from '../svg/ExtendButton';
import ExtendButtonClose from '../svg/ExtendButtonClose';

function Header({ savedNewsTheme, onLoginClick, isPopupOpen }) {

  const maxWidth = useContext(CurrentMaxWidthContext);

  const popupOpen = (isPopupOpen && maxWidth <= 480) ? ' header_popupOpen' : '';

  const [isExtend, setIsExtend] = useState(false);
  const headerExtend = isExtend ? ' header_extend' : '';
  const headerTheme = (savedNewsTheme && (!isExtend || maxWidth > 320)) ? ' saved-news-theme' : '';

  function handleExtend() {
    setIsExtend(!isExtend)
  }

  return (
    <>
      <div className={'section header' + headerTheme + headerExtend + popupOpen}>
        <h1 className={'header__title' + headerTheme}>News Explorer</h1>
        {maxWidth >= 480
          ?
          <div className='header__navigation-container'>
            < Navigation
              onLoginClick={onLoginClick}
              savedNewsTheme={savedNewsTheme}
            />
          </div>
          :
          <>
            <div onClick={handleExtend} className={`header__navigation-extend-button ${isExtend && 'header__navigation-extend-button_open'}`}>
              {isExtend ?
                <ExtendButtonClose 
                  
                />
                :
                <ExtendButton 
                  darkTheme={savedNewsTheme}
                />
              }
            </div>
            <div className={`header__navigation-container${isExtend ? ' header__navigation-container_mobile-open' : ''}`}>
              {isExtend &&

                <Navigation
                  onLoginClick={onLoginClick}
                  savedNewsTheme={savedNewsTheme}
                />

              }
            </div>
          </>
        }
      </div>
      <div className={`header__extend-background ${(isExtend && maxWidth <= 320) ? 'header__extend-background_active' : ''}`}></div>
    </>
  )
}

export default Header;