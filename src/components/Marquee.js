// src/components/Marquee.js
import React from 'react';
import './Marquee.css';

const Marquee = () => {
  return (
    <div className="marquee-container">
      <div className="marquee-text">
        <span>GRAPHIC DESIGN</span>
        <span>WEBSITE DESIGN</span>
        <span>GRAPHIC DESIGN</span>
        <span>WEBSITE DESIGN</span>
      </div>
    </div>
  );
};

export default Marquee;