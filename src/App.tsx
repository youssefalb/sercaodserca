import React from 'react';
import './App.css';
import rightSideImg from './assets/images/army.png'

import NavBar from './components/Navbar';
import HeroSection from './components/Hero';
import About from './components/About';
import Partners from './components/Partners';
import SupportCard from './components/SupportCrad';

export default function App() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <About />
      <Partners />
      <SupportCard
        title="Підтримайте армію"
        description="Долучайтеся до посилення Збройних Сил України, а також допомоги цивільному населенню, яке постраждало від російської агресії"
        buttonText="Зробити внесок"
        rightImageUrl={rightSideImg}
      />
    </div>
  );
}