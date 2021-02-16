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
  const [serverError, setServerError] = useState('');
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
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('username', name);
        clearFields();
        clearNewscardsFromLocalStorage();
        closeAllPopups();
        setIsOpenInfoTooltip(true);
      })
      .catch((e) => {
        setServerError(e);
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
        .catch((e) => {
          localStorage.removeItem('jwt');
          setCurrentUser({});
          history.push('/');
          setServerError(e);
          setIsOpenInfoTooltip(true);
        });
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
        setServerError(e);
      });
  }

  function handleLogoutClick() {
    setCurrentUser({});
    clearUserFromLocalStorage();
    clearNewscardsFromLocalStorage();
    history.replace('/');
    window.location.assign('/');
  }

  function getSavedCards(error) {
    if (error) {
      setServerError(error);
      setIsOpenInfoTooltip(true);
    } else {
      mainApi.getArticles()
        .then((articles) => {
          setCurrentSavedCards(articles);
        })
        .catch((e) => {
          history.push('/');
          setServerError(e);
          setIsOpenInfoTooltip(true);
        });
    }
  }

  function handleNewsCardDelete(params) {
    const {
      cardId,
      setSaveIconClassName,
      className,
      setStartDisappear,
    } = params;
    mainApi.deleteArticle(cardId)
      .then(() => {
        getSavedCards();
        if (setSaveIconClassName) {
          setSaveIconClassName(className);
        }
        if (setStartDisappear) {
          setStartDisappear(false);
        }
      })
      .catch((e) => {
        history.push('/');
        setServerError(e);
        setIsOpenInfoTooltip(true);
      });
  }

  useEffect(() => {
    if (currentUser.name) {
      mainApi.getArticles()
        .then((articles) => {
          setCurrentSavedCards(articles);
        })
        .catch((e) => {
          setServerError(e);
          setIsOpenInfoTooltip(true);
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
              serverError={serverError}
              setServerError={setServerError}
            />

            <PopupRegister
              isOpen={isOpenPopupRegister}
              onClose={closeAllPopups}
              onSwitchPopupClick={handleLoginClick}
              onSubmit={handleRegistrationSubmit}
              serverError={serverError}
              setServerError={setServerError}
            />

            <InfoTooltip
              isOpen={isOpenInfoTooltip}
              onClose={closeAllPopups}
              onSwitchPopupClick={handleLoginClick}
              serverError={serverError}
              setServerError={setServerError}
            />

            <Footer />
          </CurrentSavedCardsContext.Provider>
        </CurrentMaxWidthContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
