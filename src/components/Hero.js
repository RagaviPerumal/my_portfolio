import React from 'react';
import './Hero.css';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="hero-section">
      <motion.span
        className="hero-subtitle"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Welcome to my
      </motion.span>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        PORTFOLIO
      </motion.h1>
    </section>
  );
};

export default Hero;