import { Grid } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import Post from "../Posts/Post/Post";
import { useSelector } from "react-redux";
import FriendsSlider from "../FriendsSlider/FriendsSlider";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import MidSection from "./MidSection";

function MainPage({ changeLanguage }) {
  const postsIds = useSelector((state) => state.posts.map((post) => post.id));

  return (
    <Grid h="100vh" mt="75px" justifyContent="center">
      <Navbar changeLanguage={changeLanguage} />
      <MidSection />
      <FriendsSlider />
      <Grid m="25px" w={["300px", "400px", "600px", "800px", "950px"]}>
        {postsIds.length > 0 ? (
          postsIds.map((postId) => <Post key={postId} id={postId} />)
        ) : (
          <LoadingSpinner />
        )}
      </Grid>
    </Grid>
  );
}

export default MainPage;
