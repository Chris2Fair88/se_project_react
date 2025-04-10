import './Header.css';
import logo from '../../assets/logo.svg';
import avatar from '../../assets/avatar.png';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString('default',
     { month: 'long', day: 'numeric' });
  return (
    <header className="header">
      <img className="header__logo" 
      src={logo} 
      alt='WTWR Logo' />
      <p className="header__date-and-location">
        {currentDate},
         {weatherData.city}
         </p>
         <div className="header__nav-container">
         <ToggleSwitch />   
      <button onClick={handleAddClick} 
      type="button" 
      className="header__add-clothes-button">
        + Add Clothes
        </button>
        </div>
      <div className="header__user-container">
        <p className="header__username">
          Terrence Tegegne</p>
        <img className="header__avatar"
         src={avatar} 
         alt='profile avatar for Terrence Tegegne' />
      </div>
    </header>
  );
}

export default Header;