import WeatherCard from "../WeatherCard/WeatherCard";
import {defaultClothingItems} from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import './Main.css';
function Main({weatherData}) {
 const currentDate = new Date().toLocaleString('default',{month: 'long', day: 'numeric'});
  return (
   <>
   <main>
   <WeatherCard />
   <section className="cards">
    <p className="cards__text">Today is 75 &deg; F / You may want to wear:</p>
    <ul className="cards__list">
      {defaultClothingItems.filter((item) =>{
        return item.weather === weatherData.type;
      }).map((item) => {
        return <ItemCard item={item} key={item._id} />;
      })}
    </ul>

   </section>
   </main>
   </>
  );
}

export default Main;