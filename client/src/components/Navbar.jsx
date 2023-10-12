import React from "react";
import "./css/Navbar.css";

import {Link} from "react-router-dom";

export const Navbar = () => {
    return(
        <nav>
            <div className='nav_bar'>
                <ul className='left'>
                    <li><Link className="nav" to="/">Nazwa strony</Link></li>
                    <li><Link className="nav" to="/tournaments">Turnieje</Link></li>
                    <li><Link className="nav" to="/games">Gry</Link></li>
                </ul>
                <ul className='right'>
                    <li><Link className="nav" to="/login">Zaloguj się</Link></li>
                    <li><Link className="nav" to="/register">Zarejestruj się</Link></li>
                </ul>
            </div>
        </nav>
    );
};