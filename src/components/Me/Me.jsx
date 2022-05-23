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
import { useDispatch, useSelector } from "react-redux";
import { tabStyle } from "../../styles/Tabs/tabStyle";
import { memo, useCallback, useEffect } from "react";
import {
  getMe,
  getMePosts,
  getMePictures,
  getMoreMePosts,
} from "../../actions/meActions";
import MagicGridImages from "../Images/MagicGridImages";
import Friends from "../Friends/Friends";
import ModalAddImageMe from "../Images/ModalAddImageMe";
import ModalAvatarMe from "../Images/ModalAvatarMe";
import InfoAboutMeV1 from "./InfoAboutMeV1";
import AddPostModal from "../PostForm/AddPostModal";
import SearchModal from "../Search/SearchModal";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import LoadMore from "../InfinityScroll/LoadMore";

function Me({ changeLanguage }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const languageValues = {
    posts: t("posts"),
    images: t("images"),
    friends: t("friends"),
    loadMorePosts: t("loadMorePosts"),
    noMorePosts: t("noMorePosts"),
  };

  const postsMe = useSelector((state) => state.mePosts.posts);
  const isMorePosts = useSelector((state) => state.mePosts.isMorePosts);
  const isLoading = useSelector((state) => state.mePosts.isFetching);

  useEffect(() => {
    dispatch(getMe());
    dispatch(getMePosts());
    dispatch(getMePictures());
  }, [dispatch]);

  const onClickLoadMore = useCallback(() => {
    if (postsMe?.length > 0) {
      dispatch(getMoreMePosts(postsMe[postsMe.length - 1].id));
    }
  }, [dispatch, postsMe]);

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
          <ModalAvatarMe />
          <InfoAboutMeV1 />
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
              <Grid mt="10px" mb="40px" templateColumns="50% 40% 10%" mx="40px">
                <AddPostModal />
                <Box gridColumn="3/4" ml={["40px", "30px", "20px", "10px"]}>
                  <SearchModal kindOfSearch="tag" />
                </Box>
              </Grid>
              {postsMe.length > 0 ? (
                <>
                  {postsMe.map((post) => (
                    <Post id={post.id} key={post.id} />
                  ))}
                  <LoadMore
                    isMore={isMorePosts}
                    isLoading={isLoading}
                    onClickLoadMore={onClickLoadMore}
                    loadMoreText={languageValues.loadMorePosts}
                    noMoreText={languageValues.noMorePosts}
                  />
                </>
              ) : (
                <LoadingSpinner />
              )}
            </TabPanel>

            {/* Images */}
            <TabPanel px="0" py="4">
              <ModalAddImageMe />
              <MagicGridImages />
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

export default memo(Me);
