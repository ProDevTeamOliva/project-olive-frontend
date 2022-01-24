import {
  ME_SUCCESS,
  ME_FAILURE,
  ME_AVATAR_SUCCESS,
  ME_AVATAR_FAILURE,
} from "../types/meTypes";

const init_state = {
  me: {},
  message: "",
};

const meReducer = (state = init_state, action) => {
  switch (action.type) {
    case ME_SUCCESS:
      return {
        me: action.payload.user,
        message: action.payload.message,
      };
    case ME_FAILURE:
      return {
        me: {},
        message: action.payload.message,
      };
    case ME_AVATAR_SUCCESS:
      return {
        me: action.payload.user,
        message: action.payload.message,
      };
    case ME_AVATAR_FAILURE:
      return {
        ...state,
        message: action.payload.message,
      };
    default:
      return state;
  }
};
export default meReducer;
