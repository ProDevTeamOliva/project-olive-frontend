import { Button, Heading, Stack, Text, Flex, Avatar } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { blueButtonStyle } from "../../styles/Buttons/blueButton";
import { useDispatch, useSelector } from "react-redux";
import { addToFriends } from "../../actions/userActions";
import { baseUrl } from "../../config/baseUrl";
import { useRef, useState } from "react";
import AlertToConfirmation from "../Alert/AlertToConfirmation";

const textStyle = {
  textAlign: "center",
  color: "blue.400",
  fontSize: "25px",
  w: "100%",
};

function InfoAboutUser({ id }) {
  const { t } = useTranslation();
  const languageValues = {
    addFriend: t("addFriend"),
    sentInvitation: t("sentInvitation"),
    isFriend: t("isFriend"),
    sendInvitation: t("sendInvitation"),
    alertSendInvitation: t("alertSendInvitation"),
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const meFriends = useSelector((state) => state.meFriends);

  const [isOpen, setIsOpen] = useState(false);
  const onCloseAlert = () => setIsOpen(false);
  const cancelRef = useRef();

  const checkExistUserInMeListOfFriends = () => {
    return meFriends.friends.filter((friend) => friend.id === id).length === 0;
  };

  const checkExistUserInPendingSent = () => {
    return (
      meFriends.pendingSent.filter((friend) => friend.id === id).length === 1
    );
  };

  const addFriend = () => {
    onCloseAlert();
    return dispatch(addToFriends(id));
  };

  return (
    <Stack
      height={{ sm: "500px", md: "20rem" }}
      direction={{ base: "column", md: "row" }}
      p="4"
    >
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
        alignItems="center"
      >
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
          alignItems="center"
        >
          {checkExistUserInMeListOfFriends() && !checkExistUserInPendingSent() && (
            <Button
              {...blueButtonStyle}
              w="80%"
              m="auto"
              d="block"
              onClick={() => setIsOpen(true)}
            >
              {languageValues.addFriend}
            </Button>
          )}
          {checkExistUserInPendingSent() && (
            <Text {...textStyle}>{languageValues.sentInvitation}</Text>
          )}
          {!checkExistUserInMeListOfFriends() && (
            <Text {...textStyle}>{languageValues.isFriend}</Text>
          )}
        </Stack>
      </Stack>
      <AlertToConfirmation
        isOpen={isOpen}
        onCloseAlert={onCloseAlert}
        fun={addFriend}
        cancelRef={cancelRef}
        header={languageValues.sendInvitation}
        body={languageValues.alertSendInvitation}
      />
    </Stack>
  );
}

export default InfoAboutUser;
