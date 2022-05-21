import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";

function AlertToError({ isOpen, title, description, cancelRef, onCloseAlert }) {
  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen}>
      <AlertDialogOverlay>
        <AlertDialogContent ml="10px" mr="10px" bg="gray.200">
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
            color="red.500"
            pb="0"
          >
            {title}
          </AlertDialogHeader>

          <AlertDialogBody color="black" pt="3">
            {description}
          </AlertDialogBody>
          <AlertDialogFooter pt="0">
            <Button
              _focus={{ border: "none" }}
              _hover={{ bg: "blue.600" }}
              ref={cancelRef}
              bg="blue.500"
              onClick={onCloseAlert}
            >
              Ok
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default AlertToError;
