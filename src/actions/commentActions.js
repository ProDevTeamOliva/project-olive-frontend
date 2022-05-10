import {
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  GET_COMMENTS_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
} from "../types/commentTypes";

import { RSAA } from "redux-api-middleware";
import { baseUrl } from "../config/baseUrl";

export const addComment = (payload, id) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/${id}/comment`,
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE],
  },
});

export const getComments = (id) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/${id}/comment`,
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [GET_COMMENTS_REQUEST, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAILURE],
  },
});
