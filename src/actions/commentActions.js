import {
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  GET_COMMENTS_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  GET_MORE_COMMENTS_REQUEST,
  GET_MORE_COMMENTS_SUCCESS,
  GET_MORE_COMMENTS_FAILURE,
} from "../types/commentTypes";

import { RSAA } from "redux-api-middleware";
import { baseUrl } from "../config/baseUrl";
import credentials from "../config/credentials";

export const addComment = (payload, id) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/post/${id}/comment`,
    method: "POST",
    body: JSON.stringify(payload),
    credentials,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE],
  },
});

export const getComments = (idPost) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/post/${idPost}/comment`,
    method: "GET",
    credentials,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [
      GET_COMMENTS_REQUEST,
      {
        type: GET_COMMENTS_SUCCESS,
        payload: async (action, state, res) => {
          return res.json().then((json) => ({
            response: json,
            idPost: idPost,
          }));
        },
      },
      GET_COMMENTS_FAILURE,
    ],
  },
});

export const getMoreComments = (idPost, id) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/post/${idPost}/comment?id=${id}`,
    method: "GET",
    credentials,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [
      GET_MORE_COMMENTS_REQUEST,
      {
        type: GET_MORE_COMMENTS_SUCCESS,
        payload: async (action, state, res) => {
          return res.json().then((json) => ({
            response: json,
            idPost: idPost,
          }));
        },
      },
      GET_MORE_COMMENTS_FAILURE,
    ],
  },
});

export const deleteComment = (idPost, payload) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/post/comment/${payload.id}`,
    method: "DELETE",
    credentials,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [
      DELETE_COMMENT_REQUEST,
      {
        type: DELETE_COMMENT_SUCCESS,
        payload: async (action, state, res) => {
          return res.json().then((json) => ({
            response: json,
            idComment: payload.id,
            idPost: idPost,
          }));
        },
      },
      DELETE_COMMENT_FAILURE,
    ],
  },
});
