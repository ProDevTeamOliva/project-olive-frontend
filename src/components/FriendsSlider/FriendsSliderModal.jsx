import {
  useDisclosure,
  Button,
  Tooltip,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { restartSearch } from "../../actions/searchActions";
import { unStyledButton } from "../../styles/Buttons/unStyledButton";
import Search from "../Search/Search";
import { IconContext } from "react-icons";
import { IoPersonAdd } from "react-icons/io5";
// https://ionicons.com/

function FriendsSliderModal({ kindOfSearch }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const languageValues = {
    addFriendsChat: t("addFriendsChat"),
  };

  const clearSuggestions = () => dispatch(restartSearch());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openModal = () => {
    onOpen();
    clearSuggestions();
  };

  return (
    <>
      <Button
        onClick={openModal}
        variant="unstyled"
        width="100%"
        {...unStyledButton}
      >
        <Tooltip label={languageValues.addFriendsChat} bg="white">
          <Avatar
            boxSize="60px"
            m="10px"
            bg="white"
            icon={
              <IconContext.Provider
                value={{
                  size: "2rem",
                  color: "black",
                }}
              >
                <IoPersonAdd />
              </IconContext.Provider>
            }
          />
        </Tooltip>
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} size="xl" bg="none">
        <ModalOverlay />
        <ModalContent bg="none" boxShadow="none" mt="46px">
          <ModalBody height="100%">
            <Search kindOfSearch={kindOfSearch} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FriendsSliderModal;
