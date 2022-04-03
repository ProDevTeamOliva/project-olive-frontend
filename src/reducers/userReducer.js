import {
  USER_SUCCESS,
  USER_FAILURE,
  USER_ADD_TO_FRIENDS_SUCCESS,
  USER_ADD_TO_FRIENDS_FAILURE,
} from "../types/userTypes";

const init_state = {
  user: {},
  message: "",
};

const userReducer = (state = init_state, action) => {
  switch (action.type) {
    case USER_SUCCESS:
      return {
        user: action.payload.user,
        message: action.payload.message,
      };
    case USER_FAILURE:
      return {
        user: {},
        message: action.payload.message,
      };
    case USER_ADD_TO_FRIENDS_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
      };
    case USER_ADD_TO_FRIENDS_FAILURE:
      return {
        ...state,
        message: action.payload.message,
      };
    default:
      return state;
  }
};
export default userReducer;
