import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-r from-blue-500 to-purple-600 text-white">
            <h1 className="text-4xl font-bold mb-6">Welcome to the Home Page</h1>
            <div className="space-x-4">
                <Link to={'/register'} className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300">
                    User Register
                </Link>
                <Link to='/login' className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300">
                    Login
                </Link>
            </div>
        </div>
    );
}
