import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { unStyledButton } from "../../styles/Buttons/unStyledButton";
const Notifications = ({ pendingSent, onClose, isOpen }) => {
  const { t } = useTranslation();
  return (
    <>
      <Drawer onClose={onClose} isOpen={isOpen} size={["xs"]}>
        <DrawerOverlay />
        <DrawerContent mt="70px">
          <DrawerCloseButton color="white" {...unStyledButton} />

          <DrawerHeader>{t("notifications")}</DrawerHeader>
          <DrawerBody></DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const mapStateToProps = (state) => ({
  pendingSent: state.meFriends.pendingSent,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
