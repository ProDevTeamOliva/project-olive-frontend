import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_RESTART,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../types/loginTypes";
import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_RESTART,
  REGISTER_SUCCESS,
} from "../types/registerTypes";
import { RSAA } from "redux-api-middleware";
import { baseUrl } from "../config/baseUrl";

export const signUp = (payload) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/register`,
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE],
  },
});

export const logIn = (payload) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/login`,
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
  },
});

export const logout = () => ({
  [RSAA]: {
    endpoint: `${baseUrl}/logout`,
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE],
  },
});

export const restartLogInMessage = () => ({
  type: LOGIN_RESTART,
});

export const restartRegisterMessage = () => ({
  type: REGISTER_RESTART,
});
