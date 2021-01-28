import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Switch, useHistory } from 'react-router-dom';
import CurrentMaxWidthContext from '../../context/CurrentMaxWidthContext';
import CurrentUserContext from '../../context/CurrentUserContext';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import PopupLogin from '../PopupLogin/PopupLogin';
import PopupRegister from '../PopupRegister/PopupRegister';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import setMediaQuery from '../../utils/setMediaQuery';
import { cards, savedCards } from '../../db/cards';

function App() {
  const [isOpenPopupLogin, setIsOpenPopupLogin] = useState(false);
  const [isOpenPopupRegister, setIsOpenPopupRegister] = useState(false);
  const [isOpenInfoTooltip, setIsOpenInfoTooltip] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [maxWidth, setMaxWidth] = useState();
  const history = useHistory();

  window.onresize = () => {
    setMediaQuery(window.innerWidth, setMaxWidth);
  };

  useEffect(() => {
    setMediaQuery(window.innerWidth, setMaxWidth);
  }, []);

  function handleLoginClick() {
    setIsOpenPopupLogin(true);
  }

  function handleLogoutClick() {
    setCurrentUser({});
    history.push('/');
  }

  function handleRegistrationClick() {
    setIsOpenPopupRegister(true);
  }

  function closeAllPopups() {
    setIsOpenPopupLogin(false);
    setIsOpenPopupRegister(false);
    setIsOpenInfoTooltip(false);
  }

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, []);

  function handleLoginSubmit(email) {
    setCurrentUser({
      email,
      name: email,
    });
    closeAllPopups();
  }

  function handleRegistrationSubmit(email, password, name) {
    console.log(email, password, name);
    closeAllPopups();
    setIsOpenInfoTooltip(true);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentMaxWidthContext.Provider value={maxWidth}>
          <Switch>

            <Route exact path="/">
              <Main
                onLoginClick={handleLoginClick}
                onLogoutClick={handleLogoutClick}
                cards={cards}
                isPopupOpen={isOpenPopupLogin || isOpenPopupRegister || isOpenInfoTooltip}
              />
            </Route>

            <Route path="/saved-news">
              <SavedNews
                savedNewsTheme
                onLoginClick={handleLoginClick}
                onLogoutClick={handleLogoutClick}
                cards={savedCards}
                isPopupOpen={isOpenPopupLogin || isOpenPopupRegister || isOpenInfoTooltip}
              />
            </Route>

          </Switch>

          <PopupLogin
            isOpen={isOpenPopupLogin}
            onClose={closeAllPopups}
            onSwitchPopupClick={handleRegistrationClick}
            onSubmit={handleLoginSubmit}
          />

          <PopupRegister
            isOpen={isOpenPopupRegister}
            onClose={closeAllPopups}
            onSwitchPopupClick={handleLoginClick}
            onSubmit={handleRegistrationSubmit}
          />

          <InfoTooltip
            isOpen={isOpenInfoTooltip}
            onClose={closeAllPopups}
            onSwitchPopupClick={handleLoginClick}
          />

          <Footer />
        </CurrentMaxWidthContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
