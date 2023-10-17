import React from 'react'

import "./css/Login.css"

export const Login = () => {

  const divStyle = {
    background: 'grey',
    color: '#C9D6DF',
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Zaloguj się</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <input type="text" placeholder="Username" />
        </div>
        <div className="input">
          <input type="password" placeholder='Password'/>
        </div>
      </div>
      <div className="submit-container">
        <div className="submit" style={divStyle}>Zarejestruj się</div>
        <div className="submit">Zaloguj się</div>
      </div>
    </div>
  )
}
