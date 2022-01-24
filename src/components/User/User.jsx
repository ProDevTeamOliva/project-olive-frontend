import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
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
import { connect } from "react-redux";
import { useEffect } from "react";
import { tabStyle } from "../../styles/Tabs/tabStyle";
import { addToFriends, getUser, getUserPosts } from "../../actions/userActions";

const User = ({
  changeLanguage,
  id,
  getUser,
  getUserPosts,
  addToFriends,
  user,
  posts,
  meFriends,
  pendingSent,
}) => {
  const { t } = useTranslation();
  const { nameFirst, nameLast, login, avatar } = user?.user;

  useEffect(() => {
    getUser(id);
    getUserPosts(id);
  }, [id]);

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
                    <GridItem key={post.id}>
                      <Post property={post} />
                    </GridItem>
                  ))
                : t("noPosts")}
            </TabPanel>
            {/* Images */}
            <TabPanel>
              <p>{t("images")}</p>
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
  meFriends: state.meFriends.friends,
  pendingSent: state.meFriends.pendingSent,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: (id) => dispatch(getUser(id)),
  getUserPosts: (id) => dispatch(getUserPosts(id)),
  addToFriends: (id) => dispatch(addToFriends(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);