import avatar from '../../assets/avatar.png';
import React from 'react';
import './SideBar.css';

function SideBar() {

    return (
        <div className="sidebar">
            <div className="sidebar__user-container">
                <p className="sidebar__username">
                    Terrence Tegegne</p>
                <img className="sidebar__avatar"
                    src={avatar}
                    alt='profile avatar for Terrence Tegegne' />
            </div>
            </div>
    )
}

export default SideBar;