import {LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS} from '../types/loginTypes'
import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from '../types/registerTypes'
import { createAction } from 'redux-api-middleware';

export const signUp = (data) => (dispatch) => {
    const dataJson = JSON.stringify(data)
    console.log(dataJson)
    return dispatch(createAction({
      endpoint: 'http://localhost:5000/users/register',
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      types: [
        REGISTER_REQUEST,
        REGISTER_SUCCESS,
        REGISTER_FAILURE
      ],
      body: dataJson
    }))
}
export const logIn = (data) => (dispatch) => {
    const dataJson = JSON.stringify(data)
    console.log("data JSON: ", dataJson)
    return dispatch(createAction({
        endpoint: 'http://localhost:5000/users/login',
        method: 'POST',
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        },
        types: [
        LOGIN_REQUEST,
        LOGIN_SUCCESS,
        LOGIN_FAILURE
        ],
        body: dataJson
    }))
}