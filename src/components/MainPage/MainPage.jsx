import { Grid, Text } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import Post from "../Posts/Post/Post";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import FriendsSlider from "../FriendsSlider/FriendsSlider";
import MidSection from "./MidSection";

function MainPage({ changeLanguage }) {
  const { t } = useTranslation();
  const languageValues = {
    noPost: t("noPosts"),
  };

  const postsIds = useSelector((state) => state.posts.map((post) => post.id));

  return (
    <Grid h="100vh" mt="75px" justifyContent="center">
      <Navbar changeLanguage={changeLanguage} />
      <MidSection />
      <FriendsSlider />
      <Grid m="25px" gap={8}>
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
