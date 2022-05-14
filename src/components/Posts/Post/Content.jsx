import { Box } from "@chakra-ui/react";
import { memo, useState } from "react";

const Content = ({ content }) => {
  const [hiddenContent, setHiddenContent] = useState(true);

  return (
    <Box
      my="10px"
      fontWeight="semibold"
      as="h4"
      fontSize={["xl", "2xl"]}
      lineHeight="tight"
      isTruncated={hiddenContent}
      onClick={() => setHiddenContent((state) => !state)}
      align="start"
    >
      {content}
    </Box>
  );
};

export default memo(Content);
