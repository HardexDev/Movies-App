import React from 'react';
import { NavLink } from 'react-router-dom';
import Home from '../pages/Home';

const Header: React.FC = () => {
    return (
        <div className="Header">
            <div className="flex-container">
                <div className="Links">
                    <NavLink to="/"><img src="/assets/logo.png" alt="" /></NavLink>
                    <NavLink className="header-link" to="/favorites">Favorites</NavLink>
                </div>
            </div>
            
            <h1>Movie Club</h1>
        </div>
    );
};

export default Header;
