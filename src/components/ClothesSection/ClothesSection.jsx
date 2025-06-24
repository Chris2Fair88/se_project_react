import ItemCard from "../ItemCard/ItemCard";
import './ClothesSection.css';
import React, { useContext } from 'react';
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({ clothingItems, handleCardClick, handleAddClick }) {
const currentUser = useContext(CurrentUserContext);
  const userCards = clothingItems.filter(card => card.owner === currentUser._id);
    return (
        <div className="clothes-section">
            <div className="clothes-section__header">
                <p className="clothes-section__header-text">Your Items</p>
                <button onClick={handleAddClick} type="button" className="clothes-section__header-btn"> + Add New</button>
            </div>
            <ul className="cards__list">
                {userCards.map((item) => {
                    return (
                        <ItemCard
                            item={item}
                            key={item._id}
                            onCardClick={handleCardClick}
                        />
                    );
                })}
            </ul>
        </div>

    );
}

export default ClothesSection;