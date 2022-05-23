import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Divider,
  Text,
} from "@chakra-ui/react";
import RegisterForm from "./RegisterForm";
import { purpleButtonStyle } from "../../styles/Buttons/purpleButton";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  restartLogInMessage,
  restartRegisterMessage,
} from "../../actions/authActions";
import { memo } from "react";

function RegisterModal() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const languageValues = {
    register: t("register"),
    createAccount: t("createAccount"),
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const openModal = () => {
    onOpen();
    dispatch(restartLogInMessage());
    dispatch(restartRegisterMessage());
  };

  return (
    <>
      <Button onClick={openModal} {...purpleButtonStyle}>
        {languageValues.register}
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} size="xl" bg="gray.50">
        <ModalOverlay />
        <ModalContent mr="3" ml="3" bg="gray.50">
          <ModalHeader>
            <Text
              mb="3px"
              color="mediumslateblue"
              fontWeight="bold"
              fontSize="110%"
            >
              {languageValues.createAccount}
            </Text>
            <Divider borderColor="gray.900" border="1px"></Divider>
          </ModalHeader>
          <ModalCloseButton
            color="gray.900"
            _focus={{ borderColor: "gray.900" }}
            fontSize="120%"
          />
          <ModalBody>
            <RegisterForm></RegisterForm>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default memo(RegisterModal);
