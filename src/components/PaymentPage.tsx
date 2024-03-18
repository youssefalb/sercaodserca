import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../firebase-config';

const stripePromise = loadStripe('pk_test_51OuzPy014et4YmUMZXuPzFi7jzWRz709qgoFrFJsxaoPKz9BoMYQ881UCOP6e7KT0Xp895Lo88RzJKYLxgaJRERI00Td3l8onn');

interface CreateSessionResponse {
    sessionId: string;
}

const PaymentPage = () => {
    const [amount, setAmount] = useState('');
    const functions = getFunctions(app); // Initialize Firebase Functions

    const handlePayment = async () => {
        const stripe = await stripePromise;
        if (!stripe) {
            console.error('Stripe is not initialized');
            return;
        }
        
        // Convert the amount to cents as Stripe expects amounts to be in the smallest currency unit
        const amountInCents = Math.round(parseInt(amount) * 100);
    
        try {
            const createCheckoutSession = httpsCallable(functions, 'createStripeCheckoutSession');

            const sessionResponse = await createCheckoutSession({
                amount: amountInCents,
                successUrl: window.location.origin + '/payment-success', 
                cancelUrl: window.location.origin + '/payment-cancel'
              });
            
            // Cast the response data to the expected type
            const sessionData: CreateSessionResponse = sessionResponse.data as CreateSessionResponse;
    
            const result = await stripe.redirectToCheckout({
                sessionId: sessionData.sessionId
            });
    
            if (result.error) {
                console.error('Stripe Checkout error:', result.error.message);
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
        }
    };
    
    const updateAmount = (newAmount: number) => {
        setAmount(newAmount.toString()); // Convert number to string
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value); // Keep as string, no need to convert
    };

    // Define the fixed amounts
    const fixedAmounts = [50, 250, 500]; // Add more as needed

    return (
        <div className='bg-gray-100 absolute inset-0 w-full h-auto'>
            <div className="container max-w-6xl mx-auto pt-32 bg-gray-100">
                <h2 className="text-3xl font-semibold mb-8">Support the cause</h2>
                <div className="flex flex-col md:flex-row gap-4 pb-20">
                    <div className="bg-white border-2 rounded-2xl p-10">
                        <h3 className="text-xl font-semibold pb-6">One-time contribution</h3>
                        <div className="flex items-center space-x-2 mt-2">
                            {fixedAmounts.map((fixedAmount) => (
                                <button
                                    key={fixedAmount}
                                    onClick={() => updateAmount(fixedAmount)}
                                    className="px-6 py-3 bg-gray-100 text-black rounded-3xl hover:bg-blue-600"
                                >
                                    {fixedAmount} zł
                                </button>
                            ))}
                        </div>
                        <div className="mt-4">
                            <input
                                type="number"
                                value={parseInt(amount) === 0 ? '' : amount}
                                onChange={handleInputChange}
                                placeholder="Enter your amount"
                                className="w-full px-3 py-2 border rounded-3xl"
                            />
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={handlePayment}
                                className="w-full px-6 py-2 bg-purple text-white rounded-3xl hover:bg-purple"
                            >
                                Make a contribution
                            </button>
                        </div>
                    </div>

                    <div className="bg-white border-2 rounded-2xl p-10">
                        <h3 className="text-xl font-semibold mb-8">Bank account details</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="text-sm font-medium">Numer Klienta:</div>
                                <div className="text-md p-2 bg-gray-100 rounded-3xl px-5 mt-2 text-gray-600">3MW8D5</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium">Bank:</div>
                                <div className="text-md  p-2 bg-gray-100 rounded-3xl px-5 mt-2 text-gray-600">BNP PARIBAS</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium">SWIFT kod:</div>
                                <div className="text-md p-2 bg-gray-100 rounded-3xl px-5 mt-2 text-gray-600">PRABPLPKXXX</div>
                            </div>
                            {/* <div>
                                <div className="text-sm font-medium">Рахунок у Польських злотих NRB:</div>
                                <div className="text-md  p-2 bg-gray-100 rounded-3xl px-5 mt-2 text-gray-600">PL09160011721749583650000001</div>
                            </div> */}
                            <div>
                                <div className="text-sm font-medium">Рахунок у Польських злотих IBAN:</div>
                                <div className="text-md  p-2 bg-gray-100 rounded-3xl px-5 mt-2 text-gray-600">PL09160011721749583650000001</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>


    );
};

export default PaymentPage;
