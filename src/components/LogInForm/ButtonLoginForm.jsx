import { Button } from "@chakra-ui/react";
import { memo } from "react";
import { blueButtonStyle } from "../../styles/Buttons/blueButton";

const ButtonLoginForm = ({ isSubmitting, t }) => {
  return (
    <Button
      isLoading={isSubmitting}
      type="submit"
      mb="20px"
      mt="20px"
      {...blueButtonStyle}
    >
      {t("logIn")}
    </Button>
  );
};

export default memo(ButtonLoginForm);
