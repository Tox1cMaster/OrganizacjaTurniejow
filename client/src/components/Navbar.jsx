import React, { useState } from "react";
import "./css/Navbar.css";
import logo from "../assets/logo.png";

import {Link} from "react-router-dom";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toogleMenu = () => {
        setIsOpen(!isOpen);
    };

    return(
        <nav>
            <div className='nav_bar'>
                <ul className='left'>
                    <li><Link className="nav" to="/"><img src={logo} alt="Logo" /></Link></li>
                </ul>
                <button className="hamburger" onClick={toogleMenu}>&#9776;</button>
                <ul className={`right ${isOpen ? 'open' : ''}`} id="nav-links">
                    <li><Link className="nav" to="/tournaments">Turnieje</Link></li>
                    <li><Link className="nav" to="/games">Gry</Link></li>
                    <li><Link className="nav" to="/login">Zaloguj się</Link></li>
                    <li><Link className="nav" to="/register">Zarejestruj się</Link></li>
                </ul>
            </div>
        </nav>
    );
};