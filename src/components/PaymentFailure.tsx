import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-gray-100 h-screen flex justify-center items-center'>
      <div className='text-center'>
        <h2 className='text-2xl font-semibold mb-4'>Payment Failed</h2>
        <p className='mb-4'>There was a problem processing your payment. Please try again later.</p>
        <button
          onClick={() => navigate('/payment')}
          className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 mt-6 rounded'
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentFailure;
