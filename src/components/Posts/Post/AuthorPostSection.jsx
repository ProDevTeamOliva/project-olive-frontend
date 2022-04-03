import { Box, Image, Text } from "@chakra-ui/react";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import publicPostIcon from "../../../img/icons/PublicPostIcon.png";
import FriendsPostIcon from "../../../img/icons/FriendsPostIcon.png";
import GroupChatPostIcon from "../../../img/icons/GroupChatPostIcon.png";
import AvatarUser from "./Avatar";

const AuthorPostSection = ({ avatar, id, nameFirst, nameLast, type }) => {
  const { t } = useTranslation();

  const getPostTypeIcon = useCallback(() => {
    if (type === "Public") {
      return publicPostIcon;
    }
    if (type === "Friends") {
      return FriendsPostIcon;
    }
    if (type === "Group") {
      return GroupChatPostIcon;
    }
    return null;
  }, [type]);

  return (
    <Box display="flex" justifyContent="space-between">
      <AvatarUser avatar={avatar} id={id} />
      <Box
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize={["xl", "xl", "3xl"]}
        textTransform="capitalization"
        mx="5"
      >
        {nameFirst} {nameLast}
      </Box>
      <Box text="right" color="gray.500">
        {getPostTypeIcon(type) ? (
          <Box display="flex" flexDirection="column">
            <Image
              boxSize={["25px", "35px"]}
              src={getPostTypeIcon(type)}
              borderRadius="full"
            ></Image>
            <Text fontSize={["xs", "xs"]} textAlign="center">
              {t(type)}
            </Text>
          </Box>
        ) : (
          t(type)
        )}
      </Box>
    </Box>
  );
};

export default memo(AuthorPostSection);
