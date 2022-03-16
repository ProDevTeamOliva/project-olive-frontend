import { Box } from "@chakra-ui/react";
import { memo } from "react";

const Feeling = ({ feeling }) => (
  <Box color="gray.300" fontSize="sm" textShadow="sm">
    {feeling} (TUTAJ DOROBIĆ nastrój w poście.) 😎🤬🤢
  </Box>
);

export default memo(Feeling);
