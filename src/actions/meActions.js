import { RSAA } from "redux-api-middleware";
import { baseUrl } from "../config/baseUrl";
import {
  ME_FAILURE,
  ME_REQUEST,
  ME_SUCCESS,
  ME_FRIENDS_REQUEST,
  ME_FRIENDS_SUCCESS,
  ME_FRIENDS_FAILURE,
  ME_ACCEPT_INVITATION_REQUEST,
  ME_ACCEPT_INVITATION_SUCCESS,
  ME_ACCEPT_INVITATION_FAILURE,
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

export const acceptFriendInvitation = (id) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/user/${id}/accept`,
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [
      ME_ACCEPT_INVITATION_REQUEST,
      ME_ACCEPT_INVITATION_SUCCESS,
      ME_ACCEPT_INVITATION_FAILURE,
    ],
  },
});

export const unAcceptFriendInvitation = (id) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/user/${id}/friend`,
    method: "DELETE",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [
      ME_ACCEPT_INVITATION_REQUEST,
      ME_ACCEPT_INVITATION_SUCCESS,
      ME_ACCEPT_INVITATION_FAILURE,
    ],
  },
});
