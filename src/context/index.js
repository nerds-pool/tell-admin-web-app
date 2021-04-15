import React, { createContext, useReducer } from "react";
import token from "./reducers/tokenReducer";
import user from "./reducers/userReducer";
import tokenSlice from "./slices/tokenSlice";
import userSlice from "./slices/userSlice";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [userState, dispatchUser] = useReducer(user, userSlice);
  const [tokenState, dispatchToken] = useReducer(token, tokenSlice);

  return (
    <GlobalContext.Provider
      value={{
        userState,
        dispatchUser,
        tokenState,
        dispatchToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
