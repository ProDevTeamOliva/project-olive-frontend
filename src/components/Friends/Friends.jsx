import { Box, Input, Wrap } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import Friend from "./Friend";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function Friends() {
  const { t } = useTranslation();
  const languageValues = {
    findPerson: t("findPerson"),
  };

  const friends = useSelector((state) => state.meFriends.friends);
  const [friendsFromSearch, setFriendsFromSearch] = useState(friends);

  const search = (value) => {
    setFriendsFromSearch(
      friends.filter(
        (friend) =>
          friend.nameFirst.toLowerCase().includes(value.toLowerCase()) ||
          friend.nameLast.toLowerCase().includes(value.toLowerCase())
      )
    );
  };
  return (
    <Wrap spacing="40px" justify="center">
      <Box w="100%" mt="0px">
        <Input
          width="300px"
          borderColor="gray.200"
          placeholder={languageValues.findPerson}
          color="white"
          borderRadius="10px"
          _hover={{}}
          _placeholder={{ color: "gray.400" }}
          onChange={(e) => search(e.target.value)}
          defaultValue=""
        />
      </Box>
      {friendsFromSearch.length > 0 ? (
        friendsFromSearch.map(({ id, avatar, nameFirst, nameLast }) => (
          <Friend
            key={id}
            id={id}
            avatar={avatar}
            nameFirst={nameFirst}
            nameLast={nameLast}
          />
        ))
      ) : (
        <LoadingSpinner />
      )}
    </Wrap>
  );
}

export default Friends;
