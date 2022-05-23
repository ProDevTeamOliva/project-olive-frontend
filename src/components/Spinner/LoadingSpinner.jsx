import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

function LoadingSpinner({ isLoading }) {
  const { t } = useTranslation();
  const languageValues = {
    noResults: t("noResults"),
  };

  return (
    <Box h="100vh" mt="75px" justifyContent="center">
      {isLoading ? (
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            w="24"
            h="24"
          />
        </Center>
      ) : (
        <Text textAlign="center" fontSize="30px">
          {languageValues.noResults}
        </Text>
      )}
    </Box>
  );
}

export default LoadingSpinner;
