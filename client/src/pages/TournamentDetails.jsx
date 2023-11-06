import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Functions from '../components/Functions';
import { useParams } from 'react-router-dom'; // import useParams
import AuthUser from '../components/AuthUser';

export const TournamentDetails = () => {
  const { getGameName, getStatusName } = Functions();
  const [participants, setParticipants] = useState([]);
  const [tournament, setTournament] = useState(null);
  const { getUser } = AuthUser();
  const { id } = useParams(); // używamy hooka useParams
  const user = getUser();

  const addParticipant = async () => {
    try {
      await axios.post(`http://localhost:8000/api/participants`, {
        TournamentID: id,
        UserID: user.id // załóżmy, że user ma pole id
      });
      // Tutaj powinieneś zaktualizować listę uczestników
    } catch (error) {
      console.error('Error adding participant:', error);
    }
  };

  const fetchParticipants = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/tournaments/${id}/participants`);
      setParticipants(response.data);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };

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
    fetchParticipants();
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
        <button onClick={addParticipant}>Dołącz jako uczestnik</button>
        <div className='participants'>
        <h2>Uczestnicy:</h2>
        <ul>
          {participants.map(participant => (
            <li key={participant.UserID}>{participant.UserID} - {participant.nickname}</li> // Zakładam, że uczestnik ma pola id i name
          ))}
        </ul>
        </div>
        </div>
    </div>
  );
};
