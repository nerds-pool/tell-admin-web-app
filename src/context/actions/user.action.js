import { SET_AUTH, SET_USER } from "./action.types";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setAuth = (isAuth) => ({
  type: SET_AUTH,
  payload: isAuth,
});
