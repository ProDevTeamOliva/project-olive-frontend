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
  DISLIKE_REQUEST,
  DISLIKE_SUCCESS,
  DISLIKE_FAILURE,
  TAGS_REQUEST,
  TAGS_SUCCESS,
  TAGS_FAILURE,
  GET_MORE_POSTS_REQUEST,
  GET_MORE_POSTS_SUCCESS,
  GET_MORE_POSTS_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  TAGS_MORE_REQUEST,
  TAGS_MORE_SUCCESS,
  TAGS_MORE_FAILURE,
} from "../types/postTypes";

import { RSAA } from "redux-api-middleware";
import { baseUrl } from "../config/baseUrl";
import credentials from "../config/credentials"

export const addPost = (payload) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/post`,
    method: "POST",
    body: JSON.stringify(payload),
    credentials,
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
    credentials,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [GET_POST_REQUEST, GET_POST_SUCCESS, GET_POST_FAILURE],
  },
});

export const deletePost = (id) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/post/` + id,
    method: "DELETE",
    credentials,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [
      DELETE_POST_REQUEST,
      {
        type: DELETE_POST_SUCCESS,
        payload: async (action, state, res) => {
          return res.json().then((json) => ({
            response: json,
            idPost: id,
          }));
        },
      },

      DELETE_POST_FAILURE,
    ],
  },
});

export const getPosts = () => ({
  [RSAA]: {
    endpoint: `${baseUrl}/post/`,
    method: "GET",
    credentials,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [GET_POSTS_REQUEST, GET_POSTS_SUCCESS, GET_POSTS_FAILURE],
  },
});

export const getMorePosts = (id) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/post?id=${id}`,
    method: "GET",
    credentials,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [
      GET_MORE_POSTS_REQUEST,
      GET_MORE_POSTS_SUCCESS,
      GET_MORE_POSTS_FAILURE,
    ],
  },
});

export const likePost = (id) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/post/${id}/like`,
    method: "POST",
    credentials,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [LIKE_REQUEST, LIKE_SUCCESS, LIKE_FAILURE],
  },
});

export const dislikePost = (id) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/post/${id}/like`,
    method: "DELETE",
    credentials,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [DISLIKE_REQUEST, DISLIKE_SUCCESS, DISLIKE_FAILURE],
  },
});

export const getPostsByTag = (tag) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/post?tag=${tag}`,
    method: "GET",
    credentials,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [TAGS_REQUEST, TAGS_SUCCESS, TAGS_FAILURE],
  },
});

export const getMorePostsByTag = (tag, id) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/post?tag=${tag}${id ? `&id=${id}` : ""}`,
    method: "GET",
    credentials,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [TAGS_MORE_REQUEST, TAGS_MORE_SUCCESS, TAGS_MORE_FAILURE],
  },
});
