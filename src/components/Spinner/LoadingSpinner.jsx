import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function LoadingSpinner() {
  const { t } = useTranslation();
  const languageValues = {
    noResults: t("noResults"),
  };

  const [load, setLoad] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setTimeout(() => {
      if (isMounted) {
        setLoad(false);
      }
    }, 2500);
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Box h="100vh" mt="75px" justifyContent="center">
      {load ? (
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
