import React, { useState, useEffect } from 'react';
import './App.css';
import {
  Route,
  Switch,
  Redirect,
  useHistory,
} from 'react-router-dom';

import CurrentMaxWidthContext from '../../context/CurrentMaxWidthContext';
import CurrentSavedCardsContext from '../../context/CurrentSavedCardsContext';
import CurrentUserContext from '../../context/CurrentUserContext';

import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import PopupLogin from '../PopupLogin/PopupLogin';
import PopupRegister from '../PopupRegister/PopupRegister';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import setMediaQuery from '../../utils/setMediaQuery';
import auth from '../../utils/Auth';
import mainApi from '../../utils/MainApi';
import { clearNewscardsFromLocalStorage, clearUserFromLocalStorage } from '../../utils/clearLocalStorage';

function App() {
  const [isOpenPopupLogin, setIsOpenPopupLogin] = useState(false);
  const [isOpenPopupRegister, setIsOpenPopupRegister] = useState(false);
  const [isOpenInfoTooltip, setIsOpenInfoTooltip] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [maxWidth, setMaxWidth] = useState(null);
  const [currentSavedCards, setCurrentSavedCards] = useState([]);
  const [logginError, setLogginError] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const history = useHistory();

  window.onresize = () => {
    setMediaQuery(window.innerWidth, setMaxWidth);
  };

  useEffect(() => {
    setMediaQuery(window.innerWidth, setMaxWidth);
  }, []);

  useEffect(() => {
    if (history.location.state) {
      if (history.location.state.noAuthRedirect && !localStorage.getItem('jwt')) {
        setIsOpenPopupLogin(true);
      }
    }
  }, []);

  function closeAllPopups() {
    setIsOpenPopupLogin(false);
    setIsOpenPopupRegister(false);
    setIsOpenInfoTooltip(false);
    setLogginError('');
    setRegistrationError('');
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

  function handleRegistrationClick() {
    setIsOpenPopupRegister(true);
  }

  function handleRegistrationSubmit(email, password, name, clearFields) {
    auth.register(email, password, name)
      .then(() => {
        setIsOpenInfoTooltip(true);
        // localStorage.setItem('email', email);
        // localStorage.setItem('password', password);
        localStorage.setItem('username', name);
        clearFields();
        clearNewscardsFromLocalStorage();
        closeAllPopups();
      })
      .catch((e) => {
        setRegistrationError(e);
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

  function handleLoginClick() {
    setIsOpenPopupLogin(true);
  }

  function handleLoginSubmit(email, password) {
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          auth.getContent(data.token).then((user) => {
            const jwt = data.token;
            localStorage.setItem('jwt', jwt);
            mainApi.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
            setCurrentUser({
              email: user.email,
              name: user.name,
            });
            closeAllPopups();
          });
        }
      })
      .catch((e) => {
        setLogginError(e);
      });
  }

  function handleLogoutClick() {
    setCurrentUser({});
    clearUserFromLocalStorage();
    clearNewscardsFromLocalStorage();
    history.replace('/');
    window.location.assign('/');
  }

  function getSavedCards(setSaveIconClassName, className) {
    mainApi.getArticles()
      .then((articles) => {
        setCurrentSavedCards(articles);
        setSaveIconClassName(className);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleNewsCardDelete(cardId, setSaveIconClassName, className) {
    mainApi.deleteArticle(cardId)
      .then(() => {
        getSavedCards(setSaveIconClassName, className);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (currentUser.name) {
      mainApi.getArticles()
        .then((articles) => {
          setCurrentSavedCards(articles);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentUser]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentMaxWidthContext.Provider value={maxWidth}>
          <CurrentSavedCardsContext.Provider value={currentSavedCards}>
            <Switch>

              <Route exact path="/">
                <Main
                  onLoginClick={handleLoginClick}
                  onLogoutClick={handleLogoutClick}
                  isPopupOpen={isOpenPopupLogin || isOpenPopupRegister || isOpenInfoTooltip}
                  onBookmarkClikToSave={getSavedCards}
                  onBookmarkClikToDelete={handleNewsCardDelete}
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
                isPopupOpen={isOpenPopupLogin || isOpenPopupRegister || isOpenInfoTooltip}
                classNameColorBackground="page__newscardlist-container"
                onTrashClick={handleNewsCardDelete}
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
              logginError={logginError}
            />

            <PopupRegister
              isOpen={isOpenPopupRegister}
              onClose={closeAllPopups}
              onSwitchPopupClick={handleLoginClick}
              onSubmit={handleRegistrationSubmit}
              registrationError={registrationError}
            />

            <InfoTooltip
              isOpen={isOpenInfoTooltip}
              onClose={closeAllPopups}
              onSwitchPopupClick={handleLoginClick}
            />

            <Footer />
          </CurrentSavedCardsContext.Provider>
        </CurrentMaxWidthContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
