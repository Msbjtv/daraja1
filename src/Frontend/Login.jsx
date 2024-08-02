import React, { useState } from 'react';
import { auth } from './Firebaseconfig';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/account');

        } catch (error) {
            if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code==='auth/invalid-credential') {
                toast.error('Invalid email or password.');
            } else {
                console.error("Error logging in: ", error);
                toast.error('Error logging in. Please try again.');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-2">
            <div className="bg-white p-2 rounded-lg shadow-md w-full sm:w-[70vw] md:max-w-60 text-sm">
                <h2 className="font-bold text-center">Savaay</h2>
                <p className='text-xs text-center mb-4'>Log in to your Savaay account</p>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md outline-none text-xs"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md outline-none text-xs"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md"
                    >
                        Log In
                    </button>
                </form>
                <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
            </div>
        </div>
    );
};

export default Login;
