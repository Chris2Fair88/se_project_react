import { weatherTypes } from '../../utils/constants';
import './WeatherCard.css';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';
import { useContext } from 'react';
function WeatherCard({ temperature, isDay, condition }) {
   const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
   const filteredType = weatherTypes.filter((type) => {
      return type.day === isDay && type.condition === condition;
   });

   const weatherType = filteredType[0];

   return (
      <section className="weather-card">
         <p className="weather-card__temp">
         {currentTemperatureUnit === 'F'
               ? `${temperature}°F`
               : `${Math.round((temperature - 32) * 5 / 9)}°C`}
         </p>
         <img
            className="weather-card__img"
            src={weatherType?.url}
            alt={`card showing ${weatherType?.day ? "day" : "night"} 
        time${weatherType?.condition} weather`}
         />
      </section>
   );
}

export default WeatherCard;