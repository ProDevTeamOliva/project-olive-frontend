import {
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  GET_COMMENTS_REQUEST,
  GET_MORE_COMMENTS_SUCCESS,
  GET_MORE_COMMENTS_REQUEST,
  GET_MORE_COMMENTS_FAILURE,
} from "../types/commentTypes";

const init_state = {
  isMoreComments: false,
  isFetching: false,
  isFetched: false,
  isFetchingError: false,
  comments: {},
};

const commentsReducer = (state = init_state, action) => {
  switch (action.type) {
    case GET_COMMENTS_SUCCESS:
      return {
        isMoreComments: action.payload.response.comments?.length > 0,
        isFetching: false,
        isFetched: true,
        isFetchingError: false,
        comments: {
          ...state.comments,
          [action.payload.idPost]: action.payload.response.comments,
        },
      };
    case GET_COMMENTS_REQUEST:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        isFetchingError: false,
      };
    case GET_COMMENTS_FAILURE:
      return {
        isMoreComments: false,
        isFetching: false,
        isFetched: false,
        isFetchingError: true,
        comments: state.comments,
      };
    case GET_MORE_COMMENTS_SUCCESS:
      return {
        isMoreComments: action.payload.response.comments?.length > 0,
        isFetching: false,
        isFetched: true,
        isFetchingError: false,
        comments: {
          ...state.comments,
          [action.payload.idPost]: [
            ...state.comments[action.payload.idPost],
            ...action.payload.response.comments,
          ],
        },
      };
    case GET_MORE_COMMENTS_REQUEST:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        isFetchingError: false,
      };
    case GET_MORE_COMMENTS_FAILURE:
      return {
        isMoreComments: false,
        isFetching: false,
        isFetched: false,
        isFetchingError: true,
        comments: state.comments,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.comment.postId]: [
            ...state.comments[action.payload.comment.postId],
            action.payload.comment,
          ],
        },
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.idPost]: state.comments[action.payload.idPost].filter(
            (comment) => comment.id !== action.payload.idComment
          ),
        },
      };
    case DELETE_COMMENT_FAILURE:
      return { ...state, comments: state.comments };
    default:
      return state;
  }
};
export default commentsReducer;
