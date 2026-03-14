import { createContext } from "react";

// Initialise Initial State
export const initialState = {
  userName: "",
  userEmail: "",
  userPassword: "",
  errors: {},
};

//Create context
export const UserContext = createContext(null);

// Reducer Function
export default function userReducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: "" },
      };
    case "SET_ERROR":
      return { ...state, errors: action.error };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}
