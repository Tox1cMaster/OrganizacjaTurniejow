import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import csgo from '../assets/csgo.png';
import gra1 from '../assets/gra1.jpg';
import gra2 from '../assets/gra2.jpg';
import gra3 from '../assets/gra3.jpg';



export const Games = () => {
  const [searchGame, setSearchGame] = useState('');
  const gamesData = [
    {
      title: "CS GO",
      description: "Some quick example text for CS GO.",
      buttonText: "Play CS GO",
      image: csgo,
    },
    {
      title: "League of Legends",
      description: "Some quick.",
      buttonText: "Play League of Legends",
      image: gra1,
    },
    {
      title: "EA FC 24",
      description: "Some quick example text for EA FC 24.",
      buttonText: "Play EA FC 24",
      image: gra2,
    },
    {
      title: "EA FC 24",
      description: "Some quick example text for EA FC 24.",
      buttonText: "Play EA FC 24",
      image: gra3,
    },
  ];
  const handleSearchGame = (e) => {
    setSearchGame(e.target.value);
  }

  const filteredGames = gamesData.filter(game =>
    game.title.toLowerCase().includes(searchGame.toLowerCase())
    );

  return (
<>
<div className="container">
  <div className="box">
    <h1 className="text-center text-white text-3xl font-bold my-4">Popularne gry</h1>
    <div className='max-w-md mx-auto my-4'>
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
          placeholder="Wyszukaj grę" 
          value={searchGame}
          onChange={handleSearchGame} /> 
      </div>
    </div>
      <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-4 mx-auto max-w-6xl mb-5 px-3">
        {filteredGames.map((game, index) => (
          <div key={index} className="box rounded-lg mb-3">
            <img className="w-full h-44 object-cover rounded-lg block m-0 p-0" src={game.image} alt="Game" />
            <div className="px-6 py-4">
              <div className="font-bold text-2xl mb-2">{game.title}</div>
              <p className="text-white text-sm">{game.description}</p>
            </div>
            <div className="px-6 pt-2 pb-2">
              <button className="bg-amber-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                {game.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</>
  )
}