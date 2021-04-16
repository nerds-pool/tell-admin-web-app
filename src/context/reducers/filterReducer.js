import {
  UPDATE_CATEGORY,
  UPDATE_AUTHORITY,
  UPDATE_DATE,
  RESET_FILTER,
} from "../actions/action.types";

const filter = (state, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case UPDATE_AUTHORITY:
      return {
        ...state,
        authority: action.payload,
      };
    case UPDATE_DATE:
      return {
        ...state,
        date: action.payload,
      };
    case RESET_FILTER:
      return {
        ...state,
        category: "all",
        authority: "all",
        date: "2021-01-01T00:00:00.000Z",
      };
    default:
      return state;
  }
};

export default filter;
