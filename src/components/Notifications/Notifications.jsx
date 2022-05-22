import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Text,
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { unStyledButton } from "../../styles/Buttons/unStyledButton";
import Notification from "./Notification";
import {
  acceptFriendInvitation,
  unAcceptFriendInvitation,
} from "../../actions/meActions";

function Notifications({
  onClose,
  isOpen,
  pendingReceived,
  acceptFriendInvitation,
  unAcceptFriendInvitation,
}) {
  const { t } = useTranslation();
  const languageValues = {
    notifications: t("notifications"),
    noResults: t("noResults"),
  };

  return (
    <>
      <Drawer onClose={onClose} isOpen={isOpen} size={["xs"]}>
        <DrawerOverlay p="0px" />
        <DrawerContent mt="75px" bg="blue.700">
          <DrawerCloseButton color="white" {...unStyledButton} />

          <DrawerHeader px="20px">{languageValues.notifications}</DrawerHeader>
          <DrawerBody px="20px">
            {pendingReceived.length > 0 ? (
              pendingReceived.map(({ id, nameFirst, nameLast, avatar }) => (
                <Notification
                  key={id}
                  id={id}
                  nameFirst={nameFirst}
                  nameLast={nameLast}
                  avatar={avatar}
                  acceptFriendInvitation={acceptFriendInvitation}
                  unAcceptFriendInvitation={unAcceptFriendInvitation}
                />
              ))
            ) : (
              <Text textAlign="center" color="gray.400" fontSize="30px">
                {languageValues.noResults}
              </Text>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

const mapStateToProps = (state) => ({
  pendingReceived: state.meFriends.pendingReceived,
});

const mapDispatchToProps = (dispatch) => ({
  acceptFriendInvitation: (id) => dispatch(acceptFriendInvitation(id)),
  unAcceptFriendInvitation: (id) => dispatch(unAcceptFriendInvitation(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
