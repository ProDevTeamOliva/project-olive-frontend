import { RSAA } from "redux-api-middleware";
import { baseUrl } from "../config/baseUrl";
import {
  ME_REQUEST,
  ME_SUCCESS,
  ME_FAILURE,
  ME_POSTS_REQUEST,
  ME_POSTS_SUCCESS,
  ME_POSTS_FAILURE,
  ME_GET_PICTURES_REQUEST,
  ME_GET_PICTURES_SUCCESS,
  ME_GET_PICTURES_FAILURE,
  PATCH_ME_AVATAR_REQUEST,
  PATCH_ME_AVATAR_SUCCESS,
  PATCH_ME_AVATAR_FAILURE,
  ME_POST_PICTURES_REQUEST,
  ME_POST_PICTURES_SUCCESS,
  ME_POST_PICTURES_FAILURE,
  ME_FRIENDS_REQUEST,
  ME_FRIENDS_SUCCESS,
  ME_FRIENDS_FAILURE,
  ME_ACCEPT_INVITATION_REQUEST,
  ME_ACCEPT_INVITATION_SUCCESS,
  ME_ACCEPT_INVITATION_FAILURE,
  ME_MORE_POSTS_REQUEST,
  ME_MORE_POSTS_SUCCESS,
  ME_MORE_POSTS_FAILURE,
  DELETE_ME_AVATAR_REQUEST,
  DELETE_ME_AVATAR_SUCCESS,
  DELETE_ME_AVATAR_FAILURE,
  ME_DELETE_PICTURES_REQUEST,
  ME_DELETE_PICTURES_SUCCESS,
  ME_DELETE_PICTURES_FAILURE,
} from "../types/meTypes";
import credentials from "../config/credentials";

export const getMe = () => ({
  [RSAA]: {
    endpoint: `${baseUrl}/me`,
    method: "GET",
    credentials,
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
    credentials,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [ME_POSTS_REQUEST, ME_POSTS_SUCCESS, ME_POSTS_FAILURE],
  },
});

export const getMoreMePosts = (id) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/me/post?id=` + id,
    method: "GET",
    credentials,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [
      ME_MORE_POSTS_REQUEST,
      ME_MORE_POSTS_SUCCESS,
      ME_MORE_POSTS_FAILURE,
    ],
  },
});

export const getMePictures = () => ({
  [RSAA]: {
    endpoint: `${baseUrl}/me/picture`,
    method: "GET",
    credentials,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [
      ME_GET_PICTURES_REQUEST,
      ME_GET_PICTURES_SUCCESS,
      ME_GET_PICTURES_FAILURE,
    ],
  },
});

export const deleteMePictures = (idPicture) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/me/picture/${idPicture}`,
    method: "DELETE",
    credentials,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [
      ME_DELETE_PICTURES_REQUEST,
      {
        type: ME_DELETE_PICTURES_SUCCESS,
        payload: async (action, state, res) => {
          return res.json().then((json) => ({
            response: json,
            idPicture: idPicture,
          }));
        },
      },
      ME_DELETE_PICTURES_FAILURE,
    ],
  },
});

export const patchMeAvatar = (filename, avatar) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/me/avatar`,
    method: "PATCH",
    credentials,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filename: filename,
      avatar: avatar,
    }),
    types: [
      PATCH_ME_AVATAR_REQUEST,
      PATCH_ME_AVATAR_SUCCESS,
      PATCH_ME_AVATAR_FAILURE,
    ],
  },
});

export const deleteMeAvatar = () => ({
  [RSAA]: {
    endpoint: `${baseUrl}/me/avatar`,
    method: "DELETE",
    credentials,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    types: [
      DELETE_ME_AVATAR_REQUEST,
      DELETE_ME_AVATAR_SUCCESS,
      DELETE_ME_AVATAR_FAILURE,
    ],
  },
});

export const postMePictures = (pictures) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/me/picture`,
    method: "POST",
    credentials,
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
    credentials,
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
    credentials,
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
    credentials,
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
