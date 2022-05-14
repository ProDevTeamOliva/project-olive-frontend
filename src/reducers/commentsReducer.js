import {
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from "../types/commentTypes";

const init_state = {
  message: "",
  comments: {},
};

const commentsReducer = (state = init_state, action) => {
  switch (action.type) {
    case GET_COMMENTS_SUCCESS:
      return {
        message: action.payload.message,
        comments: {
          ...state.comments,
          [action.payload.idPost]: action.payload.response.comments,
        },
      };
    case GET_COMMENTS_FAILURE:
      return { message: action.payload.message, comments: {} };

    case ADD_COMMENT_SUCCESS:
      return {
        message: action.payload.message,
        comments: {
          ...state.comments,
          [action.payload.comment.postId]: [
            ...state.comments[action.payload.comment.postId],
            action.payload.comment,
          ],
        },
      };
    case ADD_COMMENT_FAILURE:
      return { message: action.payload.message, comments: {} };
    default:
      return state;
  }
};
export default commentsReducer;
