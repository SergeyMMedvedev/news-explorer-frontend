import './Header.css';
import Navigation from '../Navigation/Navigation';
import { useContext, useState } from 'react';
import { CurrentMaxWidthContext } from '../../context/CurrentMaxWidthContext';

function Header({ savedNewsTheme, onLoginClick }) {

  const maxWidth = useContext(CurrentMaxWidthContext);
  const headerTheme = savedNewsTheme ? ' saved-news-theme' : '';

  const [isExtend, setIsExtend] = useState(false);
  const headerExtend = isExtend ? ' header_extend' : '';

  function handleExtend() {
    setIsExtend(!isExtend)
  }

  function renderNavigation() {

    return (setTimeout(() => {
      < Navigation
        onLoginClick={onLoginClick}
        savedNewsTheme={savedNewsTheme}
      />
    }, 500)

    )

  }



  return (
    <>
      <div className={'section header' + headerTheme + headerExtend}>
        <h1 className={'header__title' + headerTheme}>News Explorer</h1>
        {maxWidth > 480
          ?
          <div className='header__navigation-container'>
            < Navigation
              onLoginClick={onLoginClick}
              savedNewsTheme={savedNewsTheme}
            />
          </div>
          :
          <>
            <div onClick={handleExtend} className={`header__navigation-extend-button ${isExtend && 'header__navigation-extend-button_open'}`}></div>
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
      {/* {
        isExtend && */}
      <div className={`header__extend-background ${isExtend && 'header__extend-background_active'}`}></div>
      {/* } */}
    </>
  )
}

export default Header;