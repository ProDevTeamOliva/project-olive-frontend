import { Text, HStack, Avatar, Box } from "@chakra-ui/react";
import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../config/baseUrl";
import { parseDate } from "../../operations/parseDate";

function Comment({ comment, user, date, bgColor, link }) {
  const [hiddenContent, setHiddenContent] = useState(true);

  return (
    <>
      <Box
        bgColor={bgColor}
        borderRadius="15px 15px 0px 15px"
        mt="10px"
        px="8px"
        py="6px"
      >
        <HStack align="left" color="black">
          <Link to={link}>
            <Avatar src={baseUrl + user.avatar}></Avatar>
          </Link>

          <Box>
            <Link to={link}>
              <Text
                fontWeight="500"
                _hover={{
                  fontWeight: "700",
                  color: "gray.900",
                }}
              >
                {user.nameFirst} {user.nameLast}
              </Text>
            </Link>
            <Text
              maxW="250px"
              as="h4"
              isTruncated={hiddenContent}
              onClick={() => setHiddenContent((state) => !state)}
            >
              {comment}
            </Text>
          </Box>
        </HStack>
      </Box>
      <Text align="end" mr="10px" fontSize="11px">
        {parseDate(date)}
      </Text>
    </>
  );
}

export default memo(Comment);
