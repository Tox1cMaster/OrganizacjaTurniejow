import '/src/components/css/react-spring.css';
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
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
    onRest: () => {
      setIsAnimating(true);
    },
  });

  const restartAnimation = () => {
    setIsAnimating(false);
    props.reset();
  };

  return (
    <div className="p-4">
      <section className="top-section">
        <div className="container">
          <h1 className="text-xl md:text-4xl lg:text-5xl mb-2 mt-0 leading-tight">
            Esports Challenger
          </h1>
          <p className="text-sm md:text-base lg:text-lg mb-6 mt-6 leading-tight">
            Dołącz do milionów graczy na całym świecie
          </p>
          <p className="text-sm md:text-base lg:text-lg mb-6 mt-2 leading-tight">
            Już dzisiaj stwórz własny turniej o którym marzysz
          </p>
        </div>
      </section>
      <div className="image-container">
        <animated.div
          style={props}
          className="image-slider"
          onMouseEnter={restartAnimation}
          onMouseLeave={() => setIsAnimating(true)}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Gra ${index + 1}`}
              className="w-full h-full object-cover"
            />
          ))}
        </animated.div>
      </div>
    </div>
  );
  
};
