import { Box, Image, Button, Text } from "@chakra-ui/react";
import Account from "../../img/account_white.png";
import { useDispatch, useSelector } from "react-redux";
import { logout, restartRegisterMessage } from "../../actions/authActions";
import { useTranslation } from "react-i18next";
import Language from "../Language/Language";
import { getMe } from "../../actions/meActions";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function DropDown({ changeLanguage }) {
  const { t } = useTranslation();
  const languageValues = {
    logout: t("logout"),
    myAccount: t("myAccount"),
  };

  const dispatch = useDispatch();
  const me = useSelector((state) => state.me.me);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const logOut = () => {
    localStorage.removeItem("token");
    dispatch(restartRegisterMessage());
    return dispatch(logout());
  };

  return (
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
            {me.nameFirst} {me.nameLast}
          </Link>
        </Text>
        <Button w="125px">
          <Link to="/me">{languageValues.myAccount}</Link>
        </Button>
        <Button w="125px" onClick={logOut}>
          {languageValues.logout}
        </Button>
      </Box>
    </Box>
  );
}

export default DropDown;
