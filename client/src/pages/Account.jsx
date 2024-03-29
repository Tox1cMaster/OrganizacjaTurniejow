import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import AuthUser from '../components/AuthUser';
import '../App.css';
import axios from 'axios';
import Functions from '../components/Functions';
import userAvatar from '../assets/defaultavatar.png'

const MyTournaments = ({ tournament }) => {
  const { getGameName, getStatusName } = Functions();
  const [tournaments, setTournaments] = useState([]);
  const { getUser } = AuthUser();
  const user = getUser();

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
    <div className="container xs:mt-12 xs:text-center sm:text-left">
      <div className=" flex md:justify-between items-center xs:justify-center xs:flex-wrap md:mb-3 xs:mb-5 xs:flex-col md:flex-row ">
        <h1 className='text-white text-5xl xs:mb-10'>Twoje Turnieje</h1>
        <Link to="/createTournament" className="rounded-md bg-orange-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
          Stwórz turniej
        </Link>
      </div>
      <ul className="space-y-4">
        {tournaments.filter(tournament => tournament.user_id === user.id).map((tournament) => (
          <Link to={`/tournament/${tournament.TournamentID}`}>
            <li key={tournament.TournamentName} className="border bg-white border-gray-300 rounded-lg p-4 shadow-sm mb-2">
              <div className="flex sm:justify-between xs:justify-center xs:flex-col xs:flex-wrap md:flex-row items-center sm:text-center md:text-left">
                <h3 className="text-lg font-semibold">Nazwa turnieju:
                  <p className='font-bold text-2xl xs:mb-3'>{tournament.TournamentName}</p>
                </h3>
                <div className="text-sm font-medium text-gray-600 w-36 ">Status:
                <p className='font-bold text-sm xs:mb-3 '>{getStatusName(tournament.Status)}</p>
                </div>
              </div>
              <p className="text-gray-600 sm:text-center md:text-left">Gra:
                <p className='font-bold text-base'>{getGameName(tournament.GameID)}</p>
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

const EditProfile = () => {
  return (
    <div className="container xs:mt-12 xs:text-center">
      <div className="style='background-color: #394f62;'">
        <div className="flex min-h-full flex-col justify-center px-6 lg:px-8 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-15 text-center text-2xl font-bold leading-9 tracking-tight text text-white">Edytuj swój profil</h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
            <div className="flex flex-col items-center">
              <label htmlFor="avatar" className="block text-sm font-medium leading-6 text text-white">
                Zdjęcie profilowe
              </label>
              <div className="mt-2">
                <div className="flex items-center justify-center flex-col">
                  <img src={userAvatar} alt="Zdjęcie profilowe" className="w-25 h-25 rounded-full mb-2 mr-3 mx-auto" />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-left text-white">
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

const ProfileInfo = () => {
  const [stats, setStats] = useState([]); // [0] - tournaments organized, [1] - tournaments participated, [2] - tournaments won, [3] - matches played
  const { getUser } = AuthUser();
  const user = getUser();

  useEffect(() => {

    const fetchStats = async () => {
      try {
        const response = await axios.get(`/api/user/stats/${user.id}`);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);
  return (
    <div className="container xs:mt-12 xs:text-center">
      <h1 className='text-white font-bold xs:mt-0 xs:text-xl md:text-5xl text-center'>Moje statystyki</h1>
      <div className="flex justify-center items-center mb-5 mt-5 xs:flex-wrap">
        <img className='xs:w-16 xs:h-16 sm:h-28 sm:w-28 rounded-full xs:mt-0 ml-10 mb-3 mr-5' src={userAvatar} alt="123" />
        <h2 className='text-white text-2xl'>{user.name}</h2>
      </div>
      <div className='flex justify-center text-white xs:flex-wrap'>
        <div className='box-content xs:h-32 xs:w-32 sm:h-40 sm:w-60 rounded-md bg-indigo-500 ml-5 text-center xs:mb-5 hover:bg-orange-500'>
          <p className='xs:text-4xl sm:text-6xl mb-4 mt-4 '>{stats.tournaments_organized}</p>
          <p className='xs:text-sm  sm:text-md font-bold '>Turnieje zorganizowane</p>
        </div>
        <div className='box-content xs:h-32 xs:w-32 sm:h-40 sm:w-60 rounded-md bg-indigo-500 ml-5 text-center xs:mb-5 hover:bg-orange-500'>
          <p className='xs:text-4xl sm:text-6xl mb-4 mt-4'>{stats.matches_played}</p>
          <p className='xs:text-sm xs:px-2 font-bold'>Mecze zagrane</p>
        </div>
        <div className='box-content xs:h-32 xs:w-32 sm:h-40 sm:w-60 rounded-md bg-indigo-500 ml-5 text-center xs:mb-5 hover:bg-orange-500'>
          <p className='xs:text-4xl sm:text-6xl mb-4 mt-4'>{stats.tournaments_joined}</p>
          <p className='xs:text-sm xs:px-2 font-bold'>Udział w turniejach</p>
        </div>
        <div className='box-content xs:h-32 xs:w-32 sm:h-40 sm:w-60 rounded-md bg-indigo-500 ml-5 text-center xs:mb-5 hover:bg-orange-500'>
          <p className='xs:text-4xl sm:text-6xl mb-4 mt-4'>{stats.tournaments_wins}</p>
          <p className='xs:text-sm xs:px-2 font-bold'>Turnieje wygrane</p>
        </div>
      </div>
    </div>
  )
}


export const Account = () => {
  const { logout, token } = AuthUser();
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  const linkClass = (linkName) => {
    return `break-normal text-gray-950 xs:px-2 xs:py-1 font-medium hover:bg-orange-500  rounded-full md:px-12 md:py-2 ${activeLink === linkName ? 'bg-gray-200' : ''
      }`;
  };

  const logoutUser = () => {
    if (token != undefined) {
      logout();
    }
  };

  return (
    <div className="flex min-h-screen bg-indigo-950">
      <div className="bg-indigo-500 xs:w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/6 text-center">
        <h2 className="xs:text-md md:text-2xl text-white font-semibold mb-4 mt-5">Panel Użytkownika</h2>
        <ul className='xs:text-center'>
          <li className="xs:text-sm xs:text-center break-words mb-4">
            <Link
              to="account/profile"
              className={linkClass('profile')}
              onClick={() => handleLinkClick('profile')}
            >
              Moje statystyki
            </Link>
          </li>
          <li className="xs:text-sm mb-4">
            <Link
              to="account/tournaments"
              className={linkClass('tournaments')}
              onClick={() => handleLinkClick('tournaments')}
            >
              Moje turnieje
            </Link>
          </li>
          <li className="xs:text-sm mb-4">
            <Link
              to="account/edit"
              className={linkClass('edit')}
              onClick={() => handleLinkClick('edit')}
            >
              Edycja profilu
            </Link>
          </li>
          <li className="xs:text-sm mb-4">
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

      <div className="flex-1 xs:pr-4 pr-10 pt-0 overflow-auto scrollbar-hide ">
        <Routes>
          <Route path="account/profile" element={<ProfileInfo />} />
          <Route path="account/tournaments" element={<MyTournaments />} />
          <Route path="account/edit" element={<EditProfile />} />
        </Routes>
      </div>
    </div>
  );
};
