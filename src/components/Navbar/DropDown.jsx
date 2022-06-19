import { Box, Avatar, Text, Menu, MenuItem } from "@chakra-ui/react";
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

    const me = useSelector(state => state.me.me);

    const logOut = () => {
        localStorage.removeItem("token");
        dispatch(restartRegisterMessage());
        return dispatch(logout());
    };

    return (
        <Box pos="relative" d="inline-block" role="group">
            <Avatar
                src={Account}
                boxSize="50px"
                m="12.5px"
                cursor="pointer"
                bg="transparent"
            />
            <Box
                d="none"
                pos="absolute"
                bg="gray.800"
                w="160px"
                right="0"
                borderRadius="0 0 0 12px"
                _groupHover={{
                    display: "grid",
                    gridTemplateRows: "20px 120px 40px",
                    placeItems: "center",
                }}>
                <Menu>
                    <Box>
                        <Language changeLanguage={changeLanguage} />
                    </Box>
                    <Box boxSize="100px" mt="30px">
                        <AvatarUser link="/me" avatar={me.avatar} id={me.id} />
                    </Box>
                    <Box w="160px" px="2px">
                        <Text
                            textAlign="center"
                            color="gray.200"
                            _focus={{ color: "mediumslateblue" }}
                            _hover={{
                                color: "mediumslateblue",
                            }}
                            _active={{
                                color: "mediumslateblue",
                            }}>
                            <Link to="/me">
                                {me.nameFirst} {me.nameLast}
                            </Link>
                        </Text>
                    </Box>

                    <MenuItem
                        onClick={logOut}
                        mt="8px"
                        p="8px 16px"
                        borderTop="1px"
                        borderColor="gray"
                        borderRadius="0 0 0 12px"
                        _hover={{
                            bgColor: "mediumslateblue",
                        }}>
                        {languageValues.logout}
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
}

export default DropDown;
