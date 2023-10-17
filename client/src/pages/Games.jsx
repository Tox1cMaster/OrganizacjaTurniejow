import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "./css/Games.css"
import csgo from '../assets/csgo.png'

const gamesData = [
  {
    title: "CS GO",
    description: "Some quick example text for CS GO.",
    buttonText: "Play CS GO",
  },
  {
    title: "League of Legends",
    description: "Some quick example text for League of Legends.",
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
    <div className="my-container">
      <h1>Popularne gry</h1>
    <Row xs={1} md={3} className="g-4 me-0 ps-0 ms-5 ps-5 mt-4">
      {gamesData.map((game, index) => (
        <Col key={index}>
          <Card bg="secondary" style={cardStyle}>
            <Card.Img variant="top" src={csgo} style={imageSize} />
            <Card.Body>
              <Card.Title>{game.title}</Card.Title>
              <Card.Text>{game.description}</Card.Text>
              <Button variant="dark">{game.buttonText}</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    </div>
  )
}