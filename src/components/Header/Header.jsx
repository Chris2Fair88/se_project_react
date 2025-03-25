import './Header.css';
import logo from '../../assets/logo.svg';
import avatar from '../../assets/avatar.png';

function Header() {
  return (
    <header className="header">
        <img className="header__logo" src={logo} alt='App Logo'/>
        <p className="header__date-and-location">Date and Location</p>
        <button className="header__add-clothes-button">+ Add Clothes</button>
        <div className="header__user-container">
            <p className="header__username">Terrence Tegegne</p>
            <img className="header__avatar" src={avatar} alt='Terrence Tegegne'/>
            </div>
    </header>
  );
}

export default Header;