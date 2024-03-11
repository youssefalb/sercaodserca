import React from 'react';
import './App.css';

import NavBar from './components/Navbar';
import HeroSection from './components/Hero';
import About from './components/About';

export default function App() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <About />
    </div>
  );
}