import '/src/components/css/react-spring.css';
import React, { useRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { gsap } from 'gsap';

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
  const [isAnimating, setIsAnimating] = React.useState(true);
  const topSectionRef = React.useRef(null);
  const imageSliderRef = React.useRef(null);
  const centerSectionRef = React.useRef(null);

  // Animacja - blok główny - top 
  const topSectionAnimation = useSpring({
    from: { opacity: 0, y: -400 },
    to: { opacity: 1, y: 0 },
    reset: true,
    reverse: isAnimating,
    onRest: () => {
      setIsAnimating(true);
    },
  });

  // Animacja - image slider
  const imageSliderAnimation = useSpring({
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(100%)' },
    reset: true,
    reverse: isAnimating,
  });

  // Animacja - blok center
  const centerSectionAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(100%)' },
    to: { opacity: 1, transform: 'translateY(0%)' },
  });

  const restartAnimation = () => {
    setIsAnimating(false);
    topSectionAnimation.reset();
    imageSliderAnimation.reset();
  };

  useEffect(() => {
    gsap.fromTo(topSectionRef.current, { opacity: 0, y: -400 }, { opacity: 1, y: 0, duration: 2 });
  }, []);

  return (
    <div>
      <animated.section className="top-section" ref={topSectionRef} style={topSectionAnimation}>
        <div className="container-h">
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
      </animated.section>

      <div className="image-container mb-20">
        <animated.div
          className="image-slider"
          ref={imageSliderRef}
          onMouseEnter={restartAnimation}
          onMouseLeave={() => setIsAnimating(true)}
          style={imageSliderAnimation}
        >
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Gra ${index + 1}`} className="w-full h-full object-cover" />
          ))}
        </animated.div>
      </div>

      <div className="center panel bg-gray-900 h-screen grid grid-cols-2">
        <div className="left column flex items-center justify-center overflow-hidden">
          <animated.div ref={centerSectionRef} className="flex justify-center items-center" style={centerSectionAnimation}>
            {Array.from({ length: 5 }).map((_, index) => (
              <animated.img
                key={index + 1}
                src={`/src/assets/logo-${index + 1}.png`}
                alt={`Game Logo ${index + 1}`}
                className="w-12 h-auto m-2 object-contain"
                style={{
                  height: '20vh',
                  transform: centerSectionAnimation.transform.interpolate((value) => `translateX(${value * 100}%) translateY(calc(${value * 2}vh)) scale(${1 - Math.abs(value * 0.3)})`),
                  opacity: centerSectionAnimation.opacity.interpolate((value) => value * 1.2),
                }}
              />
            ))}
          </animated.div>
        </div>
        <div className="right column p-8 text-white">
          <h1 className="text-4xl mb-4">Right Column Content</h1>
          <p>Your additional content goes here.</p>
        </div>
      </div>
    </div>
  );
};
