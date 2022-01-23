import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogHeader,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

function Alert({ isOpen, onCloseAlert, fun, cancelRef, header, body }) {
  const { t } = useTranslation();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onCloseAlert}
    >
      <AlertDialogOverlay>
        <AlertDialogContent ml="10px" mr="10px">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {header}
          </AlertDialogHeader>

          <AlertDialogBody>{body}</AlertDialogBody>

          <AlertDialogFooter>
            <Button
              _focus={{ border: "none" }}
              ref={cancelRef}
              onClick={onCloseAlert}
            >
              {t("cancel")}
            </Button>
            <Button
              _focus={{ border: "none" }}
              colorScheme="purple"
              onClick={fun}
              ml={3}
            >
              {t("accept")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default Alert;
