import { Text, Wrap } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Friend from "./Friend";

function Friends() {
  const { t } = useTranslation();
  const languageValues = {
    noFriends: t("noFriends"),
  };

  const friends = useSelector((state) => state.meFriends.friends);

  return (
    <Wrap spacing="80px" justify="center">
      {friends.length > 0 ? (
        friends.map(({ id, avatar, nameFirst, nameLast }) => (
          <Friend
            key={id}
            id={id}
            avatar={avatar}
            nameFirst={nameFirst}
            nameLast={nameLast}
          />
        ))
      ) : (
        <Text>{languageValues.noFriends}</Text>
      )}
    </Wrap>
  );
}

export default Friends;
