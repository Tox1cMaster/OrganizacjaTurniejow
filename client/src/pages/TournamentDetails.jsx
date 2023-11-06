import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Functions from '../components/Functions';
import { useParams } from 'react-router-dom'; // import useParams

export const TournamentDetails = () => {
  const { getGameName, getStatusName } = Functions();
  const [tournament, setTournament] = useState(null);
  const { id } = useParams(); // używamy hooka useParams

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/tournaments/${id}`); // używamy zmiennej id z useParams
        setTournament(response.data);
      } catch (error) {
        console.error('Error fetching tournament details:', error);
      }
    };

    fetchTournament();
  }, [id]); // aktualizujemy tablicę zależności, aby używała id

  if (!tournament) {
    return <div className='container'><div className='box'>Ładowanie...</div></div>;
  }

  return (
    <div className='container'>
        <div className='box'>
        <h2>{tournament.TournamentName}</h2>
        <p>Format: {tournament.TournamentFormat}</p>
        <p>Prywatność: {tournament.Privacy}</p>
        <p>Gra: {getGameName(tournament.GameID)}</p>
        <p>Status: {getStatusName(tournament.Status)}</p>
        <p>Pula nagród: {tournament.Prizepool}</p>
        </div>
    </div>
  );
};
