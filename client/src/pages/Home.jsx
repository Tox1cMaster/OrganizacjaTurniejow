import React from 'react'
import "./css/Home.css"

import { Link } from "react-router-dom"
export const Home = () => {
  return (
    <section className='top-section'>
        <div className="container">
          <h1>Prosta aplikacja do organizacji turniejów</h1>
          <p>Dołącz do milionów graczy na całym świecie</p>
          <p>Już dzisiaj stwórz własny turniej o którym marzysz</p>
          <div className="top-section-buttons">
            <Link className="login-button button" to="/">Zaloguj się</Link>
            <Link className="register-button button" to="/">Zarejestruj się</Link>
          </div>
        </div>
      </section>
  )
}
