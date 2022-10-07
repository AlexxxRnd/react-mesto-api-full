import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import Register from './Register'
import Login from './Login'
import EditProfilePopup from './EditProfilePopup'
import PopupAddCard from './PopupAddCard'
import PopupEditAvatar from './PopupEditAvatar'
import ImagePopup from './ImagePopup'
import InfoTooltip from './InfoTooltip'
import ApiRequest from '../utils/Api.js'
import * as Auth from '../utils/Auth.js'
import { UserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLogged, setIsLogged] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [isAuthSuccess, setIsAuthSuccess] = React.useState(false)
  const navigate = useNavigate();

  React.useEffect(() => {
    Promise.all([ApiRequest.getUserInfo(), ApiRequest.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData)
        setCards(initialCards)
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      ApiRequest.likeCard(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
        });
    } else {
      ApiRequest.unlikeCard(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
        });
    }
  }

  function handleCardDelete(card) {
    ApiRequest.deleteCard(card._id).then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));
    })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function openInfoTooltip() {
    setIsInfoTooltipOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleRegister(email, password) {
    Auth.register(email, password)
      .then(() => {
        setIsAuthSuccess(true)   
        navigate('/sign-in');
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
        setIsAuthSuccess(false)
      })
      .finally(() => {
        openInfoTooltip();
      })
  };

  function handleLogin(email, password) {
    Auth.login(email, password)
      .then((data) => {
        setIsLogged(true);
        localStorage.setItem('jwt', data.token);
        handleTokenCheck();
        navigate('/');
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
        setIsLogged(false);
        setIsAuthSuccess(false)
        openInfoTooltip();
      });
  };

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    Auth.checkTokenValid(jwt)
      .then((data) => {
        setUserEmail(data.data.email)
        setIsLogged(true);
        navigate('/');
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  };

  function handleSignOut() {
    setIsLogged(false);
    localStorage.removeItem('jwt');
    setUserEmail('');
    navigate('/sign-in');
  };

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  React.useEffect(() => {
    if (isLogged) {
      navigate('/');
    }
  }, [isLogged]);

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link

  React.useEffect(() => {
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
  }, [isOpen])

  function handleUpdateUser(name, about) {
    ApiRequest.setUserInfo(name, about)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }

  function handleAddCard(data) {
    ApiRequest.addCard(data)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups()
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }

  function handleUpdateAvatar(avatarLink) {
    ApiRequest.setUserAvatar(avatarLink)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }

  return (
    <UserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          onSignOut={handleSignOut}
          userEmail={userEmail}
        />

        <Routes>

          <Route
            path="/sign-up"
            element={
              <Register
                loggedIn={isLogged}
                onRegister={handleRegister}
              />
            }
          />

          <Route
            path="/sign-in"
            element={
              <Login
                loggedIn={isLogged}
                onLogin={handleLogin}
              />
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={isLogged}>
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onClose={closeAllPopups}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </ProtectedRoute>
            }
          />

        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <PopupAddCard
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCard}
        />

        <PopupEditAvatar
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          isSuccess={isAuthSuccess}
        />

      </div>
    </UserContext.Provider>
  );
};

export default App;