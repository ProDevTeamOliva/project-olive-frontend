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
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Navbar from "../Navbar/Navbar";
import FileUpload from "../FileUpload/FileUpload";
import Post from "../Posts/Post";
import MagicGrid from "magic-grid-react";
import { baseUrl } from "../../config/baseUrl";
import { connect } from "react-redux";
import { tabStyle } from "../../styles/Tabs/tabStyle";
import { useEffect, useRef } from "react";
import {
  getMe,
  getMePosts,
  getMePictures,
  patchMeAvatar,
} from "../../actions/meActions";

const Me = ({
  changeLanguage,
  getMe,
  getMePosts,
  getMePictures,
  patchMeAvatar,
  me,
  posts,
  pictures,
}) => {
  const { t } = useTranslation();
  const { nameFirst, nameLast, login, avatar } = me?.me;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const gridRef = useRef();

  useEffect(() => {
    getMe();
    getMePosts();
    getMePictures();
  }, [getMe, getMePosts, getMePictures]);

  const handleAvatarUpload = () => {
    const file = document.querySelector("input[type=file]")["files"][0];
    const reader = new FileReader();

    reader.onloadend = () => {
      patchMeAvatar(file.name, reader.result);
      getMe();
      onClose();
    };

    reader.readAsDataURL(file);
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
              onClick={onOpen}
              variant="unstyled"
              boxSize={{ base: "12rem", md: "16rem" }}
              _focus={{ outline: "none" }}
            >
              <Avatar
                boxSize={{ base: "12rem", md: "16rem" }}
                src={baseUrl + avatar}
              />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
              <ModalOverlay />
              <ModalContent mx="4">
                <ModalHeader>{t("addProfilePicture")}</ModalHeader>
                <ModalCloseButton mt="2" mr="1" _focus={{ outline: "none" }} />
                <ModalBody pb="4">
                  <FileUpload
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
              @{login}
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
  patchMeAvatar: (filename, avatar) =>
    dispatch(patchMeAvatar(filename, avatar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Me);
