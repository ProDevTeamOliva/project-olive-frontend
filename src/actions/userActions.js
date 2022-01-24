import { RSAA } from "redux-api-middleware";
import { baseUrl } from "../config/baseUrl";
import {
  USER_FAILURE,
  USER_REQUEST,
  USER_SUCCESS,
  USER_POSTS_REQUEST,
  USER_POSTS_SUCCESS,
  USER_POSTS_FAILURE,
  USER_PICTURES_REQUEST,
  USER_PICTURES_SUCCESS,
  USER_PICTURES_FAILURE,
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

export const getUserPosts = (id) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/user/${id}/post`,
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [USER_POSTS_REQUEST, USER_POSTS_SUCCESS, USER_POSTS_FAILURE],
  },
});

export const getUserPictures = (id) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/user/${id}/picture`,
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [
      USER_PICTURES_REQUEST,
      USER_PICTURES_SUCCESS,
      USER_PICTURES_FAILURE,
    ],
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
