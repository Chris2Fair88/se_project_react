import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import './Profile.css';

function Profile({onCardClick, cards, handleAddClick, onEditProfile}) {
    return (
        <div className="profile">
            <div className="profile__container">
                <div className="profile__sidebar">
                    <SideBar handleLogout={handleLogout} />
                </div>
                <div className="profile__clothes-section">
                    <ClothesSection clothingItems={cards} handleCardClick={onCardClick} handleAddClick={handleAddClick}/>
                </div>
            </div>
        </div>
    )
}

export default Profile;