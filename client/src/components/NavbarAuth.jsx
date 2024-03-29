import React, { useState } from "react";
import "./css/Navbar.css";
import logo from "../assets/logo.png";
import AuthUser from './AuthUser';

import {Link} from "react-router-dom";

export const NavbarAuth = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {logout, token, getUser} = AuthUser();
    const logoutUser = () => {
        if(token != undefined){
            logout();
        }
    }

    const toogleMenu = () => {
        setIsOpen(!isOpen);
    };
    const user = getUser();
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
                    <li><Link className="nav" to="/account">Moje konto - {user.name}</Link>
                        <ul className="dropdown">
                            <li><Link className="nav" to="account/account/edit">Edytuj profil</Link></li>
                            <li><Link className="nav" to="/createTournament">Stwórz turniej</Link></li>
                            <li><Link className="nav" to="/createGame">Stwórz grę</Link></li>
                            <li><Link className="nav" to="account/account/tournaments">Moje turnieje</Link></li>
                        </ul>
                    </li>
                    <li><Link className="nav" onClick={logoutUser}>Wyloguj się</Link></li>
                </ul>
            </div>
        </nav>
    );
};