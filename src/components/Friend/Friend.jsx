import { Text, Flex, Avatar, WrapItem, CloseButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../config/baseUrl";
import { unStyledButton } from "../../styles/Buttons/unStyledButton";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import Alert from "../Alert/Alert";

const Friend = ({
  id,
  nameFirst,
  nameLast,
  avatar,
  unAcceptFriendInvitation,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onCloseAlert = () => setIsOpen(false);
  const cancelRef = useRef();

  const ignore = () => {
    onCloseAlert();
    return unAcceptFriendInvitation(id);
  };
  const { t } = useTranslation();

  return (
    <WrapItem key={id}>
      <Flex direction="column" align="center" justify="center">
        <Flex justify="right" width="100%">
          <CloseButton
            {...unStyledButton}
            pl="40px"
            onClick={() => setIsOpen(true)}
          ></CloseButton>
        </Flex>
        <Link to={`/user/${id}`}>
          <Avatar
            boxSize={["50px", "60px", "80px"]}
            src={baseUrl + avatar}
          ></Avatar>
        </Link>

        <Link to={`/user/${id}`}>
          <Text textAlign="center" mt="1">
            {nameFirst} {nameLast}
          </Text>
        </Link>
      </Flex>
      <Alert
        isOpen={isOpen}
        onCloseAlert={onCloseAlert}
        fun={ignore}
        cancelRef={cancelRef}
        header={t("delFriend")}
        body={t("alertDelFriend")}
      />
    </WrapItem>
  );
};

export default Friend;
