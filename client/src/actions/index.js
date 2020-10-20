import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => {
  return function (dispatch) {
    axios
      .get("/api/current_user")
      .then((user) => dispatch({ type: FETCH_USER, payload: user }));
  };
};
