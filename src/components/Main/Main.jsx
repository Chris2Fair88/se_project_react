import React, { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import './Main.css';

function Main({ weatherData, handleCardClick, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
console.log("Current weather type:", weatherData.type);
console.log("Filtered items:", clothingItems.filter((item) => item.weather === weatherData.type));
console.log("All clothing items:", clothingItems);
return (
    <main>
      <WeatherCard
        temperature={weatherData.temp.F}
        isDay={weatherData.isDay}
        condition={weatherData.condition}
      />
      <section className="cards">
        <p className="cards__text">
          Today is {""}
          {currentTemperatureUnit === "F"
            ? `${weatherData.temp.F}°F`
            : `${Math.round(weatherData.temp.C)}°C`}
          {""}
          / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems.map((item) => (
            <ItemCard
              item={item}
              key={item._id}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;