import { FETCH_SURVEYS, FETCH_ERROR } from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    case FETCH_ERROR:
      return state;
    default:
      return state;
  }
}
