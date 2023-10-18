import React from "react";
import "./css/Navbar.css";
import logo from "../assets/logo.png";
import AuthUser from './AuthUser';

import {Link} from "react-router-dom";

export const NavbarAuth = () => {
    const {logout, token} = AuthUser();
    const logoutUser = () => {
        if(token != undefined){
            logout();
        }
    }
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
                    <li><div className="nav" onClick={logoutUser}>Wyloguj się</div></li>
                </ul>
            </div>
        </nav>
    );
};