import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { deleteMePictures } from "../../actions/meActions";
import { Box, CloseButton, Image } from "@chakra-ui/react";
import { baseUrl } from "../../config/baseUrl";
import AlertToConfirmation from "../Alert/AlertToConfirmation";

function Picture({ picture }) {
  const { t } = useTranslation();
  const languageValues = {
    deletePicture: t("deletePicture"),
    alertDeletePicture: t("alertDeletePicture"),
  };

  const location = useLocation();

  const dispatch = useDispatch();

  const cancelRefDelete = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const onCloseAlert = () => setIsOpen(false);

  const handlePictureDelete = () => {
    setIsOpen(false);
    dispatch(deleteMePictures(picture.id));
  };

  return (
    <Box>
      {location.pathname === "/me" && (
        <Box align="start">
          <CloseButton
            _focus={{ outline: "none" }}
            onClick={() => setIsOpen(true)}
          />
        </Box>
      )}

      <Image src={baseUrl + picture.picture} />

      {location.pathname === "/me" && (
        <AlertToConfirmation
          isOpen={isOpen}
          onCloseAlert={onCloseAlert}
          fun={() => handlePictureDelete(picture.id)}
          cancelRef={cancelRefDelete}
          header={languageValues.deletePicture}
          body={languageValues.alertDeletePicture}
        />
      )}
    </Box>
  );
}

export default Picture;
