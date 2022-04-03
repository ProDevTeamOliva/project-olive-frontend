import {
  Box,
  Grid,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Stack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Navbar from "../Navbar/Navbar";
import Post from "../Posts/Post/Post";
import { connect, useSelector } from "react-redux";
import { tabStyle } from "../../styles/Tabs/tabStyle";
import { useEffect, useRef } from "react";
import { getMe, getMePosts, getMePictures } from "../../actions/meActions";
import MagicGridImages from "../Images/MagicGridImages";
import Friends from "../Friends/Friends";
import ModalAddImageMe from "../Images/ModalAddImageMe";
import ModalAddAvatarMe from "../Images/ModalAddAvatarMe";
import InfoAboutMe from "./InfoAboutMe";

function Me({ changeLanguage, getMe, getMePosts, getMePictures }) {
  const { t } = useTranslation();
  const languageValues = {
    posts: t("posts"),
    images: t("images"),
    friends: t("friends"),
    noPosts: t("noPosts"),
  };

  const postsMe = useSelector((state) => state.mePosts.posts);
  const pictures = useSelector((state) => state.mePictures.pictures);

  const gridRef = useRef();

  useEffect(() => {
    getMe();
  }, [getMe]);

  useEffect(() => {
    getMePosts();
    getMePictures();
    const intervalId = setInterval(() => {
      getMePosts();
      getMePictures();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [getMePosts, getMePictures]);

  return (
    <Grid
      h="100vh"
      mt="75px"
      justifyContent="center"
      templateColumns="minmax(200px, 1000px)"
    >
      <Navbar changeLanguage={changeLanguage} />
      <Box p="25px">
        <Stack
          height={{ sm: "500px", md: "20rem" }}
          direction={{ base: "column", md: "row" }}
          p="4"
        >
          <ModalAddAvatarMe />
          <InfoAboutMe />
        </Stack>
        <Tabs variant="soft-rounded" align="center">
          <TabList>
            <Tab {...tabStyle}>{languageValues.posts}</Tab>
            <Tab {...tabStyle}>{languageValues.images}</Tab>
            <Tab {...tabStyle}>{languageValues.friends}</Tab>
          </TabList>

          <TabPanels>
            {/* Posts */}
            <TabPanel>
              {postsMe.length > 0
                ? postsMe.map((post) => <Post id={post.id} key={post.id} />)
                : languageValues.noPosts}
            </TabPanel>

            {/* Images */}
            <TabPanel px="0" py="4">
              <ModalAddImageMe />
              <MagicGridImages pictures={pictures} gridRef={gridRef} />
            </TabPanel>

            {/* Friends */}
            <TabPanel>
              <Friends />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getMe: () => dispatch(getMe()),
  getMePosts: () => dispatch(getMePosts()),
  getMePictures: () => dispatch(getMePictures()),
});

export default connect(null, mapDispatchToProps)(Me);
