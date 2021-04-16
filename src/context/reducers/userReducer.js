import { SET_AUTH, SET_USER } from "../actions/action.types";

const user = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    case SET_AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    default:
      return state;
  }
};

export default user;
