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
import AlertToConfirmation from "../Alert/AlertToConfirmation";
import { validatorOfFiles } from "../../validators/validatorOfFiles";
import AlertToError from "../Alert/AlertToError";

function ModalAvatarMe() {
  const { t } = useTranslation();
  const languageValues = {
    updateProfilePicture: t("updateProfilePicture"),
    alertUpdateProfilePicture: t("alertUpdateProfilePicture"),
    delete: t("delete"),
    profilePicture: t("profilePicture"),
    deleteProfilePicture: t("deleteProfilePicture"),
    alertDeleteProfilePicture: t("alertDeleteProfilePicture"),
    formatFile: t("formatFile"),
    memoryPerFile: t("memoryPerFile"),
    memoryAllFiles: t("memoryAllFiles"),
    incorrectData: t("incorrectData"),
  };
  const dispatch = useDispatch();
  const avatar = useSelector((state) => state.me.me.avatar);

  const {
    isOpen: isOpenAvatar,
    onOpen: onOpenAvatar,
    onClose: onCloseAvatar,
  } = useDisclosure();

  const [isOpenUpdateAlert, setIsOpenUpdateAlert] = useState(false);
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);
  const [isOpenErrorAlert, setIsOpenErrorAlert] = useState(false);

  const onCloseAlertUpdateAvatar = () => {
    setIsOpenUpdateAlert(false);
    onCloseAvatar();
  };
  const onCloseAlertDeleteAvatar = () => {
    setIsOpenDeleteAlert(false);
    onCloseAvatar();
  };
  const onCloseAlertError = () => {
    setIsOpenErrorAlert(false);
    onCloseAvatar();
  };
  const cancelRefAdd = useRef();
  const cancelRefDelete = useRef();
  const cancelRefError = useRef();

  const [validationResult, setValidationResult] = useState(undefined);
  const validateFiles = validatorOfFiles(
    languageValues.formatFile,
    languageValues.memoryPerFile,
    languageValues.memoryAllFiles
  );

  const handleAvatarUpload = () => {
    onCloseAlertUpdateAvatar();
    const files = document.querySelector("#avatarUpload")["files"];
    const file = files[0];
    const resultFromValidate = validateFiles(
      Array.from(files).map((file) => ({ file: file }))
    );
    setValidationResult(resultFromValidate);

    if (resultFromValidate === undefined) {
      const reader = new FileReader();

      reader.onloadend = () => {
        dispatch(patchMeAvatar(file.name, reader.result));
        dispatch(getMe());
      };
      reader.readAsDataURL(file);
    } else {
      setIsOpenErrorAlert(true);
    }
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
              onChange={() => setIsOpenUpdateAlert(true)}
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
                onClick={() => setIsOpenDeleteAlert(true)}
              >
                {languageValues.delete}
              </Button>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <AlertToConfirmation
        isOpen={isOpenUpdateAlert}
        onCloseAlert={onCloseAlertUpdateAvatar}
        fun={handleAvatarUpload}
        cancelRef={cancelRefAdd}
        header={languageValues.updateProfilePicture}
        body={languageValues.alertUpdateProfilePicture}
      />
      <AlertToConfirmation
        isOpen={isOpenDeleteAlert}
        onCloseAlert={onCloseAlertDeleteAvatar}
        fun={handleAvatarDelete}
        cancelRef={cancelRefDelete}
        header={languageValues.deleteProfilePicture}
        body={languageValues.alertDeleteProfilePicture}
      />
      <AlertToError
        isOpen={isOpenErrorAlert}
        onCloseAlert={onCloseAlertError}
        cancelRef={cancelRefError}
        title={languageValues.incorrectData}
        description={validationResult}
      />
    </Flex>
  );
}

export default ModalAvatarMe;
