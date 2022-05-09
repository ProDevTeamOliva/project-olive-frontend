import { Text } from "@chakra-ui/react";
import { memo } from "react";

const Like = ({ isLikedByMe, languageValues, likes }) => {
  return (
    <Text>
      {languageValues.likes} {likes}{" "}
      {isLikedByMe && languageValues.meLikingPost}
    </Text>
  );
};

export default memo(Like);
