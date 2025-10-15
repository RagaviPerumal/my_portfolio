import React, { useState } from 'react';
import './Navbar.css';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.nav
        className="navbar-final"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="nav-container-final">
          <div className="nav-brand-final">
            <img 
              src="/profile-pic.png" 
              alt="Ragavi P" 
              className="nav-profile-pic-final"
              onClick={() => setIsModalOpen(true)}
            />
            <span>Ragavi P</span>
          </div>
          <ul className="nav-menu-final">
            <li><a href="#about">About Me</a></li>
            <li><a href="#designs">Designs</a></li>
            {/* --- THIS IS THE CHANGE --- */}
            <li><a href="https://linkedin.com/in/ragavi-p" target="_blank" rel="noopener noreferrer" className="connect-button-final">Let's Connect</a></li>
          </ul>
        </div>
      </motion.nav>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src="/profile-pic.png" alt="Ragavi P - Full Size" className="modal-image" />
            <span className="close-button" onClick={() => setIsModalOpen(false)}>&times;</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;