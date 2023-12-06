import { useState, useEffect } from "react";
import {toast, ToastContainer} from 'react-toastify';
import React from 'react'
import AuthUser from '../components/AuthUser';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Login = () => {

const {http, setToken, getToken} = AuthUser();
const [email,setEmail] = useState();
const [password,setPassword] = useState();
const navigate = useNavigate();

const notifyloginok = () => {
  toast.success('Zalogowano pomyślnie!');
};

const notifyloginerror = () => {
  toast.error('Niepoprawne dane logowania!');
};

useEffect(()=> {
  if (getToken()) {
    navigate('/');
  };
})

const submitForm = () => {
  http.post('/login', { email: email, password: password })
    .then((res) => {
      notifyloginok();
      setTimeout(() => {
      setToken(res.data.user, res.data.access_token);
      },1500);
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
    <div className="shadow-2xl rounded style='background-color: #394f62;'">
    <div className="flex min-h-full flex-col justify-center px-6 lg:px-8 mt-5">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text text-white">Zaloguj się</h2>
    </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm text-white font-medium leading-6 text">
          E-Mail
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text text-white">
            Hasło
          </label>
          <div className="text-sm">
            <a href="#" className="font-semibold text-orange-600 hover:text-orange-500">
              Zapomniałeś hasła?
            </a>
          </div>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          onClick={submitForm}
          className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          Zaloguj się
        </button>
      </div>

      <p className="mt-10 text-center text-sm text text-white">
        Nie masz konta? {' '}
        <Link to="/register" className="font-semibold leading-6 text-orange-600 hover:text-orange-500">
          Zarejestruj się
        </Link>
      </p>
    </div>
    </div>
    <br></br>
    </div>
      <ToastContainer
      position="bottom-right"
      autoClose={500}
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
