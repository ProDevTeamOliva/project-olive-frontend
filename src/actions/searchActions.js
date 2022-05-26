import { RSAA } from "redux-api-middleware";
import { baseUrl } from "../config/baseUrl";
import {
  SEARCH_FAILURE,
  SEARCH_REQUEST,
  SEARCH_RESTART,
  SEARCH_SUCCESS,
} from "../types/searchTypes";
import credentials from "../config/credentials"

export const searchUsers = ({ valueSearch }) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/user?namePart=${valueSearch}`,
    method: "GET",
    credentials,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE],
  },
});

export const searchTags = ({ valueSearch }) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/post/tag?tagPart=${valueSearch}`,
    method: "GET",
    credentials,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE],
  },
});

export const restartSearch = () => ({
  type: SEARCH_RESTART,
});
