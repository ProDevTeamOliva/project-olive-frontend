import { Button, Heading, Stack, Text, Flex, Avatar } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { universalButtonStyle } from "../../styles/Buttons/blueButton";
import { useDispatch, useSelector } from "react-redux";
import { addToFriends } from "../../actions/userActions";
import { baseUrl } from "../../config/baseUrl";
import { useCallback, useRef, useState } from "react";
import AlertToConfirmation from "../Alert/AlertToConfirmation";
import {
    acceptFriendInvitation,
    unAcceptFriendInvitation,
} from "../../actions/meActions";

const styleButton = {
    w: "80%",
    m: "auto",
    d: "block",
};
function InfoAboutUser({ id }) {
    const { t } = useTranslation();
    const languageValues = {
        addFriend: t("addFriend"),
        sendInvitation: t("sendInvitation"),
        alertSendInvitation: t("alertSendInvitation"),
        confirmInvitation: t("confirmInvitation"),
        delFriend: t("delFriend"),
        alertDelFriend: t("alertDelFriend"),
        removeFriend: t("removeFriend"),
        addFriends: t("addFriend"),
        alertAddFriend: t("alertAddFriend"),
        cancelInvitation: t("cancelInvitation"),
    };

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const meFriends = useSelector(state => state.meFriends);

    const [isOpenSendInvitation, setIsOpenSendInvitation] = useState(false);
    const onCloseAlertSendInvitation = () => setIsOpenSendInvitation(false);
    const cancelRefSendInvitation = useRef();

    const [isOpenDeleteFriend, setIsOpenDeleteFriend] = useState(false);
    const onCloseAlertDeleteFriend = () => setIsOpenDeleteFriend(false);
    const cancelRefDeleteFriend = useRef();

    const [isOpenAcceptInvitation, setIsOpenAcceptInvitation] = useState(false);
    const onCloseAlertAcceptInvitation = () => setIsOpenAcceptInvitation(false);
    const cancelRefAcceptInvitation = useRef();

    const checkExistUserInMeListOfFriends = () => {
        return (
            meFriends.friends.filter(friend => friend.id === id).length === 0
        );
    };

    const checkExistUserInPendingSent = () => {
        return (
            meFriends.pendingSent.filter(friend => friend.id === id).length ===
            1
        );
    };

    const checkExistUserInPendingReceived = () => {
        return (
            meFriends.pendingReceived.filter(friend => friend.id === id)
                .length === 1
        );
    };

    const addFriend = useCallback(
        id => {
            onCloseAlertSendInvitation();
            dispatch(addToFriends(id));
        },
        [dispatch]
    );

    const deleteFriend = useCallback(
        id => {
            onCloseAlertDeleteFriend();
            dispatch(unAcceptFriendInvitation(id));
        },
        [dispatch]
    );

    const ignoreInvitation = useCallback(
        id => dispatch(unAcceptFriendInvitation(id)),
        [dispatch]
    );

    const acceptInvitation = useCallback(
        id => {
            onCloseAlertAcceptInvitation();
            dispatch(acceptFriendInvitation(id));
        },
        [dispatch]
    );

    return (
        <Stack
            height={{ sm: "500px", md: "20rem" }}
            direction={{ base: "column", md: "row" }}
            p="4">
            <Flex flex="1" justifyContent="center" alignItems="center">
                <Avatar
                    boxSize={{ base: "12rem", md: "16rem" }}
                    src={baseUrl + user.avatar}
                />
            </Flex>
            <Stack
                flex="1"
                flexDirection="column"
                justifyContent="center"
                alignItems="center">
                <Heading fontSize="2xl" textAlign="center">
                    {user.nameFirst} {user.nameLast}
                </Heading>
                <Text fontWeight="600" color="gray.500" size="sm">
                    {user.login && `@${user.login}`}
                </Text>

                <Stack
                    w="100%"
                    mb="2rem"
                    direction="row"
                    padding="2"
                    justifyContent="space-between"
                    alignItems="center">
                    {checkExistUserInMeListOfFriends() &&
                        !checkExistUserInPendingSent() &&
                        !checkExistUserInPendingReceived() && (
                            <Button
                                {...universalButtonStyle(
                                    "blue.600",
                                    "blue.500"
                                )}
                                {...styleButton}
                                onClick={() => setIsOpenSendInvitation(true)}>
                                {languageValues.addFriend}
                            </Button>
                        )}
                    {checkExistUserInPendingSent() && (
                        <Button
                            {...universalButtonStyle("red.600", "red.500")}
                            {...styleButton}
                            onClick={() => ignoreInvitation(id)}>
                            {languageValues.cancelInvitation}
                        </Button>
                    )}
                    {checkExistUserInPendingReceived() && (
                        <Button
                            {...universalButtonStyle("green.600", "green.500")}
                            {...styleButton}
                            onClick={() => setIsOpenAcceptInvitation(true)}>
                            {languageValues.confirmInvitation}
                        </Button>
                    )}
                    {!checkExistUserInMeListOfFriends() && (
                        <Button
                            {...universalButtonStyle("red.600", "red.500")}
                            {...styleButton}
                            onClick={() => setIsOpenDeleteFriend(true)}>
                            {languageValues.removeFriend}
                        </Button>
                    )}
                </Stack>
            </Stack>
            <AlertToConfirmation
                isOpen={isOpenSendInvitation}
                onCloseAlert={onCloseAlertSendInvitation}
                fun={() => addFriend(id)}
                cancelRef={cancelRefSendInvitation}
                header={languageValues.sendInvitation}
                body={languageValues.alertSendInvitation}
            />
            <AlertToConfirmation
                isOpen={isOpenDeleteFriend}
                onCloseAlert={onCloseAlertDeleteFriend}
                fun={() => deleteFriend(id)}
                cancelRef={cancelRefDeleteFriend}
                header={languageValues.delFriend}
                body={languageValues.alertDelFriend}
            />
            <AlertToConfirmation
                isOpen={isOpenAcceptInvitation}
                onCloseAlert={onCloseAlertAcceptInvitation}
                fun={() => acceptInvitation(id)}
                cancelRef={cancelRefAcceptInvitation}
                header={languageValues.addFriends}
                body={languageValues.alertAddFriend}
            />
        </Stack>
    );
}

export default InfoAboutUser;
