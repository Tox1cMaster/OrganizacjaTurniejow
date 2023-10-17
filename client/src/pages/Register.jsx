import React from 'react'

import "./css/Register.css"

export const Register = () => {

  const divStyle = {
    background: 'grey',
    color: '#C9D6DF',
  };
  return (
    <div className="container">
      <div className="header">
        <div className="text">Zarejestruj się</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <input type="text" placeholder="Podaj login" />
        </div>
        <div className="input">
          <input type="email" placeholder='Podaj swój email'/>
        </div>
        <div className="input">
          <input type="password" placeholder='Podaj hasło'/>
        </div>
      </div>
      <div className="submit-container">
      <div className="submit " style={divStyle}>Zaloguj się</div>
      <div className="submit">Zarejestruj się</div>
      </div>
    </div>
  )
}
