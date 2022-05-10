import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import { unStyledButton } from "../../styles/Buttons/unStyledButton";
import { CgHashtag } from "react-icons/cg";
import Search from "./Search";
// https://github.com/astrit/css.gg
import { restartSearch } from "../../actions/searchActions";
import { Search2Icon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";

function SearchModal({ kindOfSearch }) {
  const dispatch = useDispatch();
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
        {kindOfSearch === "tag" ? (
          <CgHashtag style={{ width: "40px", height: "40px" }} />
        ) : (
          <Icon as={Search2Icon} w="10" h="10" mr={["-30px", "-5px", "40px"]} />
        )}
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

export default SearchModal;
