import { Wrap } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import Friend from "./Friend";

function Friends() {
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
        <LoadingSpinner />
      )}
    </Wrap>
  );
}

export default Friends;
