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
import AuctionsSection from './components/AuctionsSection';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AddOrEditAuctionItem from './AddOrEditAuctionItem';
import BlogsSection from './components/BlogsSection';
import AuctionDetail from './components/AuctionDetail';
import BlogDetail from './components/BlogDetail';
import AddOrEditBlog from './AddOrEditBlog';

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
                <AuctionsSection />
                <SupportCard
                  title="Support Refugees"
                  description="Join the effort to support refugees, providing them with essential aid and assistance in these challenging times"
                  buttonText="Make a Contribution"
                  rightImageUrl={rightSideImgTwo}
                />
                <BlogsSection />
                <Footer />
              </>
            } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/auction/:id" element={<AuctionDetail />} />
            <Route path="/add-auction" element={<AddOrEditAuctionItem />} />
            <Route path="/edit-auction/:auctionId" element={<AddOrEditAuctionItem />} />
          
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/add-blog-post" element={<AddOrEditBlog />} />
            <Route path="/edit-blog-post/:postId" element={<AddOrEditBlog />} />
                    
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
