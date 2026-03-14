import React, { useContext, useRef } from "react";
import { UserContext } from "../store/UserReducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const otp = useRef(null);
  const navigate = useNavigate();

  const user = useContext(UserContext);

  const handlerSubmit = async () => {
    if (!otp.current.value) {
      alert("Write OTP");
      return;
    }
    const vefiData = {
      otp: otp?.current?.value,
      email: user?.state?.userEmail,
    };
    otp.current.value = null;
    try {
      const result = await axios.post(
        "http://localhost:7000/user/verify",
        vefiData
      );
      alert(result.data.message);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-r from-blue-500 to-purple-600 text-white">
      <div className="flex border-5 mt-20 p-8 shadow-lg shadow-emerald-600 rounded-xl flex-col gap-4 m-auto w-fit">
        <h1 className="font-blod bg-blue-800 text-3xl rounded-2xl p-2 px-4">
          OTP VERIFICATION
        </h1>
        <input
          ref={otp}
          type="text"
          placeholder="Ener otp here..."
          className="shadow-md shadow-emerald-700 p-3 rounded-xl bg-orange-300 text-black font-bold focus:outline-none focus:ring-2 focus:ring-orange-600 w-full"
        />
        <button
          onClick={handlerSubmit}
          className="w-full shadow-md shadow-blue p-2 mt-3 text-black font-bold justify-center rounded-xl bg-amber-200 focus:bg-amber-600 hover:bg-amber-400"
        >
          submit
        </button>
      </div>
    </div>
  );
}
