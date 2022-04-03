import {
  Box,
  Grid,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Navbar from "../Navbar/Navbar";
import Post from "../Posts/Post/Post";
import { connect, useSelector } from "react-redux";
import { tabStyle } from "../../styles/Tabs/tabStyle";
import { useEffect, useRef } from "react";
import {
  getUser,
  getUserPosts,
  getUserPictures,
} from "../../actions/userActions";
import MagicGridImages from "../Images/MagicGridImages";
import InfoAboutUser from "./InfoAboutUser";

function User({ changeLanguage, id, getUser, getUserPosts, getUserPictures }) {
  const { t } = useTranslation();
  const languageValues = {
    posts: t("posts"),
    images: t("images"),
    noPosts: t("noPosts"),
  };

  const gridRef = useRef();

  const pictures = useSelector((state) => state.userPictures.pictures);
  const posts = useSelector((state) => state.userPosts);

  useEffect(() => {
    getUser(id);
  }, [getUser, id]);

  useEffect(() => {
    getUserPosts(id);
    getUserPictures(id);
    const intervalId = setInterval(() => {
      getUserPosts(id);
      getUserPictures(id);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [getUserPosts, getUserPictures, id]);

  return (
    <Grid
      h="100vh"
      mt="75px"
      justifyContent="center"
      templateColumns="minmax(200px, 1000px)"
    >
      <Navbar changeLanguage={changeLanguage} />
      <Box p="25px">
        <InfoAboutUser id={id} />

        <Tabs variant="soft-rounded" align="center">
          <TabList>
            <Tab {...tabStyle}>{languageValues.posts}</Tab>
            <Tab {...tabStyle}>{languageValues.images}</Tab>
          </TabList>

          <TabPanels>
            {/* Posts */}
            <TabPanel>
              {posts?.posts
                ? posts.posts.map((post) => (
                    <Post property={post} key={post.id} id={post.id} />
                  ))
                : languageValues.noPosts}
            </TabPanel>

            {/* Images */}
            <TabPanel px="0" py="4">
              <MagicGridImages pictures={pictures} gridRef={gridRef} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getUser: (id) => dispatch(getUser(id)),
  getUserPosts: (id) => dispatch(getUserPosts(id)),
  getUserPictures: (id) => dispatch(getUserPictures(id)),
});

export default connect(null, mapDispatchToProps)(User);
