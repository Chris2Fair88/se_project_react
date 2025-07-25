import './Header.css';
import logo from '../../assets/logo.svg';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { Link } from 'react-router-dom';
import React from 'react';

function Header({ weatherData, handleLogin, handleRegisterModal, isLoggedIn, handleLogout, handleAddClick, currentUser }) {
  const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

  return (
    <header className="header">
      <Link to="/" className="header__logo-container">
        <img className="header__logo" src={logo} alt="WTWR Logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData?.city}
      </p>
      <div className="header__nav-container">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button className="header__add-clothes-btn" onClick={handleAddClick}>
              + Add clothes
            </button>
            <Link to="/profile" className="header__profile-link">
            <span className="header__username">{currentUser.name}</span>
            </Link>
            {currentUser.avatar ? (
              <img src={currentUser.avatar} alt={currentUser.name} className="header__avatar" />
            ) : (
              <div className="header__avatar-placeholder">
                {currentUser.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </>
        ) : (
          <div className="header__auth">
            <button
              className="button header__auth-button header__auth-button_signup"
              onClick={handleRegisterModal}
            >
              Sign Up
            </button>
            <button
              className="button header__auth-button header__auth-button_login"
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;