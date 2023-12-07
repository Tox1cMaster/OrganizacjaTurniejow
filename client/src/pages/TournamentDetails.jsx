import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Functions from '../components/Functions';
import { useParams, Link, NavLink, Routes, Route } from 'react-router-dom';
import AuthUser from '../components/AuthUser';
import firstPlace from '../assets/firstPlace.png';
import secondPlace from '../assets/secondPlace.png';
import thirdPlace from '../assets/thirdPlace.png';
import { SingleEliminationBracket, DoubleEliminationBracket, Match, MATCH_STATES, SVGViewer, createTheme, Bracket } from '@g-loot/react-tournament-brackets';

export const TournamentDetails = () => {
  const { getGameName, getStatusName } = Functions();
  const [participants, setParticipants] = useState([]);
  //const [matches, setMatches] = useState([]);
  const [matchesdata, setMatchesdata] = useState([]);
  const [matchesdataorganizer, setMatchesdataorganizer] = useState([]); 
  const [tournament, setTournament] = useState(null);
  const [loadingMatches, setLoadingMatches] = useState(true);
  const { getUser } = AuthUser();
  const { id } = useParams();
  const user = getUser(); //Dane zalogowanego użytkownika
  const isUserParticipant = participants.some(participant => participant.UserID === user.id);
  //Obsługa zakładek
  const activeLinkClass = 'text-orange-600 font-bold border-b-4 border-orange-500';
  const inactiveLinkClass = 'text-gray-300 hover:text-orange-500 hover:border-b-2 hover:border-orange-500';
  const activeLinkClass2 = 'text-orange-600 font-bold border-l-4 border-orange-500';
  const inactiveLinkClass2 = 'text-gray-300 hover:text-orange-500 hover:border-l-2 hover:border-orange-500';
  const [activeTab, setActiveTab] = useState("summary");
  const [activeTab2, setActiveTab2] = useState("summary");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const handleTabChange2 = (tab) => {
    setActiveTab2(tab);
  };

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

  
  const Summary = () => {
    return (
      <div className="participants"><h2>{tournament.TournamentName}</h2>
        <p>Organizator: {tournament.organizer}</p>
        <p>Format: {tournament.TournamentFormat}</p>
        <p>Prywatność: {tournament.Privacy}</p>
        <p>Gra: {getGameName(tournament.GameID)}</p>
        <p>Status: {getStatusName(tournament.Status)}</p>
        <p>Pula nagród: {tournament.Prizepool}</p>
        {isUserParticipant ? <button onClick={deleteParticipant(user.id)}>Zrezygnuj z udziału</button> : <button onClick={addParticipant}>Dołącz jako uczestnik</button>}
        {isUserOrganizer ? <><button className='organizer' onClick={generateMatches(tournament.TournamentID)}>Generuj</button><button className='organizer'>Usuń</button><Link to='/tournamentEdit' ><button className='organizer'>Edytuj</button></Link></> : null}
        </div>
    );
  };

  const Participants = () => {
    return (
      <><h2>Uczestnicy:</h2>
        <ul>
          {participants.map(participant => (
            <li key={participant.UserID}>{participant.UserID} - {participant.nickname} {isUserOrganizer ? <>- <a href="#" onClick={deleteParticipant(participant.UserID)}>Usuń</a></> : null}</li> // Zakładam, że uczestnik ma pola id i name
          ))}
        </ul></>
    );
  };

 
  const Matches = () => {
    return (<>
    <h2>Mecze:</h2>
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
    </>);
  };

  
const Brackett = () => {
  return (<>
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
  )}</>
  );
};

const SettingsControlpanel = ({ turniejStatus, setTurniejStatus }) => {
  
  const statusy = [0, 1, 2];

  return (
    <div className='container mt-0'>
      <div className='text-center text-3xl mb-4'>
        <label htmlFor="Status" className='mb-3'>Zmień status</label>
        <select
          name="Status"
          value={turniejStatus}
        >
          {statusy.map((status, index) => (
            <option key={index} value={status}>
              {getStatusName(status)}
            </option>
          ))}
        </select>
      </div>

      <div className='text-center text-3xl'>
      <label htmlFor="Privacy" className='mb-3'>Zmień Prywatność:</label>
      <select name="Privacy">
          <option value="Publiczny">Publiczny</option>
          <option value="Prywatny">Prywatny</option>
      </select>
      </div>
      
      <div className='flex justify-center items-center mt-3'>
        <button>Wprowadź zmiany</button>
      </div>
    </div>
  );
};

const SettingsDetails = () => {
  return (
  <>
    <div className='container mt-0'>
      <div className='text-center text-3xl mb-4'>
        <label htmlFor="title" className='mb-3'>Zmień Tytuł Turnieju</label>
        <input type='text' />
      </div>

      <div className='text-center text-3xl'>
      <label htmlFor="description" className='mb-3'>Zmień Opis Turnieju:</label>
      <textarea
            id="description"
            name="description"
            rows="4"
            autoComplete="description"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />
      </div>
      <div className='flex justify-center items-center mt-3'>
        <button>Wprowadź zmiany</button>
      </div>
    </div>
  </>);
};

const SettingsRewards = () => {

  
  return (
  <>
    
    <div className='flex-1'>
    <h2>Nagrody</h2>
      <div className="flex flex-nowrap items-center justify-center">
        <img className='w-32 h-32 mr-2' src={firstPlace} alt="first place icon" />
        <input className='rewardsInput'  type="number" placeholder='Wprowadź nagrodę dla 1 miejsca' />
      </div>
      <div className="flex flex-nowrap items-center justify-center">
        <img className='w-32 h-32 mr-2' src={secondPlace} alt="second place icon" />
        <input className='rewardsInput' type="number" placeholder='Wprowadź nagrodę dla 2 miejsca' />
      </div>
      <div className="flex flex-nowrap items-center justify-center">
        <img className='w-32 h-32 mr-2' src={thirdPlace} alt="third place icon" />
        <input className='rewardsInput' type="number" placeholder='Wprowadź nagrodę dla 3 miejsca' />
      </div>
      <div className='flex justify-center items-center mt-3 '>
        <button>Zaktualizuj nagrody</button>
      </div>
    </div>
  </>
  );
};

const SettingsRules = ({ addRule }) => {
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState('');
  const [allRules, setAllRules] = useState([]);

  const handleAddRule = () => {
    if (newRule.trim() !== '') {
      setRules([...rules, newRule]);
      addRule(newRule);
      setNewRule('');
    }

  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Zasady</h2>
      <div className="text-center text-lg mt-4">
        {/* Display rules in a table */}
        <table className="w-full border border-collapse">
          <thead>
            <tr className="bg-black-400">
              <th className="border p-0">#</th>
              <th className="border p-3">Zasada</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : ''}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{rule}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Input field to manually enter rules */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Wprowadź nową zasadę..."
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
            className="border p-2 w-2/3"
          />
          {/* Button to add a new rule */}
          <button
            onClick={handleAddRule}
            className="ml-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            Dodaj nową zasadę
          </button>
        </div>
      </div>
    </>
  );
};

const SettingsTimetable = () => {
  return (<><h2>Harmonogram</h2></>);
};

const SettingsMatches = () => {
  return (<><h2>Mecze</h2></>);
};


const Settings = () => {
  return (<><div className="flex h-screen navsettings">
  <div className="w-1/6 text-white border-r border-orange-800 navleft space-x-4 p-3">
    <ul className="flex flex-col">
      <li className={activeTab2 === "SettingsControlpanel" ? activeLinkClass2 : inactiveLinkClass2} onClick={() => handleTabChange2("SettingsControlpanel")}>
        <NavLink to={``}>Panel kontrolny</NavLink>
      </li>
      <li className={activeTab2 === "SettingsDetails" ? activeLinkClass2 : inactiveLinkClass2} onClick={() => handleTabChange2("SettingsDetails")}>
        <NavLink to={``}>Szczegóły</NavLink>
      </li>
      <li className={activeTab2 === "SettingsRewards" ? activeLinkClass2 : inactiveLinkClass2} onClick={() => handleTabChange2("SettingsRewards")}>
        <NavLink to={``}>Nagrody</NavLink>
      </li>
      <li className={activeTab2 === "SettingsRules" ? activeLinkClass2 : inactiveLinkClass2} onClick={() => handleTabChange2("SettingsRules")}>
        <NavLink to={``}>Zasady</NavLink>
      </li>
      <li className={activeTab2 === "SettingsTimetable" ? activeLinkClass2 : inactiveLinkClass2} onClick={() => handleTabChange2("SettingsTimetable")}>
        <NavLink to={``}>Harmonogram</NavLink>
      </li>
      <li className={activeTab2 === "SettingsMatches" ? activeLinkClass2 : inactiveLinkClass2} onClick={() => handleTabChange2("SettingsMatches")}>
        <NavLink to={``}>Zarządzaj meczami</NavLink>
      </li>
    </ul>
  </div>
  <div className="w-5/6 ml-auto p-8">
    {activeTab2 === "SettingsControlpanel" && <SettingsControlpanel />}
    {activeTab2 === "SettingsDetails" && <SettingsDetails />}
    {activeTab2 === "SettingsRewards" && <SettingsRewards />}
    {activeTab2 === "SettingsRules" && <SettingsRules />}
    {activeTab2 === "SettingsTimetable" && <SettingsTimetable />}
    {activeTab2 === "SettingsMatches" && <SettingsMatches />}
  </div>
</div></>
  );
};

  if (!tournament || loadingMatches) {
    return <div className='container'><div className='box'>Ładowanie...</div></div>;
  }

  const isUserOrganizer = tournament.user_id == user.id;

  return (
    <div className='container'>
        <div className='box'>
        <div className='navbar border-b border-orange-800 navbar-shadow font-bo'>
          <ul className='flex justify-start p-3 space-x-4'>
            <li>
              <NavLink to={``} className={activeTab === "summary" ? activeLinkClass : inactiveLinkClass} onClick={() => handleTabChange("summary")}>
                Podsumowanie
              </NavLink>
            </li>
            <li>
              <NavLink to={``} className={activeTab === "bracket" ? activeLinkClass : inactiveLinkClass} onClick={() => handleTabChange("bracket")}>
                Drabinka
              </NavLink>
            </li>
            <li>
              <NavLink to={``} className={activeTab === "participants" ? activeLinkClass : inactiveLinkClass} onClick={() => handleTabChange("participants")} >
                Uczestnicy
              </NavLink>
            </li>
            <li>
              <NavLink to={``} className={activeTab === "matches" ? activeLinkClass : inactiveLinkClass} onClick={() => handleTabChange("matches")} >
                Mecze
              </NavLink>
            </li>
            <li>
              <NavLink to={``} className={activeTab === "classification" ? activeLinkClass : inactiveLinkClass} onClick={() => handleTabChange("classification")}>
                Klasyfikacja
              </NavLink>
            </li>
            <li>
              <NavLink to={``} className={activeTab === "rules" ? activeLinkClass : inactiveLinkClass} onClick={() => handleTabChange("rules")}>
                Zasady
              </NavLink>
            </li>
            <li>
              <NavLink to={``} className={activeTab === "admin" ? activeLinkClass : inactiveLinkClass} onClick={() => handleTabChange("admin")}>
                Admin
              </NavLink>
            </li>
            <li>
              <NavLink to={``} className={activeTab === "settings" ? activeLinkClass : inactiveLinkClass} onClick={() => handleTabChange("settings")} >
                Ustawienia
              </NavLink>
            </li>
          </ul>
        </div>
        {activeTab === "settings" && <Settings />}
        <div className="participants">
        {activeTab === "summary" && <Summary />}
        {activeTab === "bracket" && <Brackett />}
        {activeTab === "participants" && <Participants />}
        {activeTab === "matches" && <Matches />}
        </div>
        </div>
    </div>  
  );
};