import {
  TAGS_SUCCESS,
  TAGS_FAILURE,
  DELETE_POST_SUCCESS,
  TAGS_REQUEST,
  TAGS_MORE_SUCCESS,
  TAGS_MORE_REQUEST,
  TAGS_MORE_FAILURE,
  DISLIKE_SUCCESS,
  LIKE_SUCCESS,
} from "../types/postTypes";

const init_state = {
  posts: [],
  isMorePosts: false,
  isFetching: false,
  isFetched: false,
  isFetchingError: false,
};

const postsFilteredByTag = (state = init_state, action) => {
  switch (action.type) {
    case TAGS_SUCCESS:
      return {
        ...state,
        posts: action.payload.posts,
        isMorePosts: action.payload.posts?.length > 0,
        isFetching: false,
        isFetched: true,
        isFetchingError: false,
      };
    case TAGS_REQUEST:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        isFetchingError: false,
      };
    case TAGS_MORE_FAILURE:
      return {
        ...state,
        isFetchingError: true,
        isFetched: false,
        isFetching: false,
      };
    case TAGS_MORE_REQUEST:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        isFetchingError: false,
      };
    case TAGS_MORE_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.posts],
        isMorePosts: action.payload.posts?.length > 0,
        isFetching: false,
        isFetched: true,
        isFetchingError: false,
      };
    case TAGS_FAILURE:
      return { ...state, isFetching: false, isFetchingError: true };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.filter((post) => post.id !== action.payload.idPost),
      };

    case LIKE_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === action.payload.id) {
            return { ...post, likes: post.likes + 1, likesMe: true };
          }
          return post;
        }),
      };
    case DISLIKE_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === action.payload.id) {
            return {
              ...post,
              likes: post.likes - 1,
              likesMe: false,
            };
          }
          return post;
        }),
      };
    default:
      return state;
  }
};

export default postsFilteredByTag;
