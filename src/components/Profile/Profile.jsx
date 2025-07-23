import React from "react";
import './Profile.css';

function Profile({
  currentUser,
  cards,
  onCardClick,
  handleAddClick,
  onEditProfile,
  handleLogout,
  onCardLike,
}) {
    console.log("First initial:", currentUser?.name?.charAt(0).toUpperCase());
  return (
    <section className="profile">
      <div className="profile__sidebar">
        {currentUser?.avatar && currentUser.avatar.trim() !== "" ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name || ""}
            className="profile__avatar"
          />
        ) : (
          <div className="profile__avatar-placeholder">
            {currentUser?.name?.charAt(0).toUpperCase() || ""}
          </div>
        )}
        <span className="profile__name">{currentUser?.name || ""}</span>
        <button className="profile__edit-btn" onClick={onEditProfile}>
          Change profile info
        </button>
        <button className="profile__logout-btn" onClick={handleLogout}>
          Log out
        </button>
      </div>
      <div className="profile__main">
        <div className="profile__header">
          <span className="profile__items-header">Your items</span>
          <button className="profile__add-btn" onClick={handleAddClick}>
            + Add new
          </button>
        </div>
        <div className="profile__clothes-section">
          {/* <ClothesSection
            clothingItems={cards}
            handleCardClick={onCardClick}
            onCardLike={onCardLike}*/}
          {/* /> */}
        </div>
      </div>
    </section>
  );
}

export default Profile;