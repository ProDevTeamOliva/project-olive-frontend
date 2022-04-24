import { Box, Center, Text } from "@chakra-ui/react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import AvatarUser from "../../User/AvatarUser";
import { postTypeIcon } from "./postTypeIcon";

const AuthorPostSection = ({ avatar, id, nameFirst, nameLast, type }) => {
  const { t } = useTranslation();
  const Icon = postTypeIcon[type];
  return (
    <Box display="flex" justifyContent="space-between">
      <AvatarUser avatar={avatar} id={id} />
      <Box
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize={["xl", "xl", "3xl"]}
        textTransform="capitalization"
        mx="5"
        mt="20px"
      >
        {nameFirst} {nameLast}
      </Box>
      <Box text="right" color="gray.500">
        {Icon ? (
          <Box display="flex" flexDirection="column">
            <Center>
              <Icon
                style={{
                  width: "40px",
                  height: "40px",
                  color: "lightgray",
                }}
              />
            </Center>
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
