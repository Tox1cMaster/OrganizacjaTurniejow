import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import csgo from '../assets/csgo.png'

const gamesData = [
  {
    title: "CS GO",
    description: "Some quick example text for CS GO.",
    buttonText: "Play CS GO",
  },
  {
    title: "League of Legends",
    description: "Some quick.",
    buttonText: "Play League of Legends",
  },
  {
    title: "EA FC 24",
    description: "Some quick example text for EA FC 24.",
    buttonText: "Play EA FC 24",
  },
];

export const Games = () => {
  const imageSize = {
    margin: '0',
    height: '200px',
  };

  const cardStyle = {
    width: '25rem',
  };
  return (
    <>
    <h1 className="text-center text-white text-3xl font-bold my-6">Popularne gry</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto max-w-6xl">
        {gamesData.map((game, index) => (
          <div key={index} className="max-w-sm bg-white rounded overflow-hidden shadow-lg">
            <img className="w-full h-50 object-cover block m-0 p-0" src={csgo} alt="Game" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{game.title}</div>
              <p className="text-gray-700 text-base">{game.description}</p>
            </div>
            <div className="px-6 pt-2 pb-2">
              <button className="bg-amber-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                {game.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}