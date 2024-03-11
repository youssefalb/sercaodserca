import React from 'react';
import './App.css';

import NavBar from './components/Navbar';
import HeroSection from './components/Hero';
import About from './components/About';
import Partners from './components/Partners';

export default function App() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <About />
      <Partners />
    </div>
  );
}