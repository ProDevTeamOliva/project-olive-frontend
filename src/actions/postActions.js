import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
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
