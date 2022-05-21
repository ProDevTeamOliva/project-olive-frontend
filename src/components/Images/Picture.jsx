import { Box, CloseButton, Image } from "@chakra-ui/react";
import { baseUrl } from "../../config/baseUrl";
import Alert from "../Alert/Alert";
import { useRef, useState } from "react";
import { deleteMePictures } from "../../actions/meActions";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

function Picture({ picture }) {
  const { t } = useTranslation();
  const languageValues = {
    deletePicture: t("deletePicture"),
    alertDeletePicture: t("alertDeletePicture"),
  };

  const dispatch = useDispatch();

  const cancelRefDelete = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const onCloseAlert = () => setIsOpen(false);

  const handlePictureDelete = () => {
    setIsOpen(false);
    dispatch(deleteMePictures(picture.id));
  };

  return (
    <Box w={{ base: "90%", md: "45%", lg: "29%" }}>
      <Box align="end">
        <CloseButton
          _focus={{ outline: "none" }}
          onClick={() => setIsOpen(true)}
        />
      </Box>
      <Image src={baseUrl + picture.picture} w="100%"></Image>
      <Alert
        isOpen={isOpen}
        onCloseAlert={onCloseAlert}
        fun={() => handlePictureDelete(picture.id)}
        cancelRef={cancelRefDelete}
        header={languageValues.deletePicture}
        body={languageValues.alertDeletePicture}
      />
    </Box>
  );
}

export default Picture;
