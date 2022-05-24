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
import { useDispatch, useSelector } from "react-redux";
import { tabStyle } from "../../styles/Tabs/tabStyle";
import { useEffect, memo } from "react";
import {
  getUser,
  getUserPosts,
  getUserPictures,
} from "../../actions/userActions";
import ResponsiveMasonryImages from "../Images/ResponsiveMasonryImages";
import InfoAboutUser from "./InfoAboutUser";
import LoadingSpinner from "../Spinner/LoadingSpinner";

function User({ changeLanguage, id }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const languageValues = {
    posts: t("posts"),
    images: t("images"),
  };

  const isLoading = useSelector((state) => state.userPictures.isFetching);
  const posts = useSelector((state) => state.userPosts.posts);
  const pictures = useSelector((state) => state.userPictures.pictures);

  useEffect(() => {
    dispatch(getUser(id));
    dispatch(getUserPosts(id));
    dispatch(getUserPictures(id));
  }, [id, dispatch]);

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
              {posts.length > 0 ? (
                posts.map((post) => (
                  <Post property={post} key={post.id} id={post.id} />
                ))
              ) : (
                <LoadingSpinner isLoading={isLoading} />
              )}
            </TabPanel>

            {/* Images */}
            <TabPanel px="0" py="4">
              <ResponsiveMasonryImages pictures={pictures} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Grid>
  );
}

export default memo(User);
