import { Box, Grid, Image, Button, Text } from "@chakra-ui/react";
import LogoUp from "../Logo/LogoUp";
import SearchModal from "../Search/SearchModal";
import Account from "../../img/account_white.png";
import { connect } from "react-redux";
import { logout, restartRegisterMessage } from "../../actions/authActions";
import { useTranslation } from "react-i18next";
import Language from "../Language/Language";
import { getMe, getMeFriends } from "../../actions/meActions";
import { Link } from "react-router-dom";
import { unStyledButton } from "../../styles/Buttons/unStyledButton";
import { useEffect } from "react";
import Bell from "../Notifications/Bell";
import { getPosts } from "../../actions/postActions";
import Search from "../SearchBar/Search";
const Navbar = ({
  logout,
  restartRegisterMessage,
  changeLanguage,
  getMe,
  getMeFriends,
  getPosts,
  nameFirst,
  nameLast,
}) => {
  const { t } = useTranslation();
  const logOut = () => {
    localStorage.removeItem("token");
    restartRegisterMessage();
    return logout();
  };
  useEffect(() => {
    getMe();
  }, [getMe, getMeFriends]);

  useEffect(() => {
    getPosts();
    const intervalId = setInterval(() => {
      getPosts();
      getMeFriends();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [getPosts, getMeFriends]);

  return (
    <Box
      pos="fixed"
      top="0"
      left="0"
      zIndex={999}
      h="75px"
      w="100%"
      bgColor="rgba(0, 0, 0, 0.25)"
      backdropFilter="blur(50px)"
      className="blur"
    >
      <Grid templateColumns="150px 1fr 75px 75px" placeItems="center" templateRows="1fr 1fr">
        <Box pos="relative" gridRow='1'>
        <Button variant="unstyled" {...unStyledButton} w="100%" h="100%" ml="2">
          <Link to="/main">
            <LogoUp fontSize="14" scaleWidth={9.2} />
          </Link>
        </Button>
        </Box>
        {/* <SearchModal></SearchModal> */}
        <Box pos="relative" gridRow='1/3' alignContent='start'>
          <Search/>
        </Box>
        <Box pos="relative" d="inline-block" gridColumn="4/5" role="group" gridRow='1'>
          <Image
            src={Account}
            alt="Account"
            p="12.5px"
            cursor="pointer"
            ml={["0", "-5px", "-15px"]}
          />
          <Box
            d="none"
            pos="absolute"
            bgColor="#283141"
            minW="150px"
            right="0"
            _groupHover={{
              display: "grid",
              gridAutoRows: "50px",
              placeItems: "center",
              padding: "0 12.5px 7.5px 12.5px",
            }}
          >
            <Box mt="-30px">
              <Language changeLanguage={changeLanguage} />
            </Box>
            <Text
              textAlign="center"
              mt="-30px"
              color="blue.200"
              _focus={{ color: "blue.100" }}
              _hover={{
                color: "blue.100",
              }}
              _active={{
                color: "blue.100",
              }}
            >
              <Link to="/me">
                {nameFirst} {nameLast}
              </Link>
            </Text>
            <Button w="125px">
              <Link to="/me">{t("myAccount")}</Link>
            </Button>
            <Button w="125px" onClick={logOut}>
              {t("logout")}
            </Button>
          </Box>
        </Box>
        <Bell />
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  nameFirst: state.me.me.nameFirst,
  nameLast: state.me.me.nameLast,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    restartRegisterMessage: () => dispatch(restartRegisterMessage()),
    getMe: () => dispatch(getMe()),
    getMeFriends: () => dispatch(getMeFriends()),
    getPosts: () => dispatch(getPosts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
