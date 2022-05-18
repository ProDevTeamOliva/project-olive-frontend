import {
  Box,
  Image,
  Text,
  Menu,
  MenuDivider,
  MenuItem,
} from "@chakra-ui/react";
import Account from "../../img/account_white.png";
import { useDispatch, useSelector } from "react-redux";
import { logout, restartRegisterMessage } from "../../actions/authActions";
import { useTranslation } from "react-i18next";
import Language from "../Language/Language";
import { getMe } from "../../actions/meActions";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AvatarUser from "../User/AvatarUser";

function DropDown({ changeLanguage }) {
  const { t } = useTranslation();
  const languageValues = {
    logout: t("logout"),
    myAccount: t("myAccount"),
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const me = useSelector((state) => state.me.me);

  const logOut = () => {
    localStorage.removeItem("token");
    dispatch(restartRegisterMessage());
    return dispatch(logout());
  };

  return (
    <Box pos="relative" d="inline-block" gridColumn="5/6" role="group">
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
        bgColor="gray.700"
        w="160px"
        right="0"
        borderRadius="0 0 0 12px"
        _groupHover={{
          display: "grid",
          gridTemplateRows: "20px 120px 50px  20px",
          placeItems: "center",
          padding: "0 0px 10px 0px",
          boxShadow: "1px 1px 2px 1px white",
        }}
      >
        <Menu>
          <Box>
            <Language changeLanguage={changeLanguage} />
          </Box>
          <Box>
            <AvatarUser link="/me" avatar={me.avatar} id={me.id} />
          </Box>
          <Box w="160px" px="2px">
            <Text
              textAlign="center"
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
          </Box>
          <MenuDivider width="100%" borderColor="gray.200" />

          <MenuItem
            onClick={logOut}
            _hover={{
              bgColor: "mediumslateblue",
              boxShadow: "1px 1px 1px 1px mediumslateblue",
            }}
          >
            {languageValues.logout}
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

export default DropDown;
