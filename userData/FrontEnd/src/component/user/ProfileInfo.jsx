import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ProfileInfo() {
  const data = JSON.parse(localStorage.getItem("user"));
  const [result, setResult] = useState({ id: "", username: "", email: "" });

  const navigate = useNavigate()
  const handlerLogout = () => {
    localStorage.removeItem('user')
    alert('You Succefully logout.\n\n Thank You...')
    navigate('/')
  }

  useEffect(() => {
    const getprofile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:7000/user/profile/${data?.Id}`,
          { headers: { Authorization: `Bearer ${data.token}` } }
        );
        setResult({
          ...result,
          id: res?.data?.Id,
          username: res?.data?.username,
          email: res?.data?.useremail,
        });
      } catch (error) {
        alert(error.message);
      }
    };
    if (data?.token) getprofile();
  }, [data?.Id, data?.token, result]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-r from-blue-500 to-purple-600 text-white">
      <div className="shadow-md rounded-lg p-5 w-11/12 md:w-1/2 lg:w-1/3 bg-orange-300 font-bold">
        <h1 className="text-2xl font-bold text-center mb-4">
          Your Profile Information
        </h1>
        <div className="mb-4">
          <p className="text-gray-700">
            <span className="font-semibold">User ID:</span> {result.id}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700">
            <span className="font-semibold">userName:</span> {result?.username}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700">
            <span className="font-semibold">Your Email:</span> {result.email}
          </p>
        </div>

        <div className="flex gap-5">
           <Link
          className="bg-purple-400 text-white py-2 px-4 rounded hover:bg-purple-500 transition duration-200"
          to="/"
        >
          Go to Home
        </Link>
        <button onClick={handlerLogout}
          className="bg-red-400 text-white py-2 px-4 rounded hover:bg-red-500 transition duration-200"
          to="/"
        >
          LogOut
        </button>
       </div>
      </div>
    </div>
  );
}
