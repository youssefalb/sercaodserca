import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-gray-100 h-screen flex justify-center items-center'>
      <div className='text-center'>
        <h2 className='text-2xl font-semibold mb-4'>Payment Cancelled</h2>
        <p className='mb-4'>Your payment was cancelled. You have not been charged.</p>
        <button
          onClick={() => navigate('/payment')}
          className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 mt-6 rounded'
        >
          Return to Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;
