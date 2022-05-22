import { Box, HStack, Text, Flex, Avatar, Button } from "@chakra-ui/react";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import Alert from "../Alert/Alert";

function Notification({
  id,
  nameFirst,
  nameLast,
  avatar,
  acceptFriendInvitation,
  unAcceptFriendInvitation,
}) {
  const { t } = useTranslation();
  const languageValues = {
    addFriends: t("addFriend"),
    alertAddFriend: t("alertAddFriend"),
  };

  const [isOpen, setIsOpen] = useState(false);
  const onCloseAlert = () => setIsOpen(false);
  const cancelRef = useRef();

  const buttonStyle = (color1, color2) => {
    return {
      variant: "unstyled",
      fontSize: "18px",
      color: color1,
      _focus: { color: color2 },
      _hover: {
        color: color2,
      },
      _active: {
        color: color2,
      },
    };
  };

  const accept = () => {
    setIsOpen(true);
  };

  const ignore = () => {
    unAcceptFriendInvitation(id);
  };

  const acceptFriend = () => {
    onCloseAlert();
    return acceptFriendInvitation(id);
  };

  return (
    <Box
      bg="gray.500"
      w="280px"
      h="130px"
      shadow="md"
      borderRadius="10px"
      mb="20px"
    >
      <HStack align="center" h="100px">
        <Flex w="100%" align="center">
          <Avatar
            boxSize="50px"
            ml="5"
            src={avatar}
            alt={avatar}
            bg="gray.700"
          />
          <Text px="20px" w="100%">
            {t("addToFriends")} {nameFirst} {nameLast}
          </Text>
        </Flex>
      </HStack>
      <HStack mt="-12px" justify="right" mr="7px">
        <Button {...buttonStyle("gray.100", "white")} onClick={() => accept()}>
          <BsCheckLg />
        </Button>

        <Button {...buttonStyle("gray.800", "black")} onClick={() => ignore()}>
          <BsXLg />
        </Button>
      </HStack>
      <Alert
        isOpen={isOpen}
        onCloseAlert={onCloseAlert}
        fun={acceptFriend}
        cancelRef={cancelRef}
        header={languageValues.addFriends}
        body={languageValues.alertAddFriend}
      />
    </Box>
  );
}

export default Notification;
