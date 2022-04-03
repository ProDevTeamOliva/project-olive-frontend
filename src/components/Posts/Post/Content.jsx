import { Box } from "@chakra-ui/react";
import { memo, useState } from "react";

const Content = ({ content }) => {
  const [hiddenContent, setHiddenContent] = useState(true);

  return (
    <Box
      mt="1"
      fontWeight="semibold"
      as="h4"
      fontSize={["xl", "2xl"]}
      lineHeight="tight"
      isTruncated={hiddenContent}
      onClick={() => setHiddenContent((state) => !state)}
    >
      {content}
    </Box>
  );
};

export default memo(Content);
