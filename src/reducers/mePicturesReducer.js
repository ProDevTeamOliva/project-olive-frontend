import {
    ME_GET_PICTURES_SUCCESS,
    ME_GET_PICTURES_FAILURE,
    ME_POST_PICTURES_SUCCESS,
    ME_POST_PICTURES_FAILURE,
    ME_DELETE_PICTURES_SUCCESS,
    ME_DELETE_PICTURES_FAILURE,
    ME_GET_PICTURES_REQUEST,
} from "../types/meTypes";

const init_state = {
    pictures: [],
    message: "",
    isFetching: false,
    isFetched: false,
    isFetchingError: false,
};

const mePicturesReducer = (state = init_state, action) => {
    switch (action.type) {
        case ME_GET_PICTURES_SUCCESS:
            return {
                pictures: [...action.payload.pictures],
                message: action.payload.message,
            };
        case ME_GET_PICTURES_REQUEST:
            return {
                ...state,
                isFetching: true,
                isFetched: false,
                isFetchingError: false,
            };
        case ME_GET_PICTURES_FAILURE:
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
        case ME_DELETE_PICTURES_SUCCESS:
            return {
                pictures: state.pictures.filter(
                    picture => picture.id !== action.payload.idPicture
                ),
                message: action.payload.response.message,
            };
        case ME_DELETE_PICTURES_FAILURE:
            return {
                ...state,
                message: action.payload.response.message,
            };
        default:
            return state;
    }
};

export default mePicturesReducer;
