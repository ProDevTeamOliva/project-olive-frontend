import {
  Avatar,
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Navbar from "../Navbar/Navbar";
import Post from "../Posts/Post";
import MagicGrid from "magic-grid-react";
import { connect } from "react-redux";
import { tabStyle } from "../../styles/Tabs/tabStyle";
import { useEffect, useRef } from "react";
import { getMe, getMePosts, getMePictures } from "../../actions/meActions";

const Me = ({
  changeLanguage,
  getMe,
  getMePosts,
  getMePictures,
  me,
  posts,
  pictures,
}) => {
  const { t } = useTranslation();
  const { nameFirst, nameLast, login, avatar } = me?.me;
  const gridRef = useRef();

  useEffect(() => {
    getMe();
    getMePosts();
    getMePictures();
  }, [getMe, getMePosts, getMePictures]);

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
          p="20"
        >
          <Flex flex="1" justifyContent="center" alignItems="center">
            <Avatar
              h={{ base: "12rem", md: "16rem" }}
              w={{ sm: "12rem", md: "16rem" }}
              src={avatar}
            />
          </Flex>
          <Stack
            flex="1"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Heading fontSize="2xl" textAlign="center">
              {nameFirst} {nameLast}
            </Heading>
            <Text fontWeight="600" color="gray.500" size="sm">
              @{login}
            </Text>

            <Stack
              w="100%"
              mb="2rem"
              direction="row"
              padding="2"
              justifyContent="space-between"
              alignItems="center"
            ></Stack>
          </Stack>
        </Stack>
        <Tabs variant="soft-rounded" align="center">
          <TabList>
            <Tab {...tabStyle}>{t("posts")}</Tab>
            <Tab {...tabStyle} onClick={() => gridRef.current.positionItems()}>
              {t("images")}
            </Tab>
            <Tab {...tabStyle}>{t("friends")}</Tab>
          </TabList>
          <TabPanels>
            {/* Posts */}
            <TabPanel>
              {posts?.posts
                ? posts.posts.map((post) => (
                    <Post property={post} key={post.id} />
                  ))
                : t("noPosts")}
            </TabPanel>
            {/* Images */}
            <TabPanel px="0" py="4">
              <MagicGrid
                items={pictures.pictures.length}
                ref={gridRef}
                useTransform={false}
              >
                {pictures?.pictures.length > 0
                  ? pictures.pictures.map((picture) => (
                      <Box
                        w={{ base: "90%", md: "45%", lg: "29%" }}
                        key={picture.id}
                      >
                        <Image src={picture.picture} w="100%"></Image>
                      </Box>
                    ))
                  : t("noImages")}
              </MagicGrid>
            </TabPanel>
            {/* Friends */}
            <TabPanel>{t("noFriends")}</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  me: state.me,
  posts: state.mePosts,
  pictures: state.mePictures,
});

const mapDispatchToProps = (dispatch) => ({
  getMe: () => dispatch(getMe()),
  getMePosts: () => dispatch(getMePosts()),
  getMePictures: () => dispatch(getMePictures()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Me);
