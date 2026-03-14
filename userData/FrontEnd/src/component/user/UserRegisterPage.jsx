import { useContext, useState } from "react";
import { UserContext } from "../store/UserReducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserRegisterPage() {
  const { state, dispatch } = useContext(UserContext);
  const [showPwd, setShowPwd] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const navigate = useNavigate();
  const handlerChange = (e) => {
    dispatch({
      type: "CHANGE",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    if (!state.userName) errors.userName = "UserName required!";

    if (!state.userEmail) errors.userEmail = "UserEmail required!";

    if (!state.userPassword) errors.userPassword = "Password required";

    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERROR", error: errors });
      return;
    }
    const formData = {
      username: state.userName,
      email: state.userEmail,
      password: state.userPassword,
    };

    try {
      setIsloading(true);
      const result = await axios.post(
        "https://versal-live.vercel.app/user/register",
        formData
      );
      setIsloading(false);
      alert(result.data.message);
      navigate("/verify");
    } catch (error) {
      setIsloading(false);
      alert(error.message);
    }

    // dispatch({ type: "RESET" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-r from-blue-500 to-purple-600 text-white">
      {!isLoading ? (
        <div className="shadow-md p-5 flex flex-col items-center border-2 mt-10 bg-gray-400 rounded-2xl">
          <h1 className="font-bold text-3xl text-blue-700 m-6">
            USER REGISTATION FORM
          </h1>
          <form onSubmit={handlerSubmit} className=" w-80 flex flex-col gap-4">
            <div className="">
              {" "}
              <label
                className="block mb-1 font-bold text-green-950"
                htmlFor="userName"
              >
                User Name :{" "}
              </label>
              <input
                className="w-full rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-lg shadow-emerald-700 text-green-950 font-semibold"
                type="text"
                name="userName"
                value={state.userName}
                onChange={handlerChange}
                placeholder="Enter user name..."
              />
              <span className="text-red-500 ml-3">{state.errors.userName}</span>
            </div>

            <div>
              {" "}
              <label
                className="block mb-1 font-bold text-green-950"
                htmlFor="useremail"
              >
                User Email :{" "}
              </label>
              <input
                className="shadow-xl shadow-emerald-600 focus:ring-2 focus:ring-blue-600 p-2 w-full rounded-xl focus:outline-none text-green-950 font-semibold"
                type="email"
                onChange={handlerChange}
                name="userEmail"
                value={state.userEmail}
                placeholder="Enter user email..."
              />
              <span className="text-red-500 ml-3">
                {state.errors.userEmail}
              </span>
            </div>
            <div className="relative">
              {" "}
              <label
                className="block mb-1 font-bold text-green-950"
                htmlFor="userpassword"
              >
                User password :{" "}
              </label>
              <input
                className="shadow-xl shadow-emerald-600 focus:ring-2 focus:ring-blue-600 p-2 w-full rounded-xl focus:outline-none text-green-950 font-semibold"
                type={`${showPwd ? "text" : "password"}`}
                name="userPassword"
                value={state.userPassword}
                onChange={handlerChange}
                placeholder="Enter user password..."
              />
              <span
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-2 mt-2 cursor-pointer hover:text-xl"
              >
                &#128065;
              </span>
              <span className="text-red-500 ml-3">
                {state.errors.userPassword}
              </span>
            </div>
            <div className="flex justify-around">
              <button
                className="shadow-md p-1 px-4 font-bold text-emerald-900 bg-amber-300 rounded-xl focus:bg-green-400 mt-4 hover:bg-green-300"
                type="submit"
                onClick={handlerSubmit}
              >
                Submit
              </button>
              <button
                className="shadow-md p-1 px-4 font-bold text-emerald-900 bg-amber-300 rounded-xl focus:bg-green-400 mt-4 hover:bg-green-300"
                type="reset"
                onClick={() => dispatch({ type: "RESET" })}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className=" flex flex-col w-fit shadow-lg shadow-pink-500 p-8 justify-center items-center">
          <div className="shadow-lg shadow-orange-600 flex animate-spin rounded-full h-12 w-12 border-b-5 mt-2 border-blue-900"></div>
          <p className="mt-5 font-bold text-xl text-blue-950">
            Validating userData. Please wait a while...
          </p>
        </div>
      )}
    </div>
  );
}
