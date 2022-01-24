import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import Post from "../Posts/Post";
import SearchByTags from "../Search/SearchByTags";
import AddPostModal from "../Posts/AddPostModal";
import { useCallback } from "react";
import { getPosts } from "../../actions/postActions";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

function MainPage({ changeLanguage, getPosts, posts }) {
  useCallback(() => {
    getPosts();
  }, [getPosts]);
  const { t } = useTranslation();

  return (
    <Box h="100vh" mt="75px" d="grid" justifyContent="center">
      <Navbar changeLanguage={changeLanguage} />
      <SearchByTags />
      <AddPostModal />
      <Grid m="25px" gap={5}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <GridItem key={post.id}>
              <Post property={post} key={post.id} />
            </GridItem>
          ))
        ) : (
          <Text textAlign="center">{t("noPosts")}</Text>
        )}
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
