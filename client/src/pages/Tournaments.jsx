import React, { useState, useEffect } from 'react';
import Functions from '../components/Functions';
import axios from 'axios';
import {Link} from "react-router-dom";

export const Tournaments = () => {
  const {getGameName, getStatusName} = Functions();
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    // Funkcja do pobierania listy turniejów z API
    const fetchTournaments = async () => {
      try {
        const response = await axios.get('/api/tournaments'); // Załóżmy, że twój endpoint to '/api/tournaments'
        setTournaments(response.data); // Ustawienie stanu tournaments na dane otrzymane z API
      } catch (error) {
        console.error('Error fetching tournaments:', error);
        // Można tutaj dodać obsługę błędów, np. wyświetlenie komunikatu użytkownikowi
      }
    };

    fetchTournaments();
  }, []);

  return (
    <div className='container'>
      <div className='box text-center'>
        <h2>Lista turniejów</h2>
        {tournaments.length === 0 ? (
          <p className="text-2xl text-gray-500">Brak dostępnych turniejów</p>
        ) : (
          <ul>
            {tournaments.map(tournament => (
              <li key={tournament.TournamentID}>
                <h3>{tournament.TournamentName}</h3>
                <p>Organizator: {tournament.organizer}</p>
                <p>Gra: {getGameName(tournament.GameID)}</p>
                <p>Format: {tournament.TournamentFormat}</p>
                <p>Prywatność: {tournament.Privacy}</p>
                <p>Status: {getStatusName(tournament.Status)}</p>
                <p>Pula nagród: {tournament.Prizepool}zł</p>
                <Link to={`/tournament/${tournament.TournamentID}`}><button>Szczegóły</button></Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
