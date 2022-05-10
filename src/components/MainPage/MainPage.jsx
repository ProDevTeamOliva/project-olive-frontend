import { Grid } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import Post from "../Posts/Post/Post";
import { useSelector, useDispatch } from "react-redux";
import FriendsSlider from "../FriendsSlider/FriendsSlider";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import MidSection from "./MidSection";
import { useCallback } from "react";
import { getMorePosts } from "../../actions/postActions";

function MainPage({ changeLanguage }) {
  const dispatch = useDispatch();

  const postsIds = useSelector((state) => state.posts.posts.map((post) => post.id));
  const isMorePosts = useSelector((state) => state.posts.isMorePosts)
  const isLoading = useSelector((state) => state.posts.isFetching )

  const onClickLoadMore = useCallback(() => {
    if(postsIds?.length > 0){ 
      dispatch(getMorePosts(postsIds[postsIds.length-1]));
    }
  }, [dispatch, postsIds])

  return (
    <Grid h="100vh" mt="75px" justifyContent="center">
      <Navbar changeLanguage={changeLanguage} />
      <MidSection />
      <FriendsSlider />
      <Grid m="25px" w={["300px", "400px", "600px", "800px", "950px"]}>
        {postsIds.length > 0 ? (
         <>{postsIds.map((postId) => <Post key={postId} id={postId} />)}{isMorePosts && 
          !isLoading && <button onClick={onClickLoadMore}>LOAD MORE</button>}</>
        ) : (
          <LoadingSpinner />
        )}
      </Grid>
    </Grid>
  );
}

export default MainPage;
