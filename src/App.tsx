import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import rightSideImg from './assets/images/army.png';
import rightSideImgTwo from './assets/images/refugees.png';

import NavBar from './components/Navbar';
import HeroSection from './components/Hero';
import About from './components/About';
import Partners from './components/Partners';
import SupportCard from './components/SupportCrad';
import Footer from './components/Footer';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import AuctionsSection from './components/AuctionsSection';import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection />
                <About />
                <Partners />
                <SupportCard
                  title="Support the Army"
                  description="Join the effort to strengthen the Armed Forces of Ukraine, as well as to help the civilian population affected by Russian aggression"
                  buttonText="Make a contribution"
                  rightImageUrl={rightSideImg}
                />
                <SupportCard
                  title="Support Refugees"
                  description="Join the effort to support refugees, providing them with essential aid and assistance in these challenging times"
                  buttonText="Make a Contribution"
                  rightImageUrl={rightSideImgTwo}
                />
                <AuctionsSection />
        <Footer />
              </>
            } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
