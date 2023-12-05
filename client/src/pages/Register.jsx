import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from "react-router-dom";
import AuthUser from '../components/AuthUser';



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
  const { http, setToken, getToken } = AuthUser();
  const [error, setError] = React.useState(null);
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    password: '',
    passwordRep: ''
  });

  useEffect(()=> {
    if (getToken()) {
      navigate('/');
    }
  })

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
        toast.error("Nazwa użytkownika jest zajęta");
        return;
      }
      const registerResponse = await http.post('/register', form);
      toast.success("Pomyślnie zarejestrowano");
      setTimeout(() => {
      navigate('/login');
      }, 3000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.email) {
        setError(error.response.data.email[0]);
      } else {
        toast.error('Email jest już zajęty.');
      }
    }
  };

  const divStyle = {
    background: 'grey',
    color: '#C9D6DF',
  };
  return (
    <div className="container">
    <div className="shadow-2xl rounded style='background-color: #394f62;'">
    <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text text-white">Zarejestruj się</h2>
    </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text text-white">
          Nazwa użytkownika
        </label>
        <div className="mt-2">
          <input
            id="name"
            name="name"
            type="text"
            onChange={updateField}
            autoComplete="name"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text text-white">
          E-Mail
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            onChange={updateField}
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium leading-6 text text-white">
          Hasło
        </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            onChange={updateField}
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="passwordRep" className="block text-sm font-medium leading-6 text text-white">
            Powtórz hasło
          </label>
        </div>
        <div className="mt-2">
          <input
            id="passwordRep"
            name="passwordRep"
            type="password"
            onChange={updateField}
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          onClick={handleSubmit}
          className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          Zarejestruj się
        </button>
      </div>
      <p className="mt-10 text-center text-sm text text-white">
        Masz już konto ? {' '}
        <Link to="/login" className="font-semibold leading-6 text-orange-600 hover:text-orange-500">
          Zaloguj się
        </Link>
      </p>
    </div>
    </div>
    <br></br>
    </div>
    <ToastContainer
      position="bottom-right"
      autoClose={2800}
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
