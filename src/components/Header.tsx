import React from 'react';
import { NavLink } from 'react-router-dom';
import Home from '../pages/Home';
import {checkLanguage} from '../Utils';

const Header: React.FC = () => {
    return (
        <div className="Header">
            <div className="flex-container">
                <div className="Links">
                    <NavLink to="/"><img src="/assets/logo.png" alt="" /></NavLink>
                    <NavLink className={nav => "header-link" + (nav.isActive ? " active" : "")} to="/">{checkLanguage() ? "Accueil" : "Home"}</NavLink>
                    <NavLink className={nav => "header-link" + (nav.isActive ? " active" : "")} to="/favorites">{checkLanguage() ? "Favoris" : "Favorites"}</NavLink>
                </div>
            </div>
            <h1>Movie Club</h1>
            <div className="flags">
                <img src="/assets/france.png" alt="" onClick={() => {
                    window.localStorage.setItem("language", "fr-FR");
                    window.location.reload();
                }}/>
                <img src="/assets/usa.png" alt="" onClick={() => {
                    window.localStorage.setItem("language", "en-US");
                    window.location.reload();
                }}/>
            </div>
        </div>
    );
};

export default Header;
