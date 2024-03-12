import React from 'react';
import './App.css';
import backgroundImg from './assets/images/supportCard.png'
import rightSideImg from './assets/images/army.png'
import rightSideImgTwo from './assets/images/refugees.png'

import NavBar from './components/Navbar';
import HeroSection from './components/Hero';
import SupportCard from './components/SupportCrad';

export default function App() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <SupportCard 
        backgroundUrl={backgroundImg}
        title="Підтримайте армію"
        description="Долучайтеся до посилення Збройних Сил України, а також допомоги цивільному населенню, яке постраждало від російської агресії"
        buttonText="Зробити внесок"
        rightImageUrl={rightSideImg}
      />
      <SupportCard 
        backgroundUrl={backgroundImg}
        title="Підтримайте армію"
        description="Долучайтеся до посилення Збройних Сил України, а також допомоги цивільному населенню, яке постраждало від російської агресії"
        buttonText="Зробити внесок"
        rightImageUrl={rightSideImgTwo}
      />
    </div>
  );
}