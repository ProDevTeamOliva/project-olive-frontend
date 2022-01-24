import {
  Avatar,
  Box,
  Button,
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
import { blueButtonStyle } from "../../styles/Buttons/blueButton";
import Post from "../Posts/Post";
import MagicGrid from "magic-grid-react";
import { baseUrl } from "../../config/baseUrl";
import { connect } from "react-redux";
import { tabStyle } from "../../styles/Tabs/tabStyle";
import { useEffect, useRef } from "react";
import {
  addToFriends,
  getUser,
  getUserPosts,
  getUserPictures,
} from "../../actions/userActions";

const User = ({
  changeLanguage,
  id,
  getUser,
  getUserPosts,
  getUserPictures,
  addToFriends,
  user,
  posts,
  pictures,
  meFriends,
  pendingSent,
}) => {
  const { t } = useTranslation();
  const { nameFirst, nameLast, login, avatar } = user?.user;
  const gridRef = useRef();

  useEffect(() => {
    getUser(id);
    getUserPosts(id);
    getUserPictures(id);
  }, [getUser, getUserPictures, getUserPosts, id]);

  const checkExistUserInMeListOfFriends = () => {
    return meFriends.filter((friend) => friend.id === id).length === 0;
  };

  const checkExistUserInPendingSent = () => {
    return pendingSent.filter((friend) => friend.id === id).length === 1;
  };

  const textStyle = {
    textAlign: "center",
    color: "blue.400",
    fontSize: "25px",
    w: "100%",
  };

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
          <Flex flex="1" justifyContent="center" alignItems="center">
            <Avatar
              boxSize={{ base: "12rem", md: "16rem" }}
              src={baseUrl + avatar}
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
              {login && `@${login}`}
            </Text>

            <Stack
              w="100%"
              mb="2rem"
              direction="row"
              padding="2"
              justifyContent="space-between"
              alignItems="center"
            >
              {checkExistUserInMeListOfFriends() &&
                !checkExistUserInPendingSent() && (
                  <Button
                    {...blueButtonStyle}
                    w="80%"
                    m="auto"
                    d="block"
                    onClick={() => addToFriends(id)}
                  >
                    {t("addFriend")}
                  </Button>
                )}
              {checkExistUserInPendingSent() && (
                <Text {...textStyle}>{t("sentInvitation")}</Text>
              )}
              {!checkExistUserInMeListOfFriends() && (
                <Text {...textStyle}>{t("isFriend")}</Text>
              )}
            </Stack>
          </Stack>
        </Stack>
        <Tabs variant="soft-rounded" align="center">
          <TabList>
            <Tab {...tabStyle}>{t("posts")}</Tab>
            <Tab {...tabStyle}>{t("images")}</Tab>
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
                        <Image src={baseUrl + picture.picture} w="100%"></Image>
                      </Box>
                    ))
                  : t("noImages")}
              </MagicGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  posts: state.userPosts,
  pictures: state.userPictures,
  meFriends: state.meFriends.friends,
  pendingSent: state.meFriends.pendingSent,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: (id) => dispatch(getUser(id)),
  getUserPosts: (id) => dispatch(getUserPosts(id)),
  getUserPictures: (id) => dispatch(getUserPictures(id)),
  addToFriends: (id) => dispatch(addToFriends(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
