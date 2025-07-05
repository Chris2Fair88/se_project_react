import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";
import './ClothesSection.css';

function ClothesSection({ clothingItems, handleCardClick, handleAddClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  // Filter items to only those owned by the current user
  const userCards = clothingItems.filter(item => item.owner === currentUser._id);

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__header-text">Your Items</p>
        <button onClick={handleAddClick} type="button" className="clothes-section__header-btn"> + Add New</button>
      </div>
      <ul className="cards__list">
        {userCards.map((item) => (
          <ItemCard
            item={item}
            key={item._id}
            onCardClick={handleCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;