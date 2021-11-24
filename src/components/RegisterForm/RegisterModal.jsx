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
import { staticPl } from "../../constants/Forms";
import RegisterForm from "./RegisterForm";
import { purpleButtonStyle } from "../../styles/Buttons/purpleButton";

function RegisterModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} {...purpleButtonStyle}>
        {staticPl.register}
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
              {staticPl.createAccount}
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

export default RegisterModal;
