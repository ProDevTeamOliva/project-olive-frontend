import { Button } from "@chakra-ui/react";
import { memo } from "react";
import { blueButtonStyle } from "../../styles/Buttons/blueButton";
import { useTranslation } from "react-i18next";

function ButtonLoginForm({ isSubmitting }) {
  const { t } = useTranslation();
  const languageValues = {
    logIn: t("logIn"),
  };

  return (
    <Button
      isLoading={isSubmitting}
      type="submit"
      mb="20px"
      mt="20px"
      {...blueButtonStyle}
    >
      {languageValues.logIn}
    </Button>
  );
}

export default memo(ButtonLoginForm);
