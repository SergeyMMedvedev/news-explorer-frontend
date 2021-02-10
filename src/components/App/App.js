import React, { useState, useEffect } from 'react';
import './App.css';
import {
  Route,
  Switch,
  useHistory,
  Redirect,
} from 'react-router-dom';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import auth from '../../utils/Auth';

function App() {
  const [isOpenPopupLogin, setIsOpenPopupLogin] = useState(false);
  const [isOpenPopupRegister, setIsOpenPopupRegister] = useState(false);
  const [isOpenInfoTooltip, setIsOpenInfoTooltip] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [maxWidth, setMaxWidth] = useState();
  // const [loggedIn, setLoggedIn] = useState(null);
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
    localStorage.removeItem('jwt');
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

  function handleLoginSubmit(email, password) {
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          const jwt = data.token;
          console.log(jwt);

          localStorage.setItem('jwt', jwt);
          // api.headers.authorization = `Bearer ${localStorage.getItem('jwt')}`;
          // setLoggedIn(true);
          setCurrentUser({
            email,
            name: localStorage.getItem('username'),
          });
          console.log(localStorage.getItem('username'));
        }
      })
      .catch((e) => {
        console.log(e);
      });
    closeAllPopups();
  }

  function handleRegistrationSubmit(email, password, name, clearFields) {
    auth.register(email, password, name)
      .then(() => {
        closeAllPopups();
        setIsOpenInfoTooltip(true);
        // localStorage.setItem('email', email);
        // localStorage.setItem('password', password);
        localStorage.setItem('username', name);
        clearFields();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser({
              email: res.email,
              name: res.name,
            });
            // history.push('/');
          }
        })
        .catch((e) => console.log(e));
    } else {
      localStorage.removeItem('jwt');
      setCurrentUser({});
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

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
                classNameImageBackgroun="page__header-searchform-container"
                classNameColorBackground="page__newscardlist-container"
              />
            </Route>

            <ProtectedRoute
              path="/saved-news"
              component={SavedNews}
              savedNewsPage
              onLoginClick={handleLoginClick}
              onLogoutClick={handleLogoutClick}
              cards={savedCards}
              isPopupOpen={isOpenPopupLogin || isOpenPopupRegister || isOpenInfoTooltip}
              classNameColorBackground="page__newscardlist-container"
            />

            <Route>
              <Redirect to="/" />
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
