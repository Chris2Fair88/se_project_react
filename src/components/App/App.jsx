import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import AddItemModal from '../AddItemModal/AddItemModal';
import ItemModal from '../ItemModal/ItemModal';
import SideBar from '../SideBar/SideBar';
import Profile from '../Profile/Profile';
import { processWeatherData } from '../../utils/weatherApi';
import { getWeather } from '../../utils/weatherApi';
import { coordinates, APIkey } from '../../utils/constants';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';
import Footer from '../Footer/Footer';
import { defaultClothingItems } from '../../utils/constants';
import { getItems, newItems, deleteItems } from '../../utils/api';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';

function App() {
  const [weatherData, setWeatherData] =
    useState({ type: "", temp: { F: 999, C: 999 }, condition: "", isDay: true, city: "" });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState();
  const [currentTemperatureUnit, setcurrentTemperatureUnit] = useState("F");
  const [cardToDelete, setCardToDelete] = useState(null);
  const handleToggleSwitchChange = () => {
    setcurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  }
  const handleAddClick = () => {
    console.log("Add button clicked");
    setActiveModal("add-garment");
  };
  const onClose = () => {
    setActiveModal("");
  }
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  const handleLogout = () => {
    localStorage.clear();
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
    .then((data) => {
      if (data) { setClothingItems(data); }
    })
    .catch((err) => {
      console.error("Failed to fetch items:", err.message);
    }
    );
  }, []);





  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
      <BrowserRouter>
        <div className='page'>
          <div className='page__content'>
            <Header
              handleAddClick={handleAddClick}
              handleCardClick={handleCardClick}
              weatherData={weatherData}
              handleSideBarToggle={handleSideBarToggle}
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
                    />
                  }
                />
                < Route
                  path="/profile"
                  element={
                    <Profile
                      cards={clothingItems}
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                    />
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
          <Footer />
        </div>
      </BrowserRouter>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App
