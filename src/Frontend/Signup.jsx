import React, { useState } from 'react';
import { auth } from './Firebaseconfig';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);

            navigate('/account', { state: { phoneNumber } });

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                toast.error('Email is already in use.');
            } else {
                console.error("Error signing up: ", error);
                toast.error('Error signing up. Please try again.');
            }
        }
    };

    const toggleVisibility = () => {
        setShowPassword(s => !s);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-2">
            <div className="bg-white p-2 rounded-lg shadow-md w-full sm:w-[70vw] md:max-w-60 text-sm">
                <h2 className="font-bold text-center">Savaay</h2>
                <p className='text-xs text-center mb-4'>Create your new Savaay account</p>
                <form onSubmit={handleSignUp}>
                    <input
                        type="text"
                        placeholder="Phone Number"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md outline-none text-xs"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="First Name"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md outline-none text-xs"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md outline-none text-xs"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className='relative'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md outline-none text-xs"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={toggleVisibility}
                            className="absolute right-2 top-4 transform -translate-y-1/2 text-gray-400"
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md"
                    >
                        Sign Up
                    </button>
                </form>
                <p className='mt-4 text-gray-400 '>Already Signed Up? <Link to='/login' className='text-blue-500 font-bold'>Log in</Link></p>
            </div>
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
        </div>
    );
};

export default SignUp;
