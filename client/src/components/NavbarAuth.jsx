import React from "react";
import "./css/NavbarAuth.css";
import logo from "../assets/logo.png";

import {Link} from "react-router-dom";

export const Navbar = () => {
    return(
        <nav>
            <div className='nav_bar'>
                <ul className='left'>
                    <li><Link className="nav" to="/"><img src={logo} alt="Logo" /></Link></li>
                    <li><Link className="nav" to="/tournaments">Turnieje</Link></li>
                    <li><Link className="nav" to="/games">Gry</Link></li>
                </ul>
                <ul className='right'>
                    <li><Link className="nav" to="/account">Moje konto</Link></li>
                    <li><Link className="nav" to="/register">Wyloguj się</Link></li>
                </ul>
            </div>
        </nav>
    );
};