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
import SideBar from '../SideBar/SideBar';
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
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
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
    signin({email, password})
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);
          setActiveModal("");
          navigate("/profile");
        }
      })
      .catch(console.error);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    setActiveModal("");
  };



  const handleSideBarToggle = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    newItems({ name, imageUrl, weather })
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
    deleteItems(cardToDelete)
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
      handleLogin(userData.email, userData.password);
      navigate("/profile");
    })
    .catch(console.error);
  };

  const handleEditProfileModal = () => {
    setIsEditProfileOpen(true);
  };

  const handleEditProfileSubmit = (profileData) => {
    const token = localStorage.getItem("jwt"); // <-- Add this line
    updateProfile(profileData, token)
      .then((updatedUser) => setCurrentUser(updatedUser))
      .catch(console.error);
    setIsEditProfileOpen(false);
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

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken({ token })
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
        })
        .catch(() => setIsLoggedIn(false));
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
      <div className='page'>
            <div className='page__content'>
              <Header
                handleAddClick={handleAddClick}
                weatherData={weatherData}
                handleLogin={() => setActiveModal("login")}
                handleRegisterModal={() => setActiveModal("register")}
                isLoggedIn={isLoggedIn}
              />

              {isSideBarOpen ? <SideBar handleLogout={handleLogout} /> : null}

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
                  < Route
                    path="/profile"
                    element={
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile
                        cards={clothingItems}
                        onCardClick={handleCardClick}
                        handleAddClick={handleAddClick}
                        onEditProfile={handleEditProfileModal}
                        onCardLike={handleCardLike}
                        handleLogout={handleLogout}
                      />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
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
  onEditProfile={handleEditProfileSubmit}
  currentUser={currentUser}
/>
            <Footer />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
  );
}

export default App
