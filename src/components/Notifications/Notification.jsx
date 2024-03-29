import { useTranslation } from "react-i18next";
import { useState, useRef, useCallback } from "react";
import { Box, HStack, Text, Flex, Avatar, Button } from "@chakra-ui/react";
import { baseUrl } from "../../config/baseUrl";
import { BsCheckLg, BsXLg } from "react-icons/bs";
// https://github.com/twbs/icons
import AlertToConfirmation from "../Alert/AlertToConfirmation";
import {
    acceptFriendInvitation,
    unAcceptFriendInvitation,
} from "../../actions/meActions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { notificationButton } from "../../styles/Buttons/notificationButton";
function Notification({ id, nameFirst, nameLast, avatar }) {
    const { t } = useTranslation();
    const languageValues = {
        addFriends: t("addFriend"),
        alertAddFriend: t("alertAddFriend"),
    };

    const [isOpen, setIsOpen] = useState(false);
    const onCloseAlert = () => setIsOpen(false);
    const cancelRef = useRef();

    const dispatch = useDispatch();

    const accept = () => {
        setIsOpen(true);
    };

    const acceptInvitation = useCallback(
        id => {
            onCloseAlert();
            dispatch(acceptFriendInvitation(id));
        },
        [dispatch]
    );
    const unAcceptInvitation = useCallback(
        id => dispatch(unAcceptFriendInvitation(id)),
        [dispatch]
    );

    return (
        <Box
            bg="gray.500"
            w="280px"
            h="130px"
            shadow="md"
            borderRadius="10px"
            mb="20px">
            <HStack align="center" h="100px">
                <Flex w="100%" align="center">
                    <Link to={`/user/${id}`}>
                        <Avatar
                            boxSize="50px"
                            ml="5"
                            src={avatar && baseUrl + avatar}
                            alt={avatar}
                            bg="transparent"
                        />
                    </Link>

                    <Text px="20px" w="100%">
                        {t("addToFriends")} {nameFirst} {nameLast}
                    </Text>
                </Flex>
            </HStack>
            <HStack mt="-12px" justify="right" mr="7px">
                <Button
                    {...notificationButton("gray.100", "white")}
                    onClick={() => accept()}>
                    <BsCheckLg />
                </Button>

                <Button
                    {...notificationButton("gray.800", "black")}
                    onClick={() => unAcceptInvitation(id)}>
                    <BsXLg />
                </Button>
            </HStack>
            <AlertToConfirmation
                isOpen={isOpen}
                onCloseAlert={onCloseAlert}
                fun={() => acceptInvitation(id)}
                cancelRef={cancelRef}
                header={languageValues.addFriends}
                body={languageValues.alertAddFriend}
            />
        </Box>
    );
}

export default Notification;
