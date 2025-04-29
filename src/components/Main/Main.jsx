import React from "react";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import './Main.css';
function Main({ weatherData, handleCardClick, clothingItems }) {
const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <main>
      <WeatherCard temperature={weatherData.temp.F}
        isDay={weatherData.isDay}
        condition={weatherData.condition} />
      <section className="cards">
        <p className="cards__text">
          Today is {""}
          {currentTemperatureUnit === "F" ? `${weatherData.temp.F}°F`: `${Math.round(weatherData.temp.C)}°C`}{""}
          / You may want to wear:</p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  item={item}
                  key={item._id}
                  onCardClick={handleCardClick} />
                  
              );
            })}

        </ul>

      </section>
     
      </main>
  );
}

export default Main;