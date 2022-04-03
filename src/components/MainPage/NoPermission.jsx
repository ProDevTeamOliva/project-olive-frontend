import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Heading, Text, Box } from "@chakra-ui/react";
import { purpleButtonStyle } from "../../styles/Buttons/purpleButton";

function NoPermission() {
  const { t } = useTranslation();
  const languageValues = {
    noAccess: t("noAccess"),
    noExistPage: t("noExistPage"),
    logIn: t("logIn"),
  };

  return (
    <div className="noPermission">
      <Box textAlign="center" py={10} px={6} mt={20}>
        <Heading
          display="inline-block"
          as="h2"
          size="3xl"
          bg="mediumslateblue"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="25px" mt={3} mb={2}>
          {languageValues.noAccess}
        </Text>
        <Text fontSize="20px" color={"gray.500"} mb={6}>
          {languageValues.noExistPage}
        </Text>

        <Button {...purpleButtonStyle} w="200px">
          <Link to="/login">{languageValues.logIn}</Link>
        </Button>
      </Box>
    </div>
  );
}

export default NoPermission;
