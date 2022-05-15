import { Flex, Box, Text, Grid, GridItem } from "@chakra-ui/react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AvatarUser from "../../User/AvatarUser";
import { postTypeIcon } from "./postTypeIcon";

const AuthorPostSection = ({ avatar, id, nameFirst, nameLast, type, link }) => {
  const { t } = useTranslation();
  const Icon = postTypeIcon[type];
  return (
    <Grid templateColumns="20% 60% 20%">
      <GridItem colStart="1" colEnd="2" align="center">
        <AvatarUser avatar={avatar} id={id} link={link} />
      </GridItem>
      <GridItem colStart="2" colEnd="3">
        <Box
          fontSize={["md", "xl", "2xl"]}
          fontWeight="semibold"
          mx="5"
          mt="20px"
        >
          <Text
            textAlign="center"
            color="white"
            _hover={{
              fontWeight: "bold",
            }}
          >
            <Link to={link}>
              {nameFirst} {nameLast}
            </Link>
          </Text>
        </Box>
      </GridItem>
      <GridItem colStart="3" colEnd="4">
        <Box color="gray.500">
          {Icon ? (
            <Flex flexDirection="column" align="end">
              <Box w={["30px", "40px"]} h={["30px", "40px"]}>
                <Icon
                  style={{
                    width: "100%",
                    height: "100%",
                    color: "lightgray",
                  }}
                />
              </Box>
              <Box w={["30px", "40px"]} h={["30px", "40px"]}>
                <Text fontSize={["9px", "xs"]} textAlign="center">
                  {t(type)}
                </Text>
              </Box>
            </Flex>
          ) : (
            t(type)
          )}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default memo(AuthorPostSection);
