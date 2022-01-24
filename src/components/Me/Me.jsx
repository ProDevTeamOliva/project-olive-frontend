import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  useDisclosure,
  Wrap,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Navbar from "../Navbar/Navbar";
import FileUpload from "../FileUpload/FileUpload";
import toBase64 from "../../operations/base64";
import Post from "../Posts/Post";
import PublicPrivate from "../FileUpload/PublicPrivate";
import MagicGrid from "magic-grid-react";
import { baseUrl } from "../../config/baseUrl";
import { connect } from "react-redux";
import { tabStyle } from "../../styles/Tabs/tabStyle";
import { useEffect, useState, useRef } from "react";
import {
  getMe,
  getMePosts,
  getMePictures,
  patchMeAvatar,
  postMePictures,
  unAcceptFriendInvitation,
} from "../../actions/meActions";
import { getMeFriends } from "../../actions/meActions";
import Friend from "../Friend/Friend";

const Me = ({
  changeLanguage,
  getMe,
  getMePosts,
  getMePictures,
  patchMeAvatar,
  postMePictures,
  me,
  posts,
  pictures,
  getMeFriends,
  friends,
  unAcceptFriendInvitation,
}) => {
  const { t } = useTranslation();
  const { nameFirst, nameLast, login, avatar } = me?.me;
  const {
    isOpen: isOpenAvatar,
    onOpen: onOpenAvatar,
    onClose: onCloseAvatar,
  } = useDisclosure();
  const {
    isOpen: isOpenPictures,
    onOpen: onOpenPictures,
    onClose: onClosePictures,
  } = useDisclosure();
  const [publicPrivate, setPublicPrivate] = useState(false);
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

  const handleAvatarUpload = () => {
    const file = document.querySelector("#avatarUpload")["files"][0];
    const reader = new FileReader();

    reader.onloadend = () => {
      patchMeAvatar(file.name, reader.result);
      getMe();
      onCloseAvatar();
    };

    reader.readAsDataURL(file);
  };

  const handlePicturesUpload = async () => {
    const files = document.querySelector("#picturesUpload")["files"];
    let pictures = [];

    for (const file of files) {
      const file64 = await toBase64(file);
      pictures.push({
        filename: file.name,
        picture: file64,
        private: publicPrivate,
      });
    }

    postMePictures(pictures);
    gridRef.current.positionItems();
    onClosePictures();
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
            <Button
              onClick={onOpenAvatar}
              variant="unstyled"
              boxSize={{ base: "12rem", md: "16rem" }}
              _focus={{ outline: "none" }}
            >
              <Avatar
                boxSize={{ base: "12rem", md: "16rem" }}
                src={baseUrl + avatar}
              />
            </Button>

            <Modal isOpen={isOpenAvatar} onClose={onCloseAvatar} isCentered>
              <ModalOverlay />
              <ModalContent mx="4">
                <ModalHeader>{t("addProfilePicture")}</ModalHeader>
                <ModalCloseButton mt="2" mr="1" _focus={{ outline: "none" }} />
                <ModalBody pb="4">
                  <FileUpload
                    id="avatarUpload"
                    accept="image/*"
                    w="75%"
                    d="block"
                    mx="auto"
                    onChange={handleAvatarUpload}
                  />
                </ModalBody>
              </ModalContent>
            </Modal>
          </Flex>
          <Stack
            flex="1"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            pt={{ base: "4", md: "0" }}
          >
            <Heading fontSize="2xl" textAlign="center">
              {nameFirst} {nameLast}
            </Heading>
            <Text fontWeight="600" color="gray.500" size="sm">
              {login && `@${login}`}
            </Text>
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
              <Button onClick={onOpenPictures} mb="4">
                {t("addImages")}
              </Button>

              <Modal
                isOpen={isOpenPictures}
                onClose={onClosePictures}
                isCentered
              >
                <ModalOverlay />
                <ModalContent mx="4">
                  <ModalHeader>{t("addImages")}</ModalHeader>
                  <ModalCloseButton
                    mt="2"
                    mr="1"
                    _focus={{ outline: "none" }}
                  />
                  <ModalBody pb="4">
                    <Box mb="4" textAlign="center">
                      <PublicPrivate setValue={setPublicPrivate} />
                    </Box>
                    <FileUpload
                      id="picturesUpload"
                      accept="image/*"
                      multiple
                      w="75%"
                      d="block"
                      mx="auto"
                      onChange={handlePicturesUpload}
                    />
                  </ModalBody>
                </ModalContent>
              </Modal>

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

            <TabPanel>
              <Wrap spacing="80px" justify="center">
                {friends.length > 0 ? (
                  friends.map(({ id, avatar, nameFirst, nameLast }) => (
                    <Friend
                      key={id}
                      id={id}
                      avatar={avatar}
                      nameFirst={nameFirst}
                      nameLast={nameLast}
                      unAcceptFriendInvitation={unAcceptFriendInvitation}
                    />
                  ))
                ) : (
                  <Text>{t("noFriends")}</Text>
                )}
              </Wrap>
            </TabPanel>
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
  friends: state.meFriends.friends,
});

const mapDispatchToProps = (dispatch) => ({
  getMe: () => dispatch(getMe()),
  getMePosts: () => dispatch(getMePosts()),
  getMePictures: () => dispatch(getMePictures()),
  patchMeAvatar: (filename, avatar) =>
    dispatch(patchMeAvatar(filename, avatar)),
  postMePictures: (pictures) => dispatch(postMePictures(pictures)),
  getMeFriends: () => dispatch(getMeFriends()),
  unAcceptFriendInvitation: (id) => dispatch(unAcceptFriendInvitation(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Me);
