import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  LIKE_REQUEST,
  LIKE_SUCCESS,
  LIKE_FAILURE,
} from "../types/postTypes";

import { RSAA } from "redux-api-middleware";
import { baseUrl } from "../config/baseUrl";

export const addPost = (payload) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/login`,
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE],
  },
});

export const getPostById = (id) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/post/` + id,
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [GET_POST_REQUEST, GET_POST_SUCCESS, GET_POST_FAILURE],
  },
});

export const getPosts = () => ({
  [RSAA]: {
    endpoint: `${baseUrl}/post/`,
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [GET_POSTS_REQUEST, GET_POSTS_SUCCESS, GET_POSTS_FAILURE],
  },
});

export const likePost = (id) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/post/${id}/like`,
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [LIKE_REQUEST, LIKE_SUCCESS, LIKE_FAILURE],
  },
});