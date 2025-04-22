import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import './Profile.css';

function Profile({handleCardClick}) {
    return (
        <div className="profile">
            <div className="profile__container">
                <div className="profile__sidebar">
                    <SideBar />
                </div>
                <div className="profile__clothes-section">
                    <ClothesSection handleCardClick={handleCardClick}/>
                </div>
            </div>
        </div>
    )
}

export default Profile;