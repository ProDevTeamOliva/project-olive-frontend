import { Text, Wrap } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Friend from "./Friend";
import { useDispatch, useSelector } from "react-redux";

function Friends() {
  const { t } = useTranslation();
  const languageValues = {
    noFriends: t("noFriends"),
  };

  const dispatch = useDispatch();
  const friends = useSelector((state) => state.meFriends.friends);

  const unAcceptFriendInvitation = (id) =>
    dispatch(unAcceptFriendInvitation(id));

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
            unAcceptFriendInvitation={unAcceptFriendInvitation}
          />
        ))
      ) : (
        <Text>{languageValues.noFriends}</Text>
      )}
    </Wrap>
  );
}

export default Friends;
