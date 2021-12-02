import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_RESTART,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../types/loginTypes";
const init_state = {
  isAuth: localStorage.getItem("token") ? true : false,
  message: "",
  status: "",
};
const logInReducer = (state = init_state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", "true");
      return {
        message: action.payload.message,
        isAuth: localStorage.getItem("token") ? true : false,
        status: "201",
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        message: action.payload.response.message,
        status: action.payload.status,
      };
    case LOGOUT_SUCCESS:
      return {
        message: action.payload.message,
        isAuth: "logout",
        status: "200",
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        message: action.payload.response.message,
        status: action.payload.status,
      };
    case LOGIN_RESTART:
      return {
        message: "",
        isAuth: localStorage.getItem("token") ? true : false,
        status: "",
      };
    default:
      return state;
  }
};
export default logInReducer;
