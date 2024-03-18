import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './App.css';
import rightSideImg from './assets/images/army.png';
import rightSideImgTwo from './assets/images/refugees.png';

import NavBar from './components/Navbar';
import HeroSection from './components/Hero';
import About from './components/About';
import Partners from './components/Partners';
import SupportCard from './components/SupportCard';
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
import PaymentPage from './components/PaymentPage';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentCancel from './components/PaymentCancel';
import PaymentFailure from './components/PaymentFailure';

// Load your Stripe public key
const stripePromise = loadStripe('pk_test_51OuzPy014et4YmUMZXuPzFi7jzWRz709qgoFrFJsxaoPKz9BoMYQ881UCOP6e7KT0Xp895Lo88RzJKYLxgaJRERI00Td3l8onn');

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen"> {/* This wraps your entire layout */}
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
                  id="help-army"
                />
                <AuctionsSection />
                <SupportCard
                  title="Support Refugees"
                  description="Join the effort to support refugees, providing them with essential aid and assistance in these challenging times"
                  buttonText="Make a Contribution"
                  rightImageUrl={rightSideImgTwo}
                  id="help-refugees"
                />
                <BlogsSection />
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

            {/* Ensure Elements wraps only the PaymentPage */}
            <Route path="/payment" element={<Elements stripe={stripePromise}><PaymentPage /></Elements>} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failure" element={<PaymentFailure />} />
            <Route path="/payment-cancel" element={<PaymentCancel />} />

          </Routes>


        </div>
        <Footer />

      </BrowserRouter>

    </AuthProvider>
  );
}
