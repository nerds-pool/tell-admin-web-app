import React, { createContext, useReducer } from "react";
import user from "./reducers/userReducer";
import token from "./reducers/tokenReducer";
import filter from "./reducers/filterReducer";
import userSlice from "./slices/userSlice";
import tokenSlice from "./slices/tokenSlice";
import filterSlice from "./slices/filterSlice";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [userState, dispatchUser] = useReducer(user, userSlice);
  const [tokenState, dispatchToken] = useReducer(token, tokenSlice);
  const [filterState, dispatchFilter] = useReducer(filter, filterSlice);

  return (
    <GlobalContext.Provider
      value={{
        userState,
        tokenState,
        filterState,
        dispatchUser,
        dispatchToken,
        dispatchFilter,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
