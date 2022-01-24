import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import Post from "../Posts/Post";
import { useEffect } from "react";
import { getPostsByTag } from "../../actions/postActions";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

function PostsFiltered({ tag, changeLanguage, getPostsByTag, posts }) {
  useEffect(() => {
    getPostsByTag(tag);
    const intervalId = setInterval(() => {
      getPostsByTag(tag);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [tag, getPostsByTag]);

  const { t } = useTranslation();

  return (
    <Box h="100vh" mt="75px" d="grid" justifyContent="center">
      <Navbar changeLanguage={changeLanguage} />
      <Grid m="25px" gap={5}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <GridItem key={post.id}>
              <Post property={post} />
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
  posts: state.postsFiltered,
});
const mapDispatchToProps = (dispatch) => ({
  getPostsByTag: (tag) => dispatch(getPostsByTag(tag)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PostsFiltered);
