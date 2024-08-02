import React, { useState, useEffect } from 'react';
import {auth} from './Firebaseconfig'
import axios from 'axios';
import { useLocation, useNavigate  } from 'react-router-dom';

import {stkPush, getAuthToken} from './Services/Mpesa'
const Activate = () => {
    const location = useLocation()
    const {phoneNumber}=location.state || {};
    const [message, setMessage] = useState('');
    const navigate = useNavigate ();

    const handleActivate = async () => {
        try {
            const token = await getAuthToken();
            await stkPush(phoneNumber, token);
            setMessage('STK Push Sent. Check your phone.');
        } catch (error) {
            setMessage('Failed to send STK Push.');
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
                {message && <p className="mt-4 text-center">{message}</p>}
            </div>
        </div>
    );
};

export default Activate;
