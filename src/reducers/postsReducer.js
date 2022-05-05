import {
  ADD_POST_SUCCESS,
  GET_POSTS_SUCCESS,
  LIKE_SUCCESS,
} from "../types/postTypes";

const init_state = [];

const postsReducer = (state = init_state, action) => {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return action.payload.posts;
    //ZAGADAĆ Z BACKENDEM, ŻEBY ZWRACAŁ ID I ME.
    case LIKE_SUCCESS:
      return state.map(post => {
        if(post.id === action.payload.id){
          return {...post, likes: [...post.likes, action.payload.liker]} 
        }
        return post
      })
    case ADD_POST_SUCCESS:
      return [{...action.payload.post, likes: []},...state];
    default:
      return state;
  }
};
export default postsReducer;
