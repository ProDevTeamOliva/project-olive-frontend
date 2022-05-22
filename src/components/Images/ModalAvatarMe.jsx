import {
  Avatar,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import FileUpload from "../FileUpload/FileUpload";
import { baseUrl } from "../../config/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { deleteMeAvatar, getMe, patchMeAvatar } from "../../actions/meActions";
import { useRef, useState } from "react";
import Alert from "../Alert/Alert";

function ModalAvatarMe() {
  const { t } = useTranslation();
  const languageValues = {
    updateProfilePicture: t("updateProfilePicture"),
    alertUpdateProfilePicture: t("alertUpdateProfilePicture"),
    delete: t("delete"),
    profilePicture: t("profilePicture"),
    deleteProfilePicture: t("deleteProfilePicture"),
    alertDeleteProfilePicture: t("alertDeleteProfilePicture"),
  };
  const dispatch = useDispatch();
  const avatar = useSelector((state) => state.me.me.avatar);

  const {
    isOpen: isOpenAvatar,
    onOpen: onOpenAvatar,
    onClose: onCloseAvatar,
  } = useDisclosure();

  const [isOpenUpdateAvatar, setIsOpenUpdateAvatar] = useState(false);
  const [isOpenDeleteAvatar, setIsOpenDeleteAvatar] = useState(false);
  const onCloseAlertUpdateAvatar = () => {
    setIsOpenUpdateAvatar(false);
    onCloseAvatar();
  };
  const onCloseAlertDeleteAvatar = () => {
    setIsOpenDeleteAvatar(false);
    onCloseAvatar();
  };
  const cancelRefAdd = useRef();
  const cancelRefDelete = useRef();

  const handleAvatarUpload = () => {
    onCloseAlertUpdateAvatar();
    const file = document.querySelector("#avatarUpload")["files"][0];
    const reader = new FileReader();

    reader.onloadend = () => {
      dispatch(patchMeAvatar(file.name, reader.result));
      dispatch(getMe());
    };

    reader.readAsDataURL(file);
  };

  const handleAvatarDelete = () => {
    onCloseAlertDeleteAvatar();
    dispatch(deleteMeAvatar());
  };

  return (
    <Flex flex="1" justifyContent="center" alignItems="center">
      <Button
        onClick={onOpenAvatar}
        variant="unstyled"
        boxSize={{ base: "12rem", md: "16rem" }}
        _focus={{ outline: "none" }}
      >
        <Avatar
          boxSize={{ base: "12rem", md: "16rem" }}
          src={avatar && baseUrl + avatar}
        />
      </Button>

      <Modal isOpen={isOpenAvatar} onClose={onCloseAvatar} isCentered>
        <ModalOverlay />
        <ModalContent mx="4">
          <ModalHeader>{languageValues.profilePicture}</ModalHeader>
          <ModalCloseButton mt="2" mr="1" _focus={{ outline: "none" }} />
          <ModalBody pb="4">
            <FileUpload
              id="avatarUpload"
              accept="image/*"
              w="75%"
              d="block"
              mx="auto"
              onChange={() => setIsOpenUpdateAvatar(true)}
            />
            {avatar.endsWith("/public/pictures/avatar_default.png") ? (
              <></>
            ) : (
              <Button
                w="75%"
                d="block"
                mx="auto"
                mt="4"
                bgColor="red.500"
                _focus={{ border: "none" }}
                _hover={{ bg: "red.600" }}
                onClick={() => setIsOpenDeleteAvatar(true)}
              >
                {languageValues.delete}
              </Button>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Alert
        isOpen={isOpenUpdateAvatar}
        onCloseAlert={onCloseAlertUpdateAvatar}
        fun={handleAvatarUpload}
        cancelRef={cancelRefAdd}
        header={languageValues.updateProfilePicture}
        body={languageValues.alertUpdateProfilePicture}
      />
      <Alert
        isOpen={isOpenDeleteAvatar}
        onCloseAlert={onCloseAlertDeleteAvatar}
        fun={handleAvatarDelete}
        cancelRef={cancelRefDelete}
        header={languageValues.deleteProfilePicture}
        body={languageValues.alertDeleteProfilePicture}
      />
    </Flex>
  );
}

export default ModalAvatarMe;
