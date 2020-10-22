import axios from "axios";
import { FETCH_USER, FETCH_ERROR } from "./types";

export const fetchUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/current_user");

    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (err) {
    dispatch({
      type: FETCH_ERROR,
    });
  }
};

export const handleToken = (token) => async (dispatch) => {
  try {
    const res = await axios.post('/api/stripe', token)

    dispatch({
      type: FETCH_USER,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: FETCH_ERROR
    })
  }
} 
