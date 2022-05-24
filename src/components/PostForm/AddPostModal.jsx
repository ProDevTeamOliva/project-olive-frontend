import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Divider,
  Text,
  Button,
  Icon,
  Box,
} from "@chakra-ui/react";
import PostForm from "./PostForm";
import { useTranslation } from "react-i18next";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";

function AddPostModal() {
  const { t } = useTranslation();
  const languageValues = {
    writePost: t("writePost"),
    addPost: t("addPost"),
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const openModal = () => {
    onOpen();
  };

  const [color, setColor] = useState("black");

  return (
    <Box>
      <Button
        bg="white"
        color="black"
        onClick={openModal}
        _focus={{ outline: "none", bg: "white" }}
        _hover={{ bg: "gray.50", fontWeight: "700" }}
        border="none"
        p="15px"
        onMouseOver={() => setColor("mediumslateblue")}
        onMouseLeave={() => setColor("black")}
      >
        <Icon as={AddIcon} w="20px" h="20px" mr="7px" color={color} />
        {languageValues.addPost}
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} size="xl" bg="gray.50">
        <ModalOverlay />
        <ModalContent bg="gray.50">
          <ModalHeader pb="0">
            <Text mb="3px" color="gray.800" fontWeight="bold" fontSize="110%">
              {languageValues.addPost}
            </Text>
            <Divider borderColor="gray.900" border="1px"></Divider>
          </ModalHeader>
          <ModalCloseButton
            color="gray.900"
            _focus={{ borderColor: "gray.900" }}
            fontSize="120%"
          />
          <ModalBody>
            <PostForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default AddPostModal;
