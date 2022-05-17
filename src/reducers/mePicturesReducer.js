import {
  ME_PICTURES_SUCCESS,
  ME_PICTURES_FAILURE,
  ME_POST_PICTURES_SUCCESS,
  ME_POST_PICTURES_FAILURE,
} from "../types/meTypes";

const init_state = {
  pictures: [],
  message: "",
};

const mePicturesReducer = (state = init_state, action) => {
  switch (action.type) {
    case ME_PICTURES_SUCCESS:
      return {
        pictures: [...action.payload.pictures],
        message: action.payload.message,
      };
    case ME_PICTURES_FAILURE:
      return {
        ...state,
        message: action.payload.message,
      };
    case ME_POST_PICTURES_SUCCESS:
      return {
        pictures: [...state.pictures, ...action.payload.pictures],
        message: action.payload.message,
      };
    case ME_POST_PICTURES_FAILURE:
      return {
        ...state,
        message: action.payload.message,
      };
    default:
      return state;
  }
};

export default mePicturesReducer;
