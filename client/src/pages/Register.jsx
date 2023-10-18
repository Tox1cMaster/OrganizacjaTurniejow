import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import AuthUser from '../components/AuthUser';


import "./css/Register.css"

const ErrorMessage = ({ text }) => {
  return (
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
  )
}

const validate = form => {
  if(!form.name){
    return toast.error("Nazwa użytkownika jest wymagana");
  }
  else if(form.name.length < 3) {
    return toast.error("Login jest za krótki");
  }

  if(!form.email){
    return toast.error("Email jest wymagany");
  }
  else if(!/^[a-zA-Z0-9.\-_]+@[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,4}$/i.test(form.email)){
    return toast.error("Zły format email");
  }

  if (!form.password){
    return toast.error("Hasło jest wymagane");
  }
  else if(form.password.length < 8){
    return toast.error("Hasło jest za słabe");
  }

  if (form.passwordRep !== form.password){
    return toast.error("Hasła nie są identyczne");
  }

  return null
}

export const Register = () => {
  const navigate = useNavigate();
  const { http, setToken } = AuthUser();
  const [error, setError] = React.useState(null);
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    password: '',
    passwordRep: ''
  });

  const updateField = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMsg = validate(form);
  
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
  
    try {
      const usernameResponse = await http.get(`/check-username?username=${form.name}`);
      if (usernameResponse.data.exists) {
        setError('Nazwa użytkownika jest już zajęta.');
        return;
      }
  
      const registerResponse = await http.post('/register', form);
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.email) {
        setError(error.response.data.email[0]);
      } else {
        setError('Wystąpił błąd rejestracji.');
      }
    }
  };

  const divStyle = {
    background: 'grey',
    color: '#C9D6DF',
  };
  return (
    <div className="container">
      <div className="header">
        <div className="text">Zarejestruj się</div>
        {error && <ErrorMessage text={error} />}
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <input type="text" name="name" onChange={updateField} placeholder="Podaj login" />
        </div>
        <div className="input">
          <input type="email" name="email" onChange={updateField} placeholder='Podaj swój email'/>
        </div>
        <div className="input">
          <input type="password" name="password" onChange={updateField} placeholder='Podaj hasło'/>
        </div>
        <div className="input">
          <input type="password" name="passwordRep" onChange={updateField} placeholder='Powtórz hasło'/>
        </div>
      </div>
      <div className="submit-container">
      <div className="submit " style={divStyle}>Zaloguj się</div>
      <div className="submit" onClick={handleSubmit}>Zarejestruj się</div>
      </div>
    </div>
  )
}
