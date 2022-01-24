import {
  USER_PICTURES_SUCCESS,
  USER_PICTURES_FAILURE,
} from "../types/userTypes";

const init_state = {
  pictures: [],
  message: "",
};

const userPicturesReducer = (state = init_state, action) => {
  switch (action.type) {
    case USER_PICTURES_SUCCESS:
      return {
        pictures: [...action.payload.pictures],
        message: action.payload.message,
      };
    case USER_PICTURES_FAILURE:
      return {
        ...state,
        message: action.payload.message,
      };
    default:
      return state;
  }
};

export default userPicturesReducer;
