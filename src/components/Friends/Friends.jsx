import { Wrap, Box, Input } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Friend from "./Friend";
import LoadingSpinner from "../Spinner/LoadingSpinner";

function Friends() {
  const { t } = useTranslation();
  const languageValues = {
    findPerson: t("findPerson"),
  };

  const friends = useSelector((state) => state.meFriends.friends);
  const isLoading = useSelector((state) => state.meFriends.isFetching);
  const [search, setSearch] = useState("");
  const [friendsFromSearch, setFriendsFromSearch] = useState(friends);

  useEffect(() => {
    setFriendsFromSearch(
      friends.filter(
        (friend) =>
          friend.nameFirst.toLowerCase().includes(search.toLowerCase()) ||
          friend.nameLast.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [setFriendsFromSearch, friends, search]);

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
          onChange={(e) => setSearch(e.target.value)}
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
        <LoadingSpinner isLoading={isLoading} />
      )}
    </Wrap>
  );
}

export default Friends;
