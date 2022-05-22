import { Grid } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import Post from "../Posts/Post/Post";
import { useEffect } from "react";
import { getPostsByTag } from "../../actions/postActions";
import { connect } from "react-redux";
import LoadingSpinner from "../Spinner/LoadingSpinner";

function PostsFiltered({ tag, changeLanguage, getPostsByTag, posts }) {
  useEffect(() => {
    getPostsByTag(tag);
  }, []);

  return (
    <Grid mt="150px" justifyContent="center">
      <Navbar changeLanguage={changeLanguage} />
      <Grid m="25px" gap={8}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Post key={post.id} property={post} id={post.id} />
          ))
        ) : (
          <LoadingSpinner />
        )}
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  posts: state.postsFiltered,
});
const mapDispatchToProps = (dispatch) => ({
  getPostsByTag: (tag) => dispatch(getPostsByTag(tag)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PostsFiltered);
