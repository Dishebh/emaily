import { FETCH_USER, FETCH_ERROR } from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case FETCH_ERROR:
      return state;
    default:
      return state;
  }
}
