import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
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
import { getMe } from "../../actions/meActions";
import { useEffect } from "react";

const Me = ({ changeLanguage }) => {
  const { t } = useTranslation();

  useEffect(() => {
    getMe();
  }, []);

  return (
    <Grid
      h="100vh"
      mt="75px"
      justifyContent="center"
      templateColumns="minmax(200px, 800px)"
    >
      <Navbar changeLanguage={changeLanguage} />
      <Box m="25px">
        <Stack
          height={{ sm: "500px", md: "20rem" }}
          direction={{ base: "column", md: "row" }}
          p="4"
        >
          <Flex flex="1" justifyContent="center" alignItems="center">
            <Avatar
              h={{ base: "12rem", md: "16rem" }}
              w={{ sm: "12rem", md: "16rem" }}
              src="https://bit.ly/ryan-florence"
            />
          </Flex>
          <Stack
            flex="1"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Heading fontSize="2xl">Ryan Florence</Heading>
            <Text fontWeight="600" color="gray.500" size="sm">
              @ryan_florence
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
        <Tabs variant="soft-rounded" align="center" p="4">
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
            <TabPanel>
              <p>{t("images")}</p>
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
});

const mapDispatchToProps = (dispatch) => ({
  getMe: () => dispatch(getMe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Me);
