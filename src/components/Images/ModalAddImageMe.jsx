import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import FileUpload from "../FileUpload/FileUpload";
import toBase64 from "../../operations/base64";
import PublicPrivate from "../FileUpload/PublicPrivate";
import { useState } from "react";
import { postMePictures } from "../../actions/meActions";
import { useDispatch } from "react-redux";

function ModalAddImageMe() {
  const { t } = useTranslation();
  const languageValues = {
    addImages: t("addImages"),
  };

  const dispatch = useDispatch();

  const [publicPrivate, setPublicPrivate] = useState(false);

  const {
    isOpen: isOpenPictures,
    onOpen: onOpenPictures,
    onClose: onClosePictures,
  } = useDisclosure();

  const handlePicturesUpload = async () => {
    const files = document.querySelector("#picturesUpload")["files"];
    let pictures = [];

    for (const file of files) {
      const file64 = await toBase64(file);
      pictures.push({
        filename: file.name,
        picture: file64,
        private: publicPrivate,
      });
    }
    dispatch(postMePictures(pictures));
    onClosePictures();
  };

  return (
    <>
      <Button onClick={onOpenPictures} mb="4">
        {languageValues.addImages}
      </Button>

      <Modal isOpen={isOpenPictures} onClose={onClosePictures} isCentered>
        <ModalOverlay />
        <ModalContent mx="4">
          <ModalHeader>{languageValues.addImages}</ModalHeader>
          <ModalCloseButton mt="2" mr="1" _focus={{ outline: "none" }} />
          <ModalBody pb="4">
            <Box mb="4" textAlign="center">
              <PublicPrivate setValue={setPublicPrivate} />
            </Box>
            <FileUpload
              id="picturesUpload"
              accept="image/*"
              multiple
              w="75%"
              d="block"
              mx="auto"
              onChange={handlePicturesUpload}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalAddImageMe;
