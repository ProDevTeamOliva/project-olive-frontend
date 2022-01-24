import { RSAA } from "redux-api-middleware";
import { baseUrl } from "../config/baseUrl";
import {
  ME_REQUEST,
  ME_SUCCESS,
  ME_FAILURE,
  ME_POSTS_REQUEST,
  ME_POSTS_SUCCESS,
  ME_POSTS_FAILURE,
  ME_PICTURES_REQUEST,
  ME_PICTURES_SUCCESS,
  ME_PICTURES_FAILURE,
  ME_AVATAR_REQUEST,
  ME_AVATAR_SUCCESS,
  ME_AVATAR_FAILURE,
  ME_POST_PICTURES_REQUEST,
  ME_POST_PICTURES_SUCCESS,
  ME_POST_PICTURES_FAILURE,
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

export const getMePosts = () => ({
  [RSAA]: {
    endpoint: `${baseUrl}/me/post`,
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [ME_POSTS_REQUEST, ME_POSTS_SUCCESS, ME_POSTS_FAILURE],
  },
});

export const getMePictures = () => ({
  [RSAA]: {
    endpoint: `${baseUrl}/me/picture`,
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [ME_PICTURES_REQUEST, ME_PICTURES_SUCCESS, ME_PICTURES_FAILURE],
  },
});

export const patchMeAvatar = (filename, avatar) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/me/avatar`,
    method: "PATCH",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filename: filename,
      avatar: avatar,
    }),
    types: [ME_AVATAR_REQUEST, ME_AVATAR_SUCCESS, ME_AVATAR_FAILURE],
  },
});

export const postMePictures = (pictures) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/me/picture`,
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pictures: pictures,
    }),
    types: [
      ME_POST_PICTURES_REQUEST,
      ME_POST_PICTURES_SUCCESS,
      ME_POST_PICTURES_FAILURE,
    ],
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
