import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_RESTART,
} from "../types/registerTypes";
const init_state = {
  message: "",
  status: "",
};
const registerReducer = (state = init_state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      // Zmieni się jak backend zmieni
      return {
        // message: action.payload.message,
        // status: "",
        ...state,
      };
    case REGISTER_FAILURE:
      return {
        message: action.payload.response.message,
        status: action.payload.status,
      };
    case REGISTER_RESTART:
      return {
        message: "",
        status: "",
      };
    default:
      return state;
  }
};
export default registerReducer;
