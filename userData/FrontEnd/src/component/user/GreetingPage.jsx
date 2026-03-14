import React from 'react'
import { Link } from 'react-router-dom'

export default function GreetingPage() {
return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-blue-500 to-purple-600">
        <div className="text-center p-8 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Congratulations You Login Successfully 💕.</h1>
            <p className="text-lg text-gray-800 font-semibold mb-8">
                We're glad to have you here. Explore and enjoy your stay!
            </p>
            <Link to={'/getprofile'} className=" px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Go to your Profile
            </Link>
        </div>
    </div>
)
}
