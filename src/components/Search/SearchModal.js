import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { restartSearchUsers, searchUsers } from "../../actions/searchActions";
import Search from "./Search";

function SearchModal({ users, searchUsers, restartSearchUsers }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const openModal = () => {
    restartSearchUsers();
    onOpen();
  };
  const getUsers = (event) => {
    const value = event.target.value.toLowerCase();
    if (value !== "") {
      return searchUsers(value);
    }
  };
  return (
    <>
      <Button
        onClick={openModal}
        variant="unstyled"
        width="100%"
        _focus={{ borderColor: "none" }}
        _hover={{
          bg: "none",
        }}
        _active={{
          bg: "none",
        }}
      >
        <Search placeholder={t("SearchNavBar")}></Search>
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} size="xl">
        <ModalOverlay />
        <ModalContent mr="3" ml="3" bg="gray.300">
          <ModalHeader mx={["10px", "40px"]}>
            <Input
              mt="20px"
              variant="unstyled"
              placeholder={t("SearchNavBar")}
              bgColor="mediumslateblue"
              border="none"
              borderRadius="10px"
              p="0 30px"
              lineHeight="40px"
              _placeholder={{ color: "white" }}
              display={["block", "block"]}
              onChange={getUsers}
            />
          </ModalHeader>

          <ModalBody>
            {users.length !== 0 &&
              users.map((user) => {
                return (
                  <Text key={user.id} color="black">
                    {user.nameFirst}
                  </Text>
                );
              })}
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
