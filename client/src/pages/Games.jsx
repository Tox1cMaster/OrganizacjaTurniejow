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
    height: '150px',
  };

  const cardStyle = {
    width: '30rem',
  };
  return (
    <Row xs={1} md={3} className="g-4">
    {gamesData.map((game, index) => (
      <Col key={index}>
        <Card style={cardStyle}>
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
  )
}

      /* /* <Card style={{ width: '20rem' }}>
        <Card.Img variant="top" src={csgo} style={imageSize}/>
        <Card.Body>
          <Card.Title>League of Legends</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="dark">Go somewhere</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '20rem' }}>
        <Card.Img variant="top" src={csgo} style={imageSize}/>
        <Card.Body>
          <Card.Title>EA FC 24</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="dark">Go somewhere</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '20rem' }}>
        <Card.Img variant="top" src={csgo} style={imageSize}/>
        <Card.Body>
          <Card.Title>World of Warcraft</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="dark">Go somewhere</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '20rem' }}>
        <Card.Img variant="top" src={csgo} style={imageSize}/>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="dark">Go somewhere</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '20rem' }}>
        <Card.Img variant="top" src={csgo} style={imageSize}/>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="dark">Go somewhere</Button>
        </Card.Body>
      </Card>  */