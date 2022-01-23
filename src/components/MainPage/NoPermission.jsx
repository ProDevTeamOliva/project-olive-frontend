import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Heading, Text, Box } from "@chakra-ui/react";
import { purpleButtonStyle } from "../../styles/Buttons/purpleButton";

function NoPermission() {
  const { t } = useTranslation();
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
          {t("noAccess")}
        </Text>
        <Text fontSize="20px" color={"gray.500"} mb={6}>
          {t("noExistPage")}
        </Text>

        <Button {...purpleButtonStyle} w="200px">
          <Link to="/login">{t("logIn")}</Link>
        </Button>
      </Box>
    </div>
  );
}

export default NoPermission;
