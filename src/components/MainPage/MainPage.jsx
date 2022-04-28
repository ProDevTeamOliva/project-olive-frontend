import { Box, Grid, Text } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import Post from "../Posts/Post/Post";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import AddPostModal from "../PostForm/AddPostModal";
import FriendsSlider from "../FriendsSlider/FriendsSlider";
import { CgHashtag } from "react-icons/cg";
// https://github.com/astrit/css.gg

function MainPage({ changeLanguage, getPosts }) {
  const { t } = useTranslation();
  const languageValues = {
    noPost: t("noPosts"),
  };

  const postsIds = useSelector((state) => state.posts.map((post) => post.id));

  return (
    <Grid h="100vh" mt="75px" justifyContent="center">
      <Navbar changeLanguage={changeLanguage} />
      <Grid mt="50px" mb="20px" templateColumns="50% 40% 10%">
        <AddPostModal />
        <Box gridColumn="3/4" gridRow="1" align="left" ml="10px">
          <CgHashtag style={{ width: "40px", height: "40px" }} />
        </Box>
      </Grid>
      <FriendsSlider />
      <Grid m="25px" gap={5}>
        {postsIds.length > 0 ? (
          postsIds.map((postId) => <Post key={postId} id={postId} />)
        ) : (
          <Text textAlign="center">{languageValues.noPost}</Text>
        )}
      </Grid>
    </Grid>
  );
}

export default MainPage;
