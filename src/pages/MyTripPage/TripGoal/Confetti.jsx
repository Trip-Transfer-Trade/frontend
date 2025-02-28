import React from 'react';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';

const Confetti = () => {
  const canvasStyles = {
    position: 'fixed',
    width: '430px',
    height: '100%',
    top: '30px',
    left: '50%',
    transform: 'translateX(-50%)', 
    zIndex: '3',
    pointerEvents: "none",
  };

  const decorateOptions = (originalOptions) => {
    return {
      ...originalOptions,
      particleCount: 100,
      spread: 360,
      startVelocity: 30,
      ticks: 200,
      origin: { x: 0.5, y: 0.35 },
      shapes: ['circle', 'circle', 'circle'],
      gravity: 1,
    };
  };

  return (
    <Fireworks
      autorun={{ speed: 0.5, duration: 3 }}
      style={canvasStyles}
      decorateOptions={decorateOptions}
    />
  );
};

export default Confetti;