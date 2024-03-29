import React, { useState, useEffect } from 'react';
import Functions from '../components/Functions';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

export const Tournaments = () => {
  const { getGameName, getStatusName } = Functions();
  const [tournaments, setTournaments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { gameId } = useParams(); // Capture the `gameId` from the URL
  const [participantCounts, setParticipantCounts] = useState({});

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get('/api/tournaments');
        let filteredData = response.data;

        // If gameId is present in the URL, filter tournaments by that gameId
        if (gameId) {
          filteredData = filteredData.filter(tournament => tournament.GameID === parseInt(gameId));
        }

        setTournaments(filteredData);
        response.data.forEach(tournament => {
          fetchParticipantCount(tournament.TournamentID);
        });
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };

    fetchTournaments();
  }, [gameId]); 

  const fetchParticipantCount = async (tournamentId) => {
    try {
      const response = await axios.get(`/api/tournaments/${tournamentId}/participants`);
      setParticipantCounts(prevCounts => ({
        ...prevCounts,
        [tournamentId]: response.data.length
      }));
    } catch (error) {
      console.error(`Error fetching participants for tournament ${tournamentId}:`, error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const filteredTournaments = tournaments.filter(tournament =>
    tournament.TournamentName.toLowerCase().includes(searchTerm.toLowerCase())
    );


  return (
    <div className='container '>
      <div className='box text-center'>
      <h2 className='my-4 text-md'>Lista turniejów {gameId && `- ${getGameName(parseInt(gameId))}`}</h2>
        <div className='max-w-md mx-auto '>
          <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg searchInput overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300 ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input
            className="peer h-full w-full text-sm searchInput  text-white pr-2"
            type="text"
            id="search"
            placeholder="Wyszukaj turniej" 
            value={searchTerm}
            onChange={handleSearchChange}/> 
          </div>
        </div>
        {tournaments.length === 0 ? (
          <p className="text-2xl text-gray-500">Brak dostępnych turniejów</p>
        ) : (
            <ul className='flex flex-wrap gap-5 p-0 items-center justify-center mt-5 mb-5'>
              {filteredTournaments.map(tournament => (
                <li className='box tournamentList rounded-lg p-2 xs:w-full hover:bg-amber-700' key={tournament.TournamentID}>
                  <p className='m-3 text-2xl'><b>{tournament.TournamentName}</b></p>
                  <p><b>Organizator:</b> {tournament.organizer}</p>
                  <p><b>Gra:</b> {getGameName(tournament.GameID)}</p>
                  <p><b>Liczba graczy:</b> {participantCounts[tournament.TournamentID] || 'Loading...'}</p>
                  <p><b>Status: </b>{getStatusName(tournament.Status)}</p>
                  <p><b>Pula nagród: </b>{tournament.Prizepool}zł</p>
                  <Link to={`/tournament/${tournament.TournamentID}`}><button>Szczegóły</button></Link>
                </li>
              ))}
            </ul>
        )}
      </div>
    </div>
  );
};
