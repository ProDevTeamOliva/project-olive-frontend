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
import { connect } from "react-redux";
import { getMe, getMePictures } from "../../actions/meActions";
import { useEffect, useRef } from "react";

const Me = ({ changeLanguage, me, pictures }) => {
  const { t } = useTranslation();
  const { nameFirst, nameLast, login, avatar } = me?.me;
  const gridRef = useRef();

  useEffect(() => {
    getMe();
    getMePictures();
  }, []);

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
            <Heading fontSize="2xl">
              {nameFirst} {nameLast}
            </Heading>
            <Text fontWeight="600" color="gray.500" size="sm">
              {`@${login}`}
            </Text>

            <Stack
              width={"100%"}
              mb={"2rem"}
              direction={"row"}
              padding={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Button {...blueButtonStyle} w="80%" m="auto" d="block">
                {t("addFriend")}
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <Tabs variant="soft-rounded" align="center">
          <TabList>
            <Tab
              _selected={{ color: "white", bg: "blue.600" }}
              _hover={{ color: "gray.300" }}
              m="10px"
            >
              {t("posts")}
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "blue.600" }}
              _hover={{ color: "gray.300" }}
              m="10px"
              onClick={() => gridRef.current.positionItems()}
            >
              {t("images")}
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "blue.600" }}
              _hover={{ color: "gray.300" }}
              m="10px"
            >
              {t("friends")}
            </Tab>
          </TabList>
          <TabPanels>
            {/* Posts */}
            <TabPanel>
              <Post />
            </TabPanel>
            {/* Images */}
            <TabPanel px="0" py="4">
              <MagicGrid
                items={pictures.pictures.length}
                ref={gridRef}
                useTransform={false}
              >
                {pictures.pictures.map((picture) => (
                  <Box
                    w={{ base: "90%", md: "45%", lg: "29%" }}
                    key={picture.id}
                  >
                    <Image src={picture.picture} w="100%"></Image>
                  </Box>
                ))}
              </MagicGrid>
            </TabPanel>
            {/* Friends */}
            <TabPanel>
              <p>{t("friends")}</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  me: state.me,
  pictures: state.mePictures,
});

const mapDispatchToProps = (dispatch) => ({
  getMe: () => dispatch(getMe()),
  getMePictures: () => dispatch(getMePictures()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Me);
