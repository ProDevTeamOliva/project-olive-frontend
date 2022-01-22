import { RSAA } from "redux-api-middleware";
import { baseUrl } from "../config/baseUrl";
import {
  SEARCH_FAILURE,
  SEARCH_REQUEST,
  SEARCH_RESTART,
  SEARCH_SUCCESS,
} from "../types/searchTypes";

export const searchUsers = (payload) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/user/search/${payload}`,
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE],
  },
});

export const restartSearchUsers = () => ({
  type: SEARCH_RESTART,
});
