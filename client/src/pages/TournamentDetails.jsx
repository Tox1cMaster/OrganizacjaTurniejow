import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Functions from '../components/Functions';
import { useParams, Link, NavLink, Routes, Route } from 'react-router-dom';
import AuthUser from '../components/AuthUser';
import firstPlace from '../assets/firstPlace.png';
import secondPlace from '../assets/secondPlace.png';
import thirdPlace from '../assets/thirdPlace.png';
import userAvatar from '../assets/defaultavatar.png';
import { SingleEliminationBracket, DoubleEliminationBracket, Match, MATCH_STATES, SVGViewer, createTheme, Bracket } from '@g-loot/react-tournament-brackets';

export const TournamentDetails = () => {
  const { getGameName, getStatusName } = Functions();
  const [participants, setParticipants] = useState([]);
  //const [matches, setMatches] = useState([]);
  const [matchesdata, setMatchesdata] = useState([]);
  const [matchesdataorganizer, setMatchesdataorganizer] = useState([]); 
  const [tournament, setTournament] = useState(null);
  const [loadingMatches, setLoadingMatches] = useState(true);
  const { getUser, http } = AuthUser();
  const { id } = useParams();
  const user = getUser(); //Dane zalogowanego użytkownika
  const [isBracketGenerated, setIsBracketGenerated] = useState(false);
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
      setIsBracketGenerated(true);
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
  const matchesByRound = matchesdataorganizer.reduce((acc, match) => {
    if (!acc[match.round]) {
      acc[match.round] = [];
    }
    acc[match.round].push(match);
    return acc;
  }, {});

  useEffect(() => {
    fetchTournament();
    fetchParticipants();
    fetchMatchestoUpdate();
    fetchMatches();
  }, [id]); // aktualizujemy tablicę zależności, aby używała id

  useEffect(() => {
    if (matchesdata && matchesdata.length > 0){
      setIsBracketGenerated(true);
    }
  }, [matchesdata]);

  
  const Summary = () => {

    const [topPlayers, setTopPlayers] = useState ({firstPlace: null, secondPlace: null, thirdPlace: null, fourthPlace: null })
    
    const getPlayerNameById = (id) => {
      const participant = participants.find(p => p.UserID === id);
      return participant ? participant.nickname : 'Unknown Player';
    };

    useEffect (() => {
      if (matchesdata.length > 0) {
        const finalRoundNumber = Math.max(...matchesdata.map(match => parseInt(match.tournamentRoundText, 10)));
        const finalMatch = matchesdata.find(match => parseInt(match.tournamentRoundText, 10) === finalRoundNumber);
        

        if (finalMatch && finalMatch.participants.some(participant => participant.isWinner)){
          const firstPlace = finalMatch.participants.find(p => p.isWinner).id;
          const secondPlace = finalMatch.participants.find(p => !p.isWinner).id;
          const semifinalMatches = matchesdata.filter(match => match.nextMatchId === finalMatch.id);
          const thirdPlace = semifinalMatches.map(match => match.participants.find(p => !p.isWinner && p.id !== firstPlace && p.id !== secondPlace)?.id).filter(Boolean);
          setTopPlayers({ 
            firstPlace: getPlayerNameById(firstPlace), 
            secondPlace: getPlayerNameById(secondPlace), 
            thirdPlace: getPlayerNameById(thirdPlace[0]), 
            fourthPlace: getPlayerNameById(thirdPlace[1]) 
          });
        }
      }
    }, [matchesdata]);
    
    return (
      <div className="container">
        <h2 >{tournament.TournamentName}</h2>
          <div className="flex flex-nowrap">
            <div className="flex flex-wrap flex-col w-9/12">
              <p className='text-3xl mb-3'>Informacje o turnieju</p>
              <p className='py-1 text-xl font-bold'>Organizator: <span className='text-lg font-normal'>{tournament.organizer}</span></p>
              <p className='py-1 text-xl font-bold'>Format: <span className='text-lg font-normal'>{tournament.TournamentFormat}</span></p>
              <p className='py-1 text-xl font-bold'>Prywatność: <span className='text-lg font-normal'>{tournament.Privacy}</span></p>
              <p className='py-1 text-xl font-bold'>Gra: <span className='text-lg font-normal'>{getGameName(tournament.GameID)}</span></p>
              <p className='py-1 text-xl font-bold'>Status: <span className='text-lg font-normal'>{getStatusName(tournament.Status)}</span></p>
              <p className='py-1 text-xl font-bold'>Pula nagród: <span className='text-lg font-normal'>{tournament.Prizepool}</span></p>
              <p className='py-1 text-xl font-bold'>Liczba graczy: <span className='text-lg font-normal'>{participants.length}</span></p>
              <p className='py-1 text-xl font-bold w-6/12'>Opis: <span className='text-lg font-normal'>{tournament.Description}</span></p>

            </div>
            <div className="flex flex-wrap flex-col w-3/12">
              <p className='text-center text-3xl'>Nagrody</p>
              <div className="flex items-center justify-left">
              <img className='w-24 h-24' src={firstPlace} alt="first place photo" />
              <p className='ml-6 text-2xl font-bold'>255 <span className='font-normal'>zł</span></p>
              </div>
              <div className="flex items-center justify-left">
              <img className='w-24 h-24' src={secondPlace} alt="second place photo" />
              <p className='ml-6 text-2xl font-bold'>255 <span className='font-normal'>zł</span></p>
              </div>
              <div className="flex items-center justify-left">
              <img className='w-24 h-24' src={thirdPlace} alt="third place photo" />
              <p className='ml-6 text-2xl font-bold'>255 <span className='font-normal'>zł</span></p>
              </div>
              <p className='text-center text-3xl mt-3'>Najlepsi gracze</p>
              <div className="flex items-center justify-left">
                <img className='w-24 h-24' src={firstPlace} alt="first place" />
                <p className='ml-6 text-2xl font-bold'>{topPlayers.firstPlace || 'Nie wyłoniono'}</p>
              </div>
              <div className="flex items-center justify-left">
                <img className='w-24 h-24' src={secondPlace} alt="second place" />
                <p className='ml-6 text-2xl font-bold'>{topPlayers.secondPlace || 'Nie wyłoniono'}</p>
              </div>
              <div className="flex items-center justify-left">
                <img className='w-24 h-24' src={thirdPlace} alt="third place" />
                <p className='ml-6 text-2xl font-bold'>{topPlayers.thirdPlace || 'Nie wyłoniono'} / {topPlayers.fourthPlace || 'Nie wyłoniono'}</p>
              </div>
            </div>
          </div>
        <div className="flex flex-nowrap items-center justify-center">
          {isUserParticipant ? <button className='deleteTournamentButton' onClick={deleteParticipant(user.id)}>Zrezygnuj z udziału</button> : <button className='joinTournamentButton' onClick={addParticipant}>Dołącz jako uczestnik</button>}
          {isUserOrganizer && !isBracketGenerated ? <button className='organizer' onClick={generateMatches(tournament.TournamentID)}>Generuj</button> : null}
          {isUserOrganizer ? <><button className='deleteTournamentButton'>Usuń</button><Link to='/tournamentEdit' ><button className='organizer'>Edytuj</button></Link></> : null}
        </div>
      </div>
    );
  };

  const Participants = () => {
    return (
      <><h2>Uczestnicy:</h2>
          <ul className="divide-y ">
          {participants.map((participant, index) => (
              <li className="flex items-center py-4 px-6 text-white">
                 <span class="text-white text-2xl font-medium mr-4">{index + 1}.</span>
                 <img class="w-12 h-12 rounded-full object-cover mr-4" src={userAvatar}
                alt="User avatar" />
                <div class="flex-1 ">
                <h3 class="text-lg font-medium text-white">{participant.nickname}</h3> {isUserOrganizer ? <>
                <button className="deleteUserButton " href="#" onClick={deleteParticipant(participant.UserID)}>Usuń</button></> : null}
                </div>
                </li> // Zakładam, że uczestnik ma pola id i name
            ))}
          </ul>
      </>
    );
  };

 
  
const Matches = ({fetchMatches}) => {
  // Grupowanie meczów według rundy
  

  const isUserInMatch = (match) => {
    return match.participant1_id === user.id || match.participant2_id === user.id;
  };
  

  return (
    <>
      {Object.keys(matchesByRound).map((round) => (
        <div key={round}>
          <p className='text-center mt-3 mb-3 text-3xl'>Runda {round}</p>
          {matchesByRound[round].map((match) => (
            <div key={match.id} className='matchlist justify-center items-center mb-3'>
              <div className='matchscore w-64'>
                <label>{match.nick1}</label>
                {isUserInMatch(match) && <input type="number" placeholder="0" id={`score1-${match.id}`} />}
              </div>
              <p className='mt-6 mx-2'>VS</p>
              <div className='matchscore w-64'>
                <label>{match.nick2}</label>
                {isUserInMatch(match) && <input type="number" placeholder="0" id={`score2-${match.id}`} />}
              </div>
              {isUserInMatch(match) && (
                <button className='h-11 mt-4 ' onClick={() => updateMatchScore(match.id, document.getElementById(`score1-${match.id}`).value, document.getElementById(`score2-${match.id}`).value)}>Aktualizuj</button>
              )}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

const Scores = () => {
  return(
    <>
      <div className="container">
        <h2 className='mb-4 mt-2 text-xl'>Wyniki</h2>
        {matchesdata.filter(match => match.participants.length === 2).map((match, index) => (
          <div key={index} className='flex items-center justify-between w-9/12 mx-auto my-1'>
            <div className='flex-1 max-w-[40%] text-left pr-2'>
              <p className={`text-xl font-bold border-l-4 pl-3 ${match.participants[0].isWinner ? 'border-green-600' : 'border-red-600'}`}>
                {match.participants[0].name}
              </p>
            </div>
            <div className='flex-none'>
              <span className='text-lg font-semibold'>
                {match.participants[0].resultText} - {match.participants[1].resultText}
              </span>
            </div>
            <div className='flex-1 max-w-[40%] text-right pl-2'>
              <p className={`text-xl font-bold border-r-4 pr-3 ${match.participants[1].isWinner ? 'border-green-600' : 'border-red-600'}`}>
                {match.participants[1].name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

  
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

const SettingsControlpanel = ({ tournamentId, currentStatus, currentPrivacy, fetchTournament }) => {
  const [turniejStatus, setTurniejStatus] = useState(currentStatus);
  const [turniejPrivacy, setTurniejPrivacy] = useState(currentPrivacy);
  const statusOptions = [0, 1, 2];

  useEffect(() => {
      setTurniejStatus(currentStatus);
      setTurniejPrivacy(currentPrivacy);
  }, [currentStatus, currentPrivacy]);

  const handleSubmit = async () => {
      try {
          await axios.patch(`/api/tournaments/${tournamentId}/status`, { Status: turniejStatus });
          await axios.patch(`/api/tournaments/${tournamentId}/privacy`, { Privacy: turniejPrivacy });
          fetchTournament(); // Odśwież informacje o turnieju
          alert('Zmiany zostały zapisane');
      } catch (error) {
          console.error('Error updating tournament:', error);
          alert('Błąd podczas aktualizacji danych');
      }
  };

  return (
      <div className='container mt-0'>
        <div className='text-center text-3xl mb-4'>
        <label htmlFor="Status" className='mb-3'>Zmień status</label>
          <select
              name="Status"
              value={turniejStatus}
              onChange={e => setTurniejStatus(e.target.value)}
          >
              {statusOptions.map(status => (
                  <option key={status} value={status}>
                      {getStatusName(status)}
                  </option>
              ))}
          </select>
          </div>

          <div className='text-center text-3xl'>
          <label htmlFor="Privacy" className='mb-3'>Zmień Prywatność:</label>
          <select
              name="Privacy"
              value={turniejPrivacy}
              onChange={e => setTurniejPrivacy(e.target.value)}
          >
              <option value="Publiczny">Publiczny</option>
              <option value="Prywatny">Prywatny</option>
          </select>
          <div className='flex justify-center items-center mt-3'>
            <button onClick={handleSubmit}>Wprowadź zmiany</button>
          </div>
        </div>
      </div>
  );
};

const SettingsDetails = () => {
  const [tournamentTitle, setTournamentTitle] = useState('');
  const [tournamentDescription, setTournamentDescription] = useState('');

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await axios.get(`/api/tournaments/${id}`);
        setTournamentTitle(response.data.TournamentName);
        setTournamentDescription(response.data.Description); 
      } catch (error) {
        console.error('Error fetching tournament:', error);
      }
    };

    fetchTournament();
  }, [id]);

  const handleSubmit = async () => {
    try {
      await http.patch(`/tournaments/${id}/updateDescName`, {
        TournamentName: tournamentTitle,
        Description: tournamentDescription
      });
      alert('Zmiany zostały zapisane');
    } catch (error) {
      console.error('Error updating tournament:', error);
      alert('Błąd podczas aktualizacji danych');
    }
  };

  return (
    <div className='container mt-0'>
      <div className='text-center text-3xl mb-4'>
        <label htmlFor="title" className='mb-3'>Zmień Tytuł Turnieju</label>
        <input 
          id='title' 
          type='text' 
          placeholder='Ustaw tytuł turnieju'
          value={tournamentTitle}
          onChange={(e) => setTournamentTitle(e.target.value)}
        />
      </div>
      <div className='text-center text-3xl'>
        <label htmlFor="description" className='mb-3'>Zmień Opis Turnieju:</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          autoComplete="description"
          placeholder='Ustaw opis turnieju'
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          value={tournamentDescription}
          onChange={(e) => setTournamentDescription(e.target.value)}
        />
      </div>
      <div className='flex justify-center items-center mt-3'>
        <button onClick={handleSubmit}>Wprowadź zmiany</button>
      </div>
    </div>
  );
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

const SettingsRules = () => {
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState('');

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const response = await axios.get(`/api/tournaments/${id}/rules`);
      setRules(response.data.rules); // Zakładam, że backend zwraca zasady jako 'rules'
    } catch (error) {
      console.error('Error fetching rules:', error);
    }
  };

  const handleAddRule = async () => {
    if (newRule.trim() !== '') {
      try {
        await axios.post(`/api/tournaments/${id}/rules/add`, {
          rule_order: rules.length + 1, 
          rule_text: newRule
        });
        setNewRule('');
        fetchRules(); // Odświeża listę zasad
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleDeleteRule = async (ruleOrder) => {
    try {
      await axios.delete(`/api/tournaments/${id}/rules/${ruleOrder}`);
      fetchRules(); // Odświeża listę zasad
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Zasady</h2>
      <div className="text-center text-lg mt-4">
        <table className="w-full border border-collapse">
          <thead>
            <tr className="bg-black-400">
              <th className="border p-2">#</th>
              <th className="border p-2">Zasada</th>
              <th className="border p-2">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : ''}>
                <td className="border p-2">{rule.rule_order}</td>
                <td className="border p-2">{rule.rule_text}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDeleteRule(rule.rule_order)}
                    className="bg-red-500 text-white p-1 rounded hover:bg-red-700"
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Wprowadź nową zasadę..."
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
            className="border p-2 w-2/3"
          />
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
  return (<><h2>Mecze</h2>
  {Object.keys(matchesByRound).map((round) => (
            <div key={round}>
              <p className='text-center mt-3 mb-3 text-3xl'>Runda {round}</p>
              {matchesByRound[round].map((match) => (
                <div key={match.id} className='matchlist justify-center items-center mb-3'>
                  <div className='matchscore w-64'>
                    <label>{match.nick1}</label>
                    <input type="number" placeholder="0" id={`score1-${match.id}`} />
                  </div>
                  <p className='mt-6 mx-2'>VS</p>
                  <div className='matchscore w-64'>
                    <label>{match.nick2}</label>
                    <input type="number" placeholder="0" id={`score2-${match.id}`} />
                  </div>
                  <button className='h-11 mt-4 ' onClick={() => updateMatchScore(match.id, document.getElementById(`score1-${match.id}`).value, document.getElementById(`score2-${match.id}`).value)}>Aktualizuj</button>
                </div>
              ))}
            </div>
          ))}</>);
};

const Rules = () => {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await axios.get(`/api/tournaments/${id}/rules`);
        setRules(response.data.rules);
      } catch (error) {
        console.error('Error fetching rules:', error);
      }
    };

    fetchRules();
  }, [id]);

  if (rules.length === 0) {
    return <p>Brak zasad.</p>;
  }

  return (
    <div>
      {rules.map((rule, index) => (
        <p key={index}>{index + 1}. {rule.rule_text}<br /></p>
      ))}
    </div>
  );
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
    {activeTab2 === "SettingsControlpanel" && <SettingsControlpanel
        tournamentId={id}
        currentStatus={tournament.Status}
        currentPrivacy={tournament.Privacy}
        fetchTournament={fetchTournament}
    />}
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
              <NavLink to={``} className={activeTab === "scores" ? activeLinkClass : inactiveLinkClass} onClick={() => handleTabChange("scores")}>
                Wyniki
              </NavLink>
            </li>
            <li>
            {isUserOrganizer ?<NavLink to={``} className={activeTab === "settings" ? activeLinkClass : inactiveLinkClass} onClick={() => handleTabChange("settings")} >
                Ustawienia
              </NavLink> : null}
            </li> 
          </ul>
        </div>
        {activeTab === "settings" && <Settings />}
        <div className="participants">
        {activeTab === "summary" && <Summary />}
        {activeTab === "bracket" && <Brackett />}
        {activeTab === "participants" && <Participants />}
        {activeTab === "matches" && <Matches fetchMatches={fetchMatches} />}
        {activeTab === "scores" && <Scores />}
        {activeTab === "rules" && <Rules />}
        </div>
        </div>
    </div>  
  );
};