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
      return {
        message: action.payload.message,
        status: "201",
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
