import React from 'react';
import './Work.css';

// Import your project images
import agriAppImg from '../assets/project-agri.jpg';
import spotifyImg from '../assets/project-spotify.jpg';
import cafePosterImg from '../assets/project-cafe.jpg';
import symposiumPosterImg from '../assets/project-symposium.jpg';

const projects = [
  {
    image: agriAppImg,
    title: 'E-Commerce Agriculture App',
    description: 'Designed a Figma-based prototype connecting farmers directly with consumers to ensure fair pricing and transparency.',
    tags: ['Figma', 'UI/UX', 'Wireframing']
  },
  {
    image: spotifyImg,
    title: 'Spotify UI/UX Redesign',
    description: 'Conceptualized a modern UI/UX concept for Spotify with interactive wireframes and a design system to improve usability.',
    tags: ['Figma', 'UI/UX', 'Prototyping']
  },
  {
    image: cafePosterImg,
    title: 'Cafe Poster Design',
    description: 'Created a visually appealing promotional poster for a local cafe, focusing on brand identity and clear communication.',
    tags: ['Canva', 'Graphic Design']
  },
  {
    image: symposiumPosterImg,
    title: 'College Symposium Poster',
    description: 'Designed an engaging poster for a college symposium to attract attendees and clearly convey event details.',
    tags: ['Canva', 'Event Promotion']
  }
];

const Work = () => {
  return (
    <section id="work" className="work-section">
      <div className="work-container">
        <h2 className="work-title">Selected Work</h2>
        <div className="work-grid">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              <div className="project-image-container">
                <img src={project.image} alt={project.title} className="project-image" />
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span className="project-tag" key={i}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
