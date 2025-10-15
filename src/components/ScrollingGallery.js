import React from 'react';
import './ScrollingGallery.css';

const ScrollingGallery = () => {
  // A curated selection of high-quality images for aesthetic and design purposes
  const images = [
    'https://i.pinimg.com/736x/25/57/54/2557546c60f6ee46df83861848eca397.jpg', // <-- PASTE YOUR NEW LINK HERE
    'https://i.pinimg.com/1200x/7e/bc/65/7ebc655e4baa3beb4d55473ae39534d3.jpg', // <-- PASTE YOUR NEW LINK HERE
    'https://i.pinimg.com/736x/25/57/54/2557546c60f6ee46df83861848eca397.jpg', // <-- PASTE YOUR NEW LINK HERE
    'https://i.pinimg.com/736x/df/58/a1/df58a1472f721fbb78ff65f579b8db57.jpg', // <-- PASTE YOUR NEW LINK HERE
    'https://i.pinimg.com/1200x/b2/3d/61/b23d61ed3c6179f987d9ab8e01e2cb02.jpg', // <-- PASTE YOUR NEW LINK HERE
    'https://i.pinimg.com/736x/f6/30/46/f630463c931c537b80982a4ca7654650.jpg', // <-- PASTE YOUR NEW LINK HERE
  ];

  // We duplicate the images to create a seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <div className="gallery-container">
      <div className="gallery-track">
        {duplicatedImages.map((src, index) => (
          <div className="gallery-item" key={index}>
            <img src={src} alt={`Design inspiration ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingGallery;

