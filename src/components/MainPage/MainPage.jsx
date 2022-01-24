import { Box, Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import Post from "../Posts/Post";
import AddPostModal from "../Posts/AddPostModal";
import { useCallback } from "react";
import { getPosts } from "../../actions/postActions";
import { connect } from "react-redux";

function MainPage({ changeLanguage, getPosts, posts }) {
  useCallback(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Box h="100vh" mt="75px" d="grid" justifyContent="center">
      <Navbar changeLanguage={changeLanguage} />
      <AddPostModal />
      <Grid m="25px" gap={5}>
        {/* <Grid templateColumns="minmax(200px, 500px)" gap={5} m="25px"> */}
        {posts.map((post) => (
          <GridItem key={post.id}>
            <Post property={post} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  posts: state.posts,
});
const mapDispatchToProps = (dispatch) => ({
  getPosts: () => dispatch(getPosts()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
