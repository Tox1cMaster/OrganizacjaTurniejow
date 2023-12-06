import '/src/components/css/react-spring.css';
import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { Link } from 'react-router-dom';

const images = [
  '/src/assets/gra1.jpg',
  '/src/assets/gra2.jpg',
  '/src/assets/gra3.jpg',
  '/src/assets/gra4.jpg',
  '/src/assets/gra5.jpg',
  '/src/assets/gra6.jpg',
  '/src/assets/gra7.jpg',
  '/src/assets/gra8.jpg',
  '/src/assets/gra9.jpg',
  '/src/assets/gra10.jpg',
];

export const Home = () => {
  const [isAnimating, setIsAnimating] = useState(true);

  const props = useSpring({
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(100%)' },
    reset: true,
    reverse: isAnimating,
    config: { duration: 20000 },
    onRest: () => {
      setIsAnimating(true);
    },
  });

  const restartAnimation = () => {
    setIsAnimating(false);
    props.reset();
  };

  return (
    <div>
      <section className='top-section'>
        <div className="container">
          <h1>Esports Challenger</h1>
          <p>Dołącz do milionów graczy na całym świecie</p>
          <p>Już dzisiaj stwórz własny turniej o którym marzysz</p>
        </div>
      </section>

      <div className="image-container">
        <animated.div
          style={props}
          className="image-slider"
          onPointerEnter={restartAnimation}
          onPointerLeave={() => setIsAnimating(true)}
        >
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Gra ${index + 1}`} />
          ))}
        </animated.div>
      </div>
    </div>
  );
};
