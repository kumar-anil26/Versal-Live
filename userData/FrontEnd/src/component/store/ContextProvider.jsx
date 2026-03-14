import React, { useReducer } from "react";
import userReducer, { initialState, UserContext } from "./UserReducer";

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
