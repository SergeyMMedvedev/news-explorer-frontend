import './App.css';
import { Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { CurrentMaxWidthContext } from '../../context/CurrentMaxWidthContext';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import PopupLogin from '../PopupLogin/PopupLogin';
import PopupRegister from '../PopupRegister/PopupRegister';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

import { cards, savedCards } from '../../db/cards';

function App() {

  const [isOpenPopupLogin, setIsOpenPopupLogin] = useState(false);
  const [isOpenPopupRegister, setIsOpenPopupRegister] = useState(false);
  const [isOpenInfoTooltip, setIsOpenInfoTooltip] = useState(true);
  const [maxWidth, setMaxWidth] = useState();


  window.onresize = (evt) => {
    // let width = window.visualViewport.width
    // console.log(window.visualViewport.width)
    let width = window.innerWidth
    if (1440 <= width) {
      setMaxWidth(1440)
    } else if (1280 <= width && width < 1440 ) {
      setMaxWidth(1280)
    } else if (1024 <= width && width < 1280) {
      setMaxWidth(1024)
    } else if (680 <= width && width < 1024) {
      setMaxWidth(768)
    } else if (480 <=width && width < 680) {
      setMaxWidth(680)
    } else if (width < 480) {
      setMaxWidth(320)
    }   
  }

  useEffect(()=> {
    // let width = window.visualViewport.width
    let width = window.innerWidth
    if (1440 <= width) {
      setMaxWidth(1440)
    } else if (1280 <= width && width < 1440 ) {
      setMaxWidth(1280)
    } else if (1024 <= width && width < 1280) {
      setMaxWidth(1024)
    } else if (680 <= width && width < 1024) {
      setMaxWidth(768)
    } else if (480 <=width && width < 680) {
      setMaxWidth(680)
    } else if (width < 480) {
      setMaxWidth(320)
    }    
  }, [])




  function handleLoginClick() {
    setIsOpenPopupLogin(true)
  }

  function handleRegistrationClick() {
    setIsOpenPopupRegister(true)
  }

  function closeAllPopups() {
    setIsOpenPopupLogin(false)
    setIsOpenPopupRegister(false)
    setIsOpenInfoTooltip(false)
  }

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups()
      }
    }
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }

  }, [])

  return (
    <div className='page'>
      <CurrentMaxWidthContext.Provider value={maxWidth}>
        <Switch>

          <Route exact path='/'>
            <Main
              onLoginClick={handleLoginClick}
              cards={cards}
            />
          </Route>

          <Route path='/saved-news'>
            <SavedNews
              cards={savedCards}
              savedNewsTheme
            />
          </Route>

        </Switch>

        <PopupLogin
          isOpen={isOpenPopupLogin}
          onClose={closeAllPopups}
          onSwitchPopupClick={handleRegistrationClick}
        />

        <PopupRegister
          isOpen={isOpenPopupRegister}
          onClose={closeAllPopups}
          onSwitchPopupClick={handleLoginClick}
        />

        <InfoTooltip
          isOpen={isOpenInfoTooltip}
          onClose={closeAllPopups}
          onSwitchPopupClick={handleLoginClick}
        />




        <Footer />
      </CurrentMaxWidthContext.Provider>

    </div>
  )
}

export default App;
