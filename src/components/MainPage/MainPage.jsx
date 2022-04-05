import { Box, Grid, Text } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import Post from "../Posts/Post/Post";
import SearchByTags from "../Search/SearchByTags";
import AddPostModal from "../Posts/AddPost/AddPostModal";
import { getPosts } from "../../actions/postActions";
import { connect, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function MainPage({ changeLanguage, getPosts }) {
  const { t } = useTranslation();
  const languageValues = {
    noPost: t("noPosts"),
  };

  // useCallback(() => {
  //   getPosts();
  // }, [getPosts]);

  const postsIds = useSelector((state) => state.posts.map((post) => post.id));

  return (
    <Box h="100vh" mt="75px" d="grid" justifyContent="center">
      <Navbar changeLanguage={changeLanguage} />
      <SearchByTags />
      <AddPostModal />
      <Grid m="25px" gap={5}>
        {postsIds.length > 0 ? (
          postsIds.map((postId) => <Post key={postId} id={postId} />)
        ) : (
          <Text textAlign="center">{languageValues.noPost}</Text>
        )}
      </Grid>
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getPosts: () => dispatch(getPosts()),
});
export default connect(null, mapDispatchToProps)(MainPage);
