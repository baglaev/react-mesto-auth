import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';
import api from '../utils/api.js';
import { useCallback, useEffect, useState } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopup] = useState(false);
  const [imagePopup, setImagePopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
//   const [isTransmit, setIsTransmit] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deleteCardId, setDeleteCardId] = useState('');

  const setCloseAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopup(false);
    setDeletePopup(false);
  }, [])

  const closePopupByEsc = useCallback((e) => {
    if (e.key === 'Escape') {
        setCloseAllPopups();
        document.removeEventListener('keydown', closePopupByEsc);
    }
  }, [setCloseAllPopups])

  const closeAllPopups = useCallback(() => {
    setCloseAllPopups();
    document.removeEventListener('keydown', closePopupByEsc);
  }, [setCloseAllPopups, closePopupByEsc])


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEventListenerDocument();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEventListenerDocument();
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEventListenerDocument();
  }

  function handleDeletePopupClick(cardId) {
    setDeleteCardId(cardId);
    setDeletePopup(true);
    setEventListenerDocument();
  }

//   function closeAllPopups() {
//     setIsEditProfilePopupOpen(false);
//     setIsAddPlacePopupOpen(false);
//     setIsEditAvatarPopupOpen(false);
//     setImagePopup(false);
//     setDeletePopup(false);
//   }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopup(true);
    setEventListenerDocument();
  }

  function handleUser(userInfo, resetValidation) {
    api.editProfile(userInfo.name, userInfo.about)
        .then(res => {
            setCurrentUser(res)
            closeAllPopups()
            resetValidation()
        })
        .catch((error) => {
            console.log(`Ошибка ${error}`)
        });
  }

  function handleUpdateAvatar(userInfo, resetValidation) {
    api.handleAvatar(userInfo.avatar)
        .then(res => {
            setCurrentUser(res)
            closeAllPopups()
            resetValidation()
        })
        .catch((error) => {
            console.log(`Ошибка ${error}`)
        });
  }

  function handleDeleteSubmit(e) {
    e.preventDefault();
    api.deleteCard(deleteCardId)
        .then(() => {
            setCards(cards.filter(item => {
                return item._id !== deleteCardId;
            }));
            closeAllPopups();
        })
        .catch((error) => {
            console.log(`Ошибка ${error}`)
        });
  }

  function handleAddPlaceSubmit(item, resetValidation) {
    api.addCard(item.name, item.link)
        .then((res) => {
            setCards([res, ...cards]);
            closeAllPopups();
            resetValidation();
        })
        .catch((error) => {
            console.log(`Ошибка ${error}`)
        });
  }

//   function closeAllPopupsOnOverlay(e) {
//     if (e.target === e.currentTarget) {
//         closeAllPopups();
//         document.removeEventListener('keydown', closePopupByEsc);
//     }
//   }

//   function closePopupByEsc(e) {
//     if (e.key === 'Escape') {
//         closeAllPopups();
//         document.removeEventListener('keydown', closePopupByEsc);
//     }
//   }

  function setEventListenerDocument() {
    document.addEventListener('keydown', closePopupByEsc);
  }

  useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
        .then(([userInfo, cards]) => {
            setCurrentUser(userInfo)
            setCards(cards)
        })
        .catch((error) => {
            console.log(`Ошибка ${error}`)
        });
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
        <Header />
        <Main 
            onEditProfile= {handleEditProfileClick}
            onAddPlace = {handleAddPlaceClick}
            onEditAvatar = {handleEditAvatarClick}
            onCardClick = {handleCardClick}
            onDelete = {handleDeletePopupClick}
            cards = {cards}
        />
        <Footer />
        <EditProfilePopup 
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onHandleUser={handleUser}
        />
        <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm
            name='popup-delete"'
            title='Вы уверены?'
            titleButton='Да'
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleDeleteSubmit}
            // isTransmit={isTransmit}
        />
        <EditAvatarPopup
            onUpdateAvatar = {handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onHandleUser={handleUser}
        />
        <ImagePopup
            card={selectedCard}
            isOpen={imagePopup}
            onClose={closeAllPopups}
        />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
