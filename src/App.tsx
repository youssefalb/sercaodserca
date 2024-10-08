import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './App.css';
import rightSideImg from './assets/images/army.png';
import rightSideImgTwo from './assets/images/refugees.png';
import './i18n';
import { useTranslation } from 'react-i18next';

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
import ReportsPage from './components/ReportsPage';
import AddOrEditPartner from './AddOrEditPartner';
import ShutdownNotice from './components/ShutdownNotice';

// Load your Stripe public key
const stripePromise = loadStripe('pk_test_51OuzPy014et4YmUMZXuPzFi7jzWRz709qgoFrFJsxaoPKz9BoMYQ881UCOP6e7KT0Xp895Lo88RzJKYLxgaJRERI00Td3l8onn');

export default function App() {
  const { t } = useTranslation();
  const [hasPaid, setHasPaid] = useState(true);

  return (
    <div>
      <ShutdownNotice setHasPaid={setHasPaid} />
      {hasPaid ? <AuthProvider>
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
                    title={t('supportArmy.title')}
                    description={t('supportArmy.description')}
                    buttonText={t('supportArmy.makeContribution')}
                    rightImageUrl={rightSideImg}
                    id="help-army"
                  />
                  <AuctionsSection />
                  <SupportCard
                    title={t('supportRefugees.title')}
                    description={t('supportRefugees.message')}
                    buttonText={t('supportRefugees.makeContribution')}
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

              <Route path="/add-partner" element={<AddOrEditPartner />} />
              <Route path="/edit-partner/:partnerId" element={<AddOrEditPartner />} />
              {/* Ensure Elements wraps only the PaymentPage */}
              <Route path="/payment" element={<Elements stripe={stripePromise}><PaymentPage /></Elements>} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-failure" element={<PaymentFailure />} />
              <Route path="/payment-cancel" element={<PaymentCancel />} />

              <Route path="/reports" element={<ReportsPage />} />

            </Routes>

          </div>
          <Footer />

        </BrowserRouter>

      </AuthProvider> : null}

    </div>
  );
}
