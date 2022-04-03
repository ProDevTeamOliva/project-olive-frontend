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
import { useSelector } from "react-redux";

function ModalAddAvatarMe({ getMe, patchMeAvatar }) {
  const { t } = useTranslation();
  const languageValues = {
    addProfilePicture: t("addProfilePicture"),
  };

  const avatar = useSelector((state) => state.me.me.avatar);

  const {
    isOpen: isOpenAvatar,
    onOpen: onOpenAvatar,
    onClose: onCloseAvatar,
  } = useDisclosure();

  const handleAvatarUpload = () => {
    const file = document.querySelector("#avatarUpload")["files"][0];
    const reader = new FileReader();

    reader.onloadend = () => {
      patchMeAvatar(file.name, reader.result);
      getMe();
      onCloseAvatar();
    };

    reader.readAsDataURL(file);
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
          src={baseUrl + avatar}
        />
      </Button>

      <Modal isOpen={isOpenAvatar} onClose={onCloseAvatar} isCentered>
        <ModalOverlay />
        <ModalContent mx="4">
          <ModalHeader>{languageValues.addProfilePicture}</ModalHeader>
          <ModalCloseButton mt="2" mr="1" _focus={{ outline: "none" }} />
          <ModalBody pb="4">
            <FileUpload
              id="avatarUpload"
              accept="image/*"
              w="75%"
              d="block"
              mx="auto"
              onChange={handleAvatarUpload}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default ModalAddAvatarMe;