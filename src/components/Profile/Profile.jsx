import React from "react";
import './Profile.css';
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  currentUser,
  cards,
  onCardClick,
  handleAddClick,
  onEditProfile,
  handleLogout,
  onCardLike,
}) {
  return (
    <section className="profile">
      <div className="profile__sidebar">
        <SideBar
          avatar={currentUser.avatar}
          name={currentUser.name}
          onEditProfile={onEditProfile}
          handleLogout={handleLogout}
        />
      </div>
      <div className="profile__main">
        <div className="profile__clothes-section">
          <ClothesSection
            clothingItems={cards}
            handleCardClick={onCardClick}
            onCardLike={onCardLike}
            handleAddClick={handleAddClick}
          />
        </div>
      </div>
    </section>
  );
}

export default Profile;