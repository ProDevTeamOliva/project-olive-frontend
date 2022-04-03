import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Icon,
  InputRightElement,
  InputGroup,
  VStack,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { restartSearchUsers, searchUsers } from "../../actions/searchActions";
import Search from "./Search";
import LinkSearch from "./LinkSearch";
import { baseUrl } from "../../config/baseUrl";
import { unStyledButton } from "../../styles/Buttons/unStyledButton";

function SearchModal({ users, searchUsers, restartSearchUsers }) {
  const { t } = useTranslation();
  const languageValues = {
    searchNavBar: t("searchNavBar"),
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const openModal = () => {
    restartSearchUsers();
    onOpen();
  };

  const getUsers = (event) => {
    const value = event.target.value.toLowerCase();
    if (value !== "") {
      return searchUsers({ valueSearch: value });
    }
  };

  return (
    <>
      <Button
        onClick={openModal}
        variant="unstyled"
        width="100%"
        {...unStyledButton}
      >
        <Search placeholder={languageValues.searchNavBar}></Search>
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} size="xl">
        <ModalOverlay />
        <ModalContent mx="3" bg="gray.100">
          <ModalHeader mx={["10px", "40px"]}>
            <InputGroup>
              <Input
                mt="20px"
                variant="unstyled"
                placeholder={languageValues.searchNavBar}
                bgColor="mediumslateblue"
                border="none"
                borderRadius="10px"
                p="0 30px"
                lineHeight="40px"
                _placeholder={{ color: "white" }}
                display={["block", "block"]}
                onChange={getUsers}
              />
              <InputRightElement>
                <Icon as={Search2Icon} w="5" h="5" mt="10" />
              </InputRightElement>
            </InputGroup>
          </ModalHeader>

          <ModalBody mb="20" mt="5">
            <VStack>
              {users.length !== 0 &&
                users.map(({ id, nameFirst, nameLast, avatar }) => {
                  return (
                    <LinkSearch
                      key={id}
                      id={id}
                      nameFirst={nameFirst}
                      nameLast={nameLast}
                      avatar={baseUrl + avatar}
                      onClose={onClose}
                    />
                  );
                })}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  users: state.searchUsers.users,
});

const mapDispatchToProps = (dispatch) => ({
  searchUsers: (data) => dispatch(searchUsers(data)),
  restartSearchUsers: () => dispatch(restartSearchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);
