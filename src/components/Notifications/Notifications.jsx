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
const Notifications = ({
  onClose,
  isOpen,
  pendingReceived,
  acceptFriendInvitation,
  unAcceptFriendInvitation,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Drawer onClose={onClose} isOpen={isOpen} size={["xs"]}>
        <DrawerOverlay />
        <DrawerContent mt="70px">
          <DrawerCloseButton color="white" {...unStyledButton} />

          <DrawerHeader>{t("notifications")}</DrawerHeader>
          <DrawerBody>
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
                {t("noResults")}
              </Text>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const mapStateToProps = (state) => ({
  pendingReceived: state.meFriends.pendingReceived,
});

const mapDispatchToProps = (dispatch) => {
  return {
    acceptFriendInvitation: (id) => dispatch(acceptFriendInvitation(id)),
    unAcceptFriendInvitation: (id) => dispatch(unAcceptFriendInvitation(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
