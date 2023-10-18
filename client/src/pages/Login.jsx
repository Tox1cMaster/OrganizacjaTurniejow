import { useState } from "react";
import {toast, ToastContainer} from 'react-toastify';
import React from 'react'
import AuthUser from '../components/AuthUser';

import "./css/Login.css"

export const Login = () => {

const {http,setToken} = AuthUser();
const [email,setEmail] = useState();
const [password,setPassword] = useState();

const notifyloginok = () => {
  toast.success('Zalogowano pomyślnie!', { autoClose: 5000 });
};

const notifyloginerror = () => {
  toast.error('Niepoprawne dane logowania!', { autoClose: 5000 });
};

const submitForm = () => {
  // api call
  http.post('/login', { email: email, password: password })
    .then((res) => {
      setToken(res.data.user, res.data.access_token);
      notifyloginok();
    })
    .catch(() => {
      notifyloginerror();
    });
}

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
          <input type="text" placeholder="E-Mail" onChange={e=>setEmail(e.target.value)} id="email"/>
        </div>
        <div className="input">
          <input type="password" placeholder='Hasło' onChange={e => setPassword(e.target.value)} id="pwd"/>
        </div>
      </div>
      <div className="submit-container">
      <div className="submit" style={divStyle}>Zarejestruj się</div>
        <button type="button" onClick={submitForm} className="submit" style={divStyle}>Zaloguj sie</button>
      </div>
      <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />
    </div>
  )
}
