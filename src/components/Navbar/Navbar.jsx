import { Box, Grid, Image, Button } from "@chakra-ui/react";
import LogoUp from "../Logo/LogoUp";
import SearchModal from "../Search/SearchModal";
import Account from "../../img/account_white.png";
import { connect } from "react-redux";
import { logout, restartRegisterMessage } from "../../actions/authActions";
import { useTranslation } from "react-i18next";
import Language from "../Language/Language";
import { getMe, getMeFriends } from "../../actions/meActions";
import { Link } from "react-router-dom";

import { useEffect } from "react";
import Bell from "../Notifications/Bell";
const Navbar = ({
  logout,
  restartRegisterMessage,
  changeLanguage,
  getMe,
  getMeFriends,
}) => {
  const { t } = useTranslation();
  const logOut = () => {
    localStorage.removeItem("token");
    restartRegisterMessage();
    return logout();
  };
  useEffect(() => {
    getMe();
    getMeFriends();
  }, [getMe, getMeFriends]);

  return (
    <Box
      pos="fixed"
      top="0"
      left="0"
      zIndex={999}
      h="75px"
      w="100%"
      bgColor="rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(50px)"
      className="blur"
    >
      <Grid templateColumns="150px 1fr 75px 75px" placeItems="center">
        <LogoUp fontSize="14" scaleWidth={9.2} />
        <SearchModal></SearchModal>
        <Box pos="relative" d="inline-block" gridColumn="4/5" role="group">
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
            <Language changeLanguage={changeLanguage} />
            <Button w="125px">
              <Link to="/me">{t("myAccount")}</Link>
            </Button>
            <Button w="125px">{t("friends")}</Button>
            <Button w="125px">{t("groups")}</Button>
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

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    restartRegisterMessage: () => dispatch(restartRegisterMessage()),
    getMe: () => dispatch(getMe()),
    getMeFriends: () => dispatch(getMeFriends()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
