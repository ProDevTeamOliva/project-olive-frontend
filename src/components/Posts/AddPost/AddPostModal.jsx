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
  Box,
  Flex,
} from "@chakra-ui/react";
import PostForm from "../../PostForm/PostForm";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

function AddPostModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const openModal = () => {
    onOpen();
  };
  return (
    <>
      <Box
        height={["10", "45px"]}
        margin="4"
        padding="4"
        borderRadius="full"
        backgroundColor="gray.500"
        flexBasis="100%"
        onClick={openModal}
      >
        <Flex justify="center" align="center" h="100%">
          <Box fontSize={["xl"]} textAlign="center" justifyContent="center">
            {t("writePost")}
          </Box>
        </Flex>
      </Box>

      <Modal onClose={onClose} isOpen={isOpen} size="xl" bg="gray.50">
        <ModalOverlay />
        <ModalContent mr="3" ml="3" bg="gray.500">
          <ModalHeader>
            <Text mb="3px" color="white" fontWeight="bold" fontSize="110%">
              {t("addPost")}
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
    </>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AddPostModal);
