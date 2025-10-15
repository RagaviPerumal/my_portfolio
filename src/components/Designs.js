import React, { useState } from 'react';
import './Designs.css';
import { motion } from 'framer-motion';

const Designs = () => {
  const [modalData, setModalData] = useState(null);

  const projects = {
    caseStudies: [
      { 
        type: 'video', videoUrl: '/thulir-prototype.mp4', img: '/thulir-app-cover.png', 
        title: 'Thulir E-Commerce App', category: 'UI/UX Case Study',
        problem: 'Local farmers struggle to connect directly with urban consumers, leading to unfair pricing and a lack of transparency.',
        role: 'UI/UX Designer, Product Thinker',
        process: 'I began by creating user personas and mapping out the core user journey...',
        outcome: 'The final design provides a transparent farm-to-consumer platform that builds trust.'
      },
      { 
        type: 'video', videoUrl: '/spotify-prototype.mp4', img: '/spotify-cover.png', 
        title: 'Spotify UI Redesign Concept', category: 'UI/UX Case Study',
        problem: 'The goal was to reimagine Spotify\'s mobile interface to enhance music discovery.',
        role: 'UI/UX Designer',
        process: 'I analyzed current user flows and identified pain points in music discovery...',
        outcome: 'The redesigned concept offers a more intuitive and visually engaging way for users to discover new music.'
      },
    ],
    graphicDesigns: [
      { type: 'image', img: '/symposium-poster.png', title: 'Symposium Poster', category: 'Graphic Design' },
      { type: 'image', img: '/cafe-poster.png', title: 'Cafe Shop Promotion', category: 'Graphic Design' },
      { type: 'image', img: '/logo-design.png', title: 'Logo Design', category: 'Graphic Design' },
    ],
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };
  
  const renderModalContent = (project) => {
    if (project.category === 'UI/UX Case Study') {
      return (
        <>
          <div className="project-modal-media-container">
            {project.type === 'video' ? (
              <video className="project-modal-video" autoPlay loop muted playsInline><source src={project.videoUrl} type="video/mp4" /></video>
            ) : (
              <img src={project.img} alt={project.title} className="project-modal-image" />
            )}
          </div>
          <div className="project-modal-details">
            <span className="project-modal-category">{project.category}</span>
            <h3 className="project-modal-title">{project.title}</h3>
            <h4 className="project-modal-subtitle">The Problem</h4><p>{project.problem}</p>
            <h4 className="project-modal-subtitle">My Role</h4><p>{project.role}</p>
            <h4 className="project-modal-subtitle">The Process</h4><p>{project.process}</p>
            <h4 className="project-modal-subtitle">The Outcome</h4><p>{project.outcome}</p>
          </div>
        </>
      );
    } else { // For Graphic Designs
      return <img src={project.img} alt={project.title} className="graphic-design-modal-image" />;
    }
  };

  return (
    <>
      <motion.section id="designs" className="designs-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants}>
        <div className="designs-header">
            <h2 className="designs-title">Designs</h2>
            <p className="designs-quote">Here's a selection of my recent projects. I focus on creating user-centered designs that are both beautiful and functional.</p>
        </div>
        <div className="project-category">
            <h3 className="category-title">UI/UX Case Studies</h3>
            <div className="banner-grid">
                {projects.caseStudies.map((project, index) => (
                    <motion.div className="project-card" key={index} variants={sectionVariants}>
                        <div className="project-image-container"><img src={project.img} alt={project.title} /></div>
                        <div className="project-info">
                            <div><p className="project-category-tag">{project.category}</p><p className="project-title">{project.title}</p></div>
                            <button onClick={() => setModalData(project)} className="view-project-btn">View Project</button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
        <div className="project-category">
            <h3 className="category-title">Graphic Designs</h3>
            <div className="scrolling-graphic-container">
                <motion.div className="scrolling-graphic-track" variants={sectionVariants}>
                    {[...projects.graphicDesigns, ...projects.graphicDesigns].map((project, index) => (
                        <div className="project-card-small" key={index} onClick={() => setModalData(project)}>
                            <img src={project.img} alt={project.title} />
                            <div className="card-small-overlay"><p>{project.title}</p></div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
      </motion.section>

      {modalData && (
        <div className="project-modal-overlay" onClick={() => setModalData(null)}>
          {/* --- THIS IS THE CHANGE --- */}
          <div 
            className={`project-modal-content ${modalData.category !== 'UI/UX Case Study' ? 'is-graphic-design' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {renderModalContent(modalData)}
            <span className="project-modal-close" onClick={() => setModalData(null)}>&times;</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Designs;