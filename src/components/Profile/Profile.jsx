import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import './Profile.css';

function Profile({ cards, onCardClick, handleAddClick, onEditProfile, handleLogout, onCardLike }) {
    return (
        <section className="profile">
            <div className="profile__container">
                <div className="profile__sidebar">
                    <SideBar handleLogout={handleLogout} />
                </div>
                <div className="profile__clothes-section">
                    <ClothesSection
                        clothingItems={cards}
                        handleCardClick={onCardClick}
                        handleAddClick={handleAddClick}
                        onCardLike={onCardLike}
                    />
                </div>
            </div>
            <button
                className="profile__edit-button"
                onClick={onEditProfile}
                aria-label="Edit profile"
            >
                Edit Profile
            </button>
            <button
                className="profile__signout-button"
                onClick={handleLogout}
                aria-label="Sign out"
            >
                Sign Out
            </button>
        </section>
    );
}

export default Profile;