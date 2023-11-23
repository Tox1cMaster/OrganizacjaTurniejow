import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Functions from '../components/Functions';
import { useParams, Link } from 'react-router-dom'; // import useParams
import AuthUser from '../components/AuthUser';
import { SingleEliminationBracket, DoubleEliminationBracket, Match, MATCH_STATES, SVGViewer, createTheme } from '@g-loot/react-tournament-brackets';

export const TournamentDetails = () => {
  const { getGameName, getStatusName } = Functions();
  const [participants, setParticipants] = useState([]);
  //const [matches, setMatches] = useState([]);
  const [matchesdata, setMatchesdata] = useState([]);
  const [matchesdataorganizer, setMatchesdataorganizer] = useState([]); //
  const [tournament, setTournament] = useState(null);
  const [loadingMatches, setLoadingMatches] = useState(true);
  const { getUser } = AuthUser();
  const { id } = useParams(); // używamy hooka useParams
  const user = getUser();
  const isUserParticipant = participants.some(participant => participant.UserID === user.id);

  const addParticipant = async () => {
    try {
      await axios.post(`/api/participants`, {
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
      await axios.delete(`/api/participants/${id}`);
      fetchParticipants();
    } catch (error) {
      console.error('Error deleting participant:', error);
    } 
  };

  const generateMatches = (id) => async () => {
    try {
      await axios.post(`/api/tournaments/${id}/generate`);
      fetchParticipants();
      fetchTournament();
      fetchMatches();
    } catch (error) {
      console.error('Error deleting participant:', error);
    } 
  };

  const fetchParticipants = async () => {
    try {
      const response = await axios.get(`/api/tournaments/${id}/participants`);
      setParticipants(response.data);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };
  const fetchTournament = async () => {
    try {
      const response = await axios.get(`/api/tournaments/${id}`); // używamy zmiennej id z useParams
      setTournament(response.data);
    } catch (error) {
      console.error('Error fetching tournament details:', error);
    }
  };
  const fetchMatches = async () => {
    try {
      setLoadingMatches(true);
      const response = await axios.get(`/api/tournaments/${id}/matches`);
      setMatchesdata(response.data);
      setLoadingMatches(false);
    } catch (error) {
      console.error('Error fetching matches details:', error);
      setLoadingMatches(false); // Stop loading on error
    }
  };
  const fetchMatchestoUpdate = async () => {
    try {
      const response = await axios.get(`/api/tournaments/${id}/matchesorg`);
      setMatchesdataorganizer(response.data);
    } catch (error) {
      console.error('Error fetching matches details:', error);
    }
  }
  const updateMatchScore = async (matchId, participant1Score, participant2Score) => {
    try {
      await axios.put(`/api/updatematch/${matchId}`, {
        participant1_score: participant1Score,
        participant2_score: participant2Score
      });
      fetchMatches(); // Odśwież listę meczów po aktualizacji
    } catch (error) {
      console.error('Error updating match score:', error);
    }
  };

  useEffect(() => {
    fetchTournament();
    fetchParticipants();
    fetchMatchestoUpdate();
    fetchMatches();
  }, [id]); // aktualizujemy tablicę zależności, aby używała id

  if (!tournament || loadingMatches) {
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
        {isUserParticipant ? <button onClick={deleteParticipant(user.id)}>Zrezygnuj z udziału</button> : <button onClick={addParticipant}>Dołącz jako uczestnik</button>}
        {isUserOrganizer ? <><button className='organizer' onClick={generateMatches(tournament.TournamentID)}>Generuj</button><button className='organizer'>Usuń</button><Link to='/tournamentEdit' ><button className='organizer'>Edytuj</button></Link></> : null}
        <div className='participants'>
        <h2>Uczestnicy:</h2>
        <ul>
          {participants.map(participant => (
            <li key={participant.UserID}>{participant.UserID} - {participant.nickname} {isUserOrganizer ? <>- <a href="#" onClick={deleteParticipant(participant.UserID)}>Usuń</a></> : null}</li> // Zakładam, że uczestnik ma pola id i name
          ))}
        </ul>
        <h2>Mecze:</h2>
        {!loadingMatches && matchesdata.length > 0 && (
        <SingleEliminationBracket
          matches={matchesdata}
          matchComponent={Match}
          svgWrapper={({ children, ...props }) => (
            <SVGViewer width={1300} height={1300} {...props} background="#0f0f0f" SVGBackground="#0f0f0f">
              {children}
            </SVGViewer>
          )}
        />
        )}
        {isUserOrganizer ? <>
        <h2>Zarządzaj meczami:</h2>
          {matchesdataorganizer.map(match => (
            <div key={match.id} className='matchlist'>
            <p>{match.id} - {match.nick1} vs {match.nick2} - {match.winner_id}</p>
            <div className='matchscore'>
              <label>{match.nick1}</label>
              <input type="number" placeholder="0" id={`score1-${match.id}`} />
            </div>
            <div className='matchscore'>
              <label>{match.nick2}</label>
              <input type="number" placeholder="0" id={`score2-${match.id}`} />
            </div>
            <button onClick={() => updateMatchScore(match.id, document.getElementById(`score1-${match.id}`).value, document.getElementById(`score2-${match.id}`).value)}>Aktualizuj</button>
          </div>
            ))}
        </> : null}
        </div>
        </div>
    </div>
  );
};
