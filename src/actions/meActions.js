import { RSAA } from "redux-api-middleware";
import { baseUrl } from "../config/baseUrl";
import {
  ME_FAILURE,
  ME_REQUEST,
  ME_SUCCESS,
  ME_FRIENDS_REQUEST,
  ME_FRIENDS_SUCCESS,
  ME_FRIENDS_FAILURE,
  ME_PICTURES_REQUEST,
  ME_PICTURES_SUCCESS,
  ME_PICTURES_FAILURE,
} from "../types/meTypes";

export const getMe = () => ({
  [RSAA]: {
    endpoint: `${baseUrl}/me`,
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [ME_REQUEST, ME_SUCCESS, ME_FAILURE],
  },
});

export const getMeFriends = () => ({
  [RSAA]: {
    endpoint: `${baseUrl}/me/friend`,
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [ME_FRIENDS_REQUEST, ME_FRIENDS_SUCCESS, ME_FRIENDS_FAILURE],
  },
});

export const getMePictures = () => ({
  [RSAA]: {
    endpoint: `${baseUrl}/me/picture`,
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [ME_PICTURES_REQUEST, ME_PICTURES_SUCCESS, ME_PICTURES_FAILURE],
  },
});
