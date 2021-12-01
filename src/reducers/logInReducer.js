import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_RESTART,
} from "../types/loginTypes";
const init_state = {
  isAuth: localStorage.getItem("token") ? true : false,
  message: "",
};
const logInReducer = (state = init_state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", "true");
      return {
        message: action.payload.message,
        isAuth: localStorage.getItem("token") ? true : false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        message: action.payload.response.message,
      };
    case LOGIN_RESTART:
      return {
        message: "",
        isAuth: localStorage.getItem("token") ? true : false,
      };
    default:
      return state;
  }
};
export default logInReducer;
