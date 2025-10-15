import React from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollingGallery from './components/ScrollingGallery';
import About from './components/About';
import Designs from './components/Designs';
import Footer from './components/Footer'; // Import the new footer

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <ScrollingGallery />
        <div id="about">
          <About />
        </div>
        <div id="designs">
          <Designs />
        </div>
      </main>
      <Footer /> {/* Add the footer component here */}
    </div>
  );
}

export default App;