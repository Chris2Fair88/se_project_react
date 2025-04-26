import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import './Profile.css';

function Profile({onCardClick, cards}) {
    return (
        <div className="profile">
            <div className="profile__container">
                <div className="profile__sidebar">
                    <SideBar />
                </div>
                <div className="profile__clothes-section">
                    <ClothesSection clothingItems={cards} handleCardClick={onCardClick}/>
                </div>
            </div>
        </div>
    )
}

export default Profile;