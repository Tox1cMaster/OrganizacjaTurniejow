import React from "react";
import "./css/Navbar.css";
import logo from "../assets/logo.png";
import AuthUser from './AuthUser';

import {Link} from "react-router-dom";

export const NavbarAuth = () => {
    const {logout, token, getUser} = AuthUser();
    const logoutUser = () => {
        if(token != undefined){
            logout();
        }
    }
    const user = getUser();
    return(
        <nav>
            <div className='nav_bar'>
                <ul className='left'>
                    <li><Link className="nav" to="/"><img src={logo} alt="Logo" /></Link></li>
                    <li><Link className="nav" to="/tournaments">Turnieje</Link></li>
                    <li><Link className="nav" to="/games">Gry</Link></li>
                </ul>
                <ul className='right'>
                    <li><Link className="nav" to="/account">Moje konto - {user.name}</Link>
                        <ul className="dropdown">
                            <li><Link className="nav" to="/">Edytuj profil</Link></li>
                            <li><Link className="nav" to="/createTournament">Stwórz turniej</Link></li>
                            <li><Link className="nav" to="/createGame">Stwórz grę</Link></li>
                            <li><Link className="nav" to="/">Moje turnieje</Link></li>
                        </ul>
                    </li>
                    <li><Link className="nav" onClick={logoutUser}>Wyloguj się</Link></li>
                </ul>
            </div>
        </nav>
    );
};