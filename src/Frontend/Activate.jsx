import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';

import {stkPush, getAuthToken} from './Services/Mpesa'
const Activate = () => {
    const location = useLocation()
    const {phoneNumber}=location.state || {};
    // const [message, setMessage] = useState('');
    // const navigate = useNavigate ();

    const handleActivate = async () => {
      try {
          const response = await fetch('/api/stk-push', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  phoneNumber: phoneNumber
              }),
          });
  
          const data = await response.json();
          if (response.ok) {
              console.log('Payment initiated:', data);
              alert('STK Push sent to your phone');
          } else {
              console.error('Payment initiation failed:', data);
              alert('Error initiating payment');
          }
      } catch (error) {
          console.error('Error:', error);
          alert('Error processing payment');
      }
  };
  

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Account Verification</h2>
                <p className="mb-4">
                    Unlock all Savaay earning ways by activating your account for just <span className="text-blue-500">Ksh. 100</span>
                </p>
                <button
                    className="w-full bg-yellow-500 text-white p-2 rounded-md"
                    onClick={handleActivate}
                >
                    Activate account
                </button>
                {/* {message && <p className="mt-4 text-center">{message}</p>} */}
            </div>
        </div>
    );
};

export default Activate;
