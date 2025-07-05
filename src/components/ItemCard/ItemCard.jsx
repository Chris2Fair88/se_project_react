import './ItemCard.css';
import React, { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = (item.likes || []).some(id => id === currentUser._id);

  const itemLikeButtonClassName = `item__like-button ${isLiked ? "item__like-button_active" : ""}`;

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  const handleCardClick = () => {
    onCardClick(item);
  }
  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.link}
        alt={item.name}
      />
      {currentUser._id && (
        <button
          className={itemLikeButtonClassName}
          onClick={handleLike}
          aria-label="Like"
        >
          ♥
        </button>
      )}
    </li>
  );
}

export default ItemCard;