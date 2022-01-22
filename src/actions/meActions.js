import { RSAA } from "redux-api-middleware";
import { baseUrl } from "../config/baseUrl";
import { ME_FAILURE, ME_REQUEST, ME_SUCCESS } from "../types/meTypes";

export const getMe = (payload) => ({
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
