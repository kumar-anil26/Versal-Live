import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRegisterPage from "./component/user/UserRegisterPage";
import ContextProvider from "./component/store/ContextProvider";
import VerifyOtp from "./component/user/VerifyOtp";
import HomePage from "./component/user/HomePage";
import LoginPage from "./component/user/LoginPage";
import GreetingPage from "./component/user/GreetingPage";
import ProfileInfo from "./component/user/ProfileInfo";
import ProtectedRoute from "./component/store/ProtectedRoute";

export default function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<UserRegisterPage />} />
          <Route path="/verify" element={<VerifyOtp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/greeting"
            element={
              <ProtectedRoute>
                <GreetingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/getprofile"
            element={
              <ProtectedRoute>
                <ProfileInfo />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}
