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
    Box
  } from "@chakra-ui/react";
import CommentForm from "../CommentForm/CommentForm";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

  
  function AddCommentModal({idPost}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = useTranslation();
    const openModal = () => {
      onOpen();
    };
    return (
      <>
        <Box margin='2' padding='2' borderRadius="full" backgroundColor="gray.500" flexBasis='100%' onClick={openModal}>
            {t('writeCommentPlaceHolder')}
        </Box>
  
        <Modal onClose={onClose} isOpen={isOpen} size="xl" bg="gray.50">
          <ModalOverlay />
          <ModalContent mr="3" ml="3" bg="gray.500">
            <ModalHeader>
              <Text
                mb="3px"
                color="white"
                fontWeight="bold"
                fontSize="110%"
              >
                {t("addComment")}
              </Text>
              <Divider borderColor="gray.900" border="1px"></Divider>
            </ModalHeader>
            <ModalCloseButton
              color="gray.900"
              _focus={{ borderColor: "gray.900" }}
              fontSize="120%"
            />
  
            <ModalBody>
              <CommentForm onClose={onClose}/>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }
  
  const mapStateToProps = () => ({});
  
  const mapDispatchToProps = (dispatch) => {
    return {
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddCommentModal);
  