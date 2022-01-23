import { RSAA } from "redux-api-middleware";
import { baseUrl } from "../config/baseUrl";
import {
  USER_FAILURE,
  USER_REQUEST,
  USER_SUCCESS,
  USER_ADD_TO_FRIENDS_REQUEST,
  USER_ADD_TO_FRIENDS_SUCCESS,
  USER_ADD_TO_FRIENDS_FAILURE,
} from "../types/userTypes";

export const getUser = (id) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/user/${id}`,
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
  },
});

export const addToFriends = (id) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/user/${id}/friend`,
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [
      USER_ADD_TO_FRIENDS_REQUEST,
      USER_ADD_TO_FRIENDS_SUCCESS,
      USER_ADD_TO_FRIENDS_FAILURE,
    ],
  },
});
