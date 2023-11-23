import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import AuthUser from '../components/AuthUser';
import '../app.css';
import axios from 'axios';
import Functions from '../components/Functions';
import userAvater from '../assets/defaultavatar.png'

const MyTournaments = () => {
    const { getGameName, getStatusName } = Functions();
    const [tournaments, setTournaments] = useState([]);
  
    useEffect(() => {
      const fetchTournaments = async () => {
        try {
          const response = await axios.get('/api/tournaments');
          setTournaments(response.data);
        } catch (error) {
          console.error('Error fetching tournaments:', error);
        }
      };
  
      fetchTournaments();
    }, []);
  
    return (
    <div className="container">
        <div className=" flex justify-between items-center mb-5 ">
            <h1 className='text-white text-5xl'>Twoje Turnieje</h1>
            <Link to="/createTournament" className="rounded-md bg-orange-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
                Stwórz turniej
            </Link>
        </div>
      <ul className="space-y-4">
        {tournaments.map((tournament) => (
          <li key={tournament.TournamentName} className="border bg-white border-gray-300 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
            <h3 className="text-lg  font-semibold">Nazwa turnieju: {tournament.TournamentName}</h3>
            <span className="text-sm font-medium text-gray-600">Status: {getStatusName(tournament.Status)}  </span>
            </div>
            <p className="text-gray-600">Gra: {getGameName(tournament.GameID)}</p>
          </li>
        ))}
      </ul>
    </div>
    );
  };



const MyTeams = () => {
    return(
        <div className="container">
        <div className=" flex justify-between items-center mb-5 ">
            <h1 className='text-white text-5xl'>Twoje Drużyny</h1>
            <Link to="/createTournament" className="rounded-md bg-orange-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
                Stwórz drużyne
            </Link>
        </div>
      <ul className="grid grid-cols-2 gap-4">
          <li className="border bg-white border-gray-300 rounded-lg p-4 shadow-sm">
            <div className=" items-center">
            <h3 className="text-lg  font-semibold">Nazwa Drużyny: Torpedy</h3>
            <p className=" font-medium text-gray-600">Opis: Nasza druzyna jest fajna </p>
            </div>
            <p className="text-gray-600">Liczba członków: 25</p>
          </li>
          <li className="border bg-white border-gray-300 rounded-lg p-4 shadow-sm">
            <div className=" items-center">
            <h3 className="text-lg  font-semibold">Nazwa Drużyny: Torpedy</h3>
            <p className=" font-medium text-gray-600">Opis: Nasza druzyna jest fajna </p>
            </div>
            <p className="text-gray-600">Liczba członków: 25</p>
          </li>
      </ul>
    </div>
    );
};

const EditProfile = () => {
    return(
    <div className="container">
    <div className="style='background-color: #394f62;'">
    <div className="flex min-h-full flex-col justify-center px-6 lg:px-8 ">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-15 text-center text-2xl font-bold leading-9 tracking-tight text text-white">Edytuj swój profil</h2>
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
            autoComplete="name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text text-white">
            Email
          </label>
        </div>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text text-white">
            Hasło
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
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
            autoComplete="repeat-password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="description" className="block text-sm font-medium leading-6 text text-white">
            Opis
          </label>
        </div>
        <div className="mt-2">
          <textarea
            id="description"
            name="description"
            rows="4"
            autoComplete="description"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      

      <div>
        <button
          className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          Zatwierdź
        </button>
      </div>
    </div>
    </div>
    <br></br>
    </div>
    </div>
    );
};

const ProfileInfo = () =>{
  return(
    <div className="container">
      <h1 className='text-white text-5xl text-center'>Twoje statystyki</h1>
      <div className="flex justify-center items-center mb-5 mt-5">
      <img className='h-28 w-28 rounded-full ml-10 mb-3 mr-5' src={userAvater} alt="123"/>
      <h2 className='text-white text-2xl'>Nazwa użytkownika</h2>
      </div>
      <div className='flex justify-center text-white'>
        <div className='box-content h-40 w-60 rounded-md bg-slate-700 ml-5 text-center'>
          <p className='text-6xl mb-4 mt-4'>0</p>
          <p className='text-md font-bold'>Turnieje zorganizowane</p>
        </div>
        <div className='box-content h-40 w-60 rounded-md bg-slate-700 ml-5 text-center'>
          <p className='text-6xl mb-4 mt-4'>0</p>
          <p className='text-md font-bold'>Mecze zagrane</p>
        </div>
        <div className='box-content h-40 w-60 rounded-md bg-slate-700 ml-5 text-center'>
          <p className='text-6xl mb-4 mt-4'>0</p>
          <p className='text-md font-bold'>Udział w turniejach</p>
        </div>
        <div className='box-content h-40 w-60 rounded-md bg-slate-700 ml-5 text-center'>
          <p className='text-6xl mb-4 mt-4'>0</p>
          <p className='text-md font-bold'>Turnieje wygrane</p>
        </div>
      </div>
    </div>
  )
}


export const Account = () => {
    const {logout, token} = AuthUser();
    const [activeLink, setActiveLink] = useState(null);

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
      };

      const linkClass = (linkName) => {
        return `text-gray-950 font-medium hover:bg-gray-200  rounded-full px-12 py-2 ${
          activeLink === linkName ? 'bg-gray-200' : ''
        }`;
      };

    const logoutUser = () => {
        if(token != undefined){
            logout();
        }
    };

  return (
    <div className="flex min-h-screen bg-gray-800">
      <div className="bg-gray-500 p-5 w-65">
      
        <h2 className="text-2xl text-white font-semibold mb-4">Panel Użytkownika</h2>
        <ul >
        <li className="mb-4">
            <Link
              to="account/profile"
              className={linkClass('profile')}
              onClick={() => handleLinkClick('profile')}
            >
              Twoje statystyki
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="account/tournaments"
              className={linkClass('tournaments')}
              onClick={() => handleLinkClick('tournaments')}
            >
              Moje turnieje
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="account/teams"
              className={linkClass('teams')}
              onClick={() => handleLinkClick('teams')}
            >
              Moje drużyny
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="account/edit"
              className={linkClass('edit')}
              onClick={() => handleLinkClick('edit')}
            >
              Edycja profilu
            </Link>
          </li>
          <li className="mb-4">
            <Link
              onClick={() => {
                handleLinkClick('logout');
                logoutUser();
              }}
              className={linkClass('logout')}
            >
              Wyloguj
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex-1 pr-10 pt-0 overflow-auto scrollbar-hide ">
      <Routes>
          <Route path="account/profile" element={<ProfileInfo />} />
          <Route path="account/tournaments" element={<MyTournaments />} />
          <Route path="account/teams" element={<MyTeams />} />
          <Route path="account/edit" element={<EditProfile />} />
        </Routes>
      </div>
    </div>
  );
};
