import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const handlerChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (!credential.email || !credential.password) {
      alert("Please Enter Credentials...");
      return;
    }
    try {
      setIsLoading(true);
      const result = await axios.post(
        "https://versal-live.vercel.app/user/login",
        credential
      );
      setIsLoading(false);
      alert(result.data.message);

      //Save token and id to localStorage
      const data = { token: result?.data?.token, Id: result?.data?.Id };
      localStorage.setItem("user", JSON.stringify(data));

      navigate("/greeting");
    } catch (error) {
        setIsLoading(false);
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-r from-blue-500 to-purple-600 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl shadow-md">
        {isLoading ? (
          <div className="flex flex-col w-full justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-5 mt-2 border-blue-900"></div>
            <p className="mt-5 font-bold text-xl text-blue-950">
              Verifying user. Please wait a while...
            </p>
          </div>
        ) : (
          <div>
            {" "}
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Login
            </h2>
            <form className="space-y-4" onSubmit={handlerSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  onChange={handlerChange}
                  name="email"
                  value={credential.email}
                  type="email"
                  className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  name="password"
                  value={credential.password}
                  onChange={handlerChange}
                  type="password"
                  className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                Login
              </button>
            </form>
            <p className="text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-500 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
