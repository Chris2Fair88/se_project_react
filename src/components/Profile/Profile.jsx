import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import './Profile.css';

function Profile() {
    return (
        <div className="profile">
            <div className="profile__container">
                <div className="profile__sidebar">
                    <SideBar />
                </div>
                <div className="profile__clothes-section">
                    <ClothesSection />
                </div>
            </div>
        </div>
    )
}

export default Profile;