import React from 'react';
import './About.css';
import { motion } from 'framer-motion';

const About = () => {
  const aboutVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <motion.section
      id="about"
      className="about-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={aboutVariants}
    >
      <div className="about-content">
        <span className="about-subtitle">About Me</span>
        <h2 className="about-title">Hi There!</h2>
        <p className="about-text">
          I'm Ragavi, a Computer Science Engineering student with a passion for UX Design. I focus on bridging the gap between technical functionality and human-centered design, turning complex problems into simple, elegant, and intuitive digital experiences. My goal is to build products that are not only beautiful but also accessible and a joy to use.
        </p>
      </div>
    </motion.section>
  );
};

export default About;