import { React, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import * as auth from '../utils/auth';
import logo from '../images/header-logo-mesto.svg';
import InfoTooltip from './InfoTooltip';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setselectedCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setselectedCard(card);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setselectedCard({});
  }

  const authorize = async (jwt) => {
    const content = await auth.checkToken(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserData({
            id: res.data._id,
            email: res.data.email
          });
        }
      })
      .catch(console.dir);
    return content;
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            authorize(jwt);
          } else {
            localStorage.removeItem('jwt');
            history.push('/sign-in');
          }
        })
        .catch(console.dir);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then(({ data }) => {
          setCurrentUser(data)
        })
        .catch(err => console.log(`Ошибка: ${err}`));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then((data) => {
          setCards(data)
        })
        .catch(err => console.log(`Ошибка: ${err}`));
    }
  }, [loggedIn]);

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link;
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }

  function handleCardDelete(card) {
    api.deleteIcon(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.editProfile(data)
      .then(({ data }) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.editAvatar(data)
      .then(({ data }) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api.addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onRegister({ password, email }) {
    auth.register(password, email)
      .then((res) => {
        if (res.data) {
          setErrorMessage('');
          history.push('/sign-in');
        } else {
          setErrorMessage(res.error);
          setIsInfoTooltipOpen(true);
        }
        setIsInfoTooltipOpen(true);
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
        setErrorMessage(err);
        setIsInfoTooltipOpen(true);
      });
  }

  function onLogin({ password, email }) {
    if (password && email) {
      auth.login(password, email)
        .then((data) => {
          if (data.token) {
            localStorage.setItem('jwt', data.token);
            setLoggedIn(true);
            history.push('/');
          } else {
            
            setIsInfoTooltipOpen(true);
          }
        })
        .catch(err => {
          setErrorMessage(err);
          setIsInfoTooltipOpen(true);
        });
    }
  }

  function signOut() {
    return auth.logOut()
      .then(() => {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        history.push('/sign-in');
      })
      .catch(err => {
        setErrorMessage(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">

          <Header
            loggedIn={loggedIn}
            logo={logo}
            userData={userData}
            signOut={signOut}
          />
          <Switch>
            <ProtectedRoute
              exact
              component={Main}
              path="/"
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              loggedIn={loggedIn}
            />
            <Route path="/sign-in">
              <Login onLogin={onLogin} />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={onRegister} />
            </Route>
            <Route path="/">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          {loggedIn && <Footer />}

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading} />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading} />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading} />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups} />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            errorMessage={errorMessage} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;

