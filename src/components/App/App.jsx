import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import AddItemModal from '../AddItemModal/AddItemModal';
import ItemModal from '../ItemModal/ItemModal';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import LoginModal from '../LoginModal/LoginModal';
import EditProfileModal from '../EditProfileModal/EditProfileModal';
import Profile from '../Profile/Profile';
import { processWeatherData } from '../../utils/weatherApi';
import { getWeather } from '../../utils/weatherApi';
import { coordinates, APIkey } from '../../utils/constants';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';
import Footer from '../Footer/Footer';
import { defaultClothingItems } from '../../utils/constants';
import { getItems, newItems, deleteItems } from '../../utils/api';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';
import { signup, signin, updateProfile, checkToken } from '../../utils/auth';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { addCardLike, removeCardLike } from '../../utils/api';

function App() {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] =
    useState({ type: "", temp: { F: 999, C: 999 }, condition: "", isDay: true, city: "" });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState();
  const [currentTemperatureUnit, setcurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState({});
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditprofileOpen, setIsEditProfileOpen] = useState(false);
  const handleToggleSwitchChange = () => {
    setcurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  }
  const handleAddClick = () => {
    if (!isLoggedIn) return;
    setActiveModal("add-garment");
  };
  const onClose = () => {
    setActiveModal("");
  }
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  const handleLogin = useCallback(({email, password}) => {
    return signin({email, password})
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);
          setActiveModal("");
          navigate("/profile");
        } else {
          return Promise.reject();
        }
    
      });
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    setActiveModal("");
  };





  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    newItems({ name, imageUrl, weather }, token)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        onClose();
      })
      .catch((err) => console.error(err));
  };

  const handleCardDelete = (cardId) => {
    setCardToDelete(cardId);
    setActiveModal("delete-confirmation");
  };

  const handleConfirmDelete = () => {
    if (!cardToDelete) return;
    const token = localStorage.getItem("jwt");
    deleteItems(cardToDelete, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== cardToDelete)
        );
        setSelectedCard(null);
        onClose();
      })
      .catch((err) => {
        console.error(`Failed to delete card with ID ${cardToDelete}:`, err);
      });
  };

  const handleRegisterModal = () => {
    setActiveModal("register");
  };

  const handleRegistration = (userData) => {
    signup(userData)
    .then(() => {
      setActiveModal("");
      handleLogin({email: userData.email, password: userData.password});
      navigate("/profile");
    })
    .catch(console.error);
  };

  const handleEditProfileModal = () => {
    setIsEditProfileOpen(true);
  };

  const handleEditProfileSubmit = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    updateProfile({
      name,
      avatar: avatar || "",
      token,
    })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setIsEditProfileOpen(false);
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt"); // <-- Define token here
    (!isLiked
      ? addCardLike(id, token)
      : removeCardLike(id, token)
    )
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const processData = processWeatherData(data);
        setWeatherData(processData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => {
        const normalized = items.map(item => ({
          ...item,
          link: item.link || item.imageUrl || item.image // normalize for frontend
        }));
        setClothingItems(normalized);
      })
      .catch(console.error);
  }, []);

  const [isAuthChecked, setIsAuthChecked] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken({ token })
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
          setIsAuthChecked(true);
        })
        .catch(() => {
          setIsLoggedIn(false);
          setCurrentUser({});
          localStorage.removeItem("jwt");
          setIsAuthChecked(true);
        });
    } else {
      setIsLoggedIn(false);
      setCurrentUser({});
      setIsAuthChecked(true);
    }
  }, []);

  console.log(currentUser);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
      <div className='page'>
        <div className='page__content'>
          {isAuthChecked && (
            <>
              <Header
                handleAddClick={handleAddClick}
                weatherData={weatherData}
                handleLogin={() => setActiveModal("login")}
                handleRegisterModal={() => setActiveModal("register")}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
              />


              <div className='page__main'>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Main
                        weatherData={weatherData}
                        handleCardClick={handleCardClick}
                        clothingItems={clothingItems}
                        handleAddClick={handleAddClick}
                        onCardLike={handleCardLike}
                      />
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        {isAuthChecked ? (
                          <Profile
                            currentUser={currentUser}
                            cards={clothingItems}
                            onCardClick={handleCardClick}
                            handleAddClick={handleAddClick}
                            onEditProfile={handleEditProfileModal}
                            onCardLike={handleCardLike}
                            handleLogout={handleLogout}
                          />
                        ) : (
                          <div>Loading...</div>
                        )}
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </div>
            </>
          )}
        </div>
      </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={onClose}
          onAddItemModalSubmit={handleAddItemModalSubmit} />
        <ItemModal activeModal={activeModal}
          card={selectedCard}
          onClose={onClose}
          onCardDelete={handleCardDelete} />
        <DeleteConfirmationModal
          onClose={onClose}
          onCardDelete={handleConfirmDelete}
          isOpen={activeModal === "delete-confirmation"}
        />
        <RegisterModal
  isOpen={activeModal === "register"}
  onClose={onClose}
  onRegister={handleRegistration}
  onSwitchToLogin={() => setActiveModal("login")}
/>
<LoginModal
  isOpen={activeModal === "login"}
  onClose={onClose}
  onLogin={handleLogin}
  onSwitchToRegister={() => setActiveModal("register")}
/>
<EditProfileModal
  isOpen={isEditprofileOpen}
  onClose={() => setIsEditProfileOpen(false)}
  onUpdateUser={handleEditProfileSubmit}
  currentUser={currentUser}
/>
            <Footer />
         
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}
export default App;
