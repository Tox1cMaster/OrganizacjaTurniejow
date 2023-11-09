import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Functions from '../components/Functions';
import { useParams } from 'react-router-dom'; // import useParams
import AuthUser from '../components/AuthUser';

export const TournamentDetails = () => {
  const { getGameName, getStatusName } = Functions();
  const [participants, setParticipants] = useState([]);
  const [matches, setMatches] = useState([]);
  const [tournament, setTournament] = useState(null);
  const { getUser } = AuthUser();
  const { id } = useParams(); // używamy hooka useParams
  const user = getUser();
  const isUserParticipant = participants.some(participant => participant.UserID === user.id);

  const addParticipant = async () => {
    try {
      await axios.post(`http://localhost:8000/api/participants`, {
        TournamentID: id,
        UserID: user.id // załóżmy, że user ma pole id
      });
      fetchParticipants();
    } catch (error) {
      console.error('Error adding participant:', error);
    }
  };

  const deleteParticipant = (id) => async () => {
    try {
      await axios.delete(`http://localhost:8000/api/participants/${id}`);
      fetchParticipants();
    } catch (error) {
      console.error('Error deleting participant:', error);
    } 
  };

  const generateMatches = (id) => async () => {
    try {
      await axios.post(`http://localhost:8000/api/tournaments/${id}/generate`);
      fetchParticipants();
      fetchTournament();
    } catch (error) {
      console.error('Error deleting participant:', error);
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
  const fetchTournament = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/tournaments/${id}`); // używamy zmiennej id z useParams
      setTournament(response.data);
    } catch (error) {
      console.error('Error fetching tournament details:', error);
    }
  };
  const fetchMatches = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/tournaments/${id}/matches`);
      setMatches(response.data);
    } catch (error) {
      console.error('Error fetching matches details:', error);
    }
  };

  useEffect(() => {
    fetchTournament();
    fetchParticipants();

  }, [id]); // aktualizujemy tablicę zależności, aby używała id

  if (!tournament) {
    return <div className='container'><div className='box'>Ładowanie...</div></div>;
  }

  const isUserOrganizer = tournament.user_id == user.id;
  return (
    <div className='container'>
        <div className='box'>
        <h2>{tournament.TournamentName}</h2>
        <p>Organizator: {tournament.organizer}</p>
        <p>Format: {tournament.TournamentFormat}</p>
        <p>Prywatność: {tournament.Privacy}</p>
        <p>Gra: {getGameName(tournament.GameID)}</p>
        <p>Status: {getStatusName(tournament.Status)}</p>
        <p>Pula nagród: {tournament.Prizepool}</p>
        <button onClick={fetchMatches}>Pokaż mecze</button>
        {isUserParticipant ? <button onClick={deleteParticipant(user.id)}>Zrezygnuj z udziału</button> : <button onClick={addParticipant}>Dołącz jako uczestnik</button>}
        {isUserOrganizer ? <><button className='organizer' onClick={generateMatches(tournament.TournamentID)}>Generuj</button><button className='organizer'>Usuń</button><button className='organizer'>Edytuj</button></> : null}
        <div className='participants'>
        <h2>Uczestnicy:</h2>
        <ul>
          {participants.map(participant => (
            <li key={participant.UserID}>{participant.UserID} - {participant.nickname} {isUserOrganizer ? <>- <a href="#" onClick={deleteParticipant(participant.UserID)}>Usuń</a></> : null}</li> // Zakładam, że uczestnik ma pola id i name
          ))}
        </ul>
        <h2>Mecze:</h2>
        <ul>
          {matches.map(match => (
            <li key={match.match_order}>{match.match_order} - {match.participant1_nick} VS {match.participant2_nick}</li> 
          ))}
        </ul>
        </div>
        </div>
    </div>
  );
};
