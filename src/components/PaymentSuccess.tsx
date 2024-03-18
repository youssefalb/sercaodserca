import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-gray-100 h-screen flex justify-center items-center'>
      <div className='text-center'>
        <h2 className='text-2xl font-semibold mb-4'>Payment Successful</h2>
        <p className='mb-4'>Thank you for your contribution!</p>
        <button
          onClick={() => navigate('/')}
          className='bg-green-600 hover:bg-purple text-white font-bold py-2 px-4 mt-6 rounded'
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
