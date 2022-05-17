import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Divider,
  Text,
  Box,
} from "@chakra-ui/react";
import CommentForm from "./CommentForm";
import { useTranslation } from "react-i18next";
import { memo } from "react";

import Comments from "../Comments/Comments";

function AddCommentModal({ idPost, isOpen, onOpen, onClose }) {
  const { t } = useTranslation();
  const languageValues = {
    writeCommentPlaceHolder: t("writeCommentPlaceHolder"),
    addComment: t("addComment"),
  };

  return (
    <>
      <Box
        margin="2"
        padding="2"
        borderRadius="full"
        backgroundColor="gray.500"
        flexBasis="100%"
        onClick={onOpen}
        pl="20px"
      >
        {languageValues.writeCommentPlaceHolder}
      </Box>
      <Modal
        onClose={onClose}
        scrollBehavior="inside"
        isOpen={isOpen}
        size="xl"
        bg="gray.50"
      >
        <ModalOverlay />
        <ModalContent mr="3" ml="3" bg="gray.50">
          <ModalHeader pb="0">
            <Text mb="3px" color="gray.800" fontWeight="bold" fontSize="110%">
              {languageValues.addComment}
            </Text>
            <Divider borderColor="gray.900" border="1px"></Divider>
          </ModalHeader>
          <ModalCloseButton
            color="gray.900"
            _focus={{ borderColor: "gray.900" }}
            fontSize="120%"
          />

          <ModalBody color="black" px="35px">
            <Comments idPost={idPost} />
          </ModalBody>
          <ModalFooter w="100%">
            <CommentForm idPost={idPost} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default memo(AddCommentModal);
