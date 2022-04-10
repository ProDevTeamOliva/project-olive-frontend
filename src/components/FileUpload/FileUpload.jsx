import { Button, Input, InputGroup } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

function FileUpload(props) {
  const { t } = useTranslation();
  const languageValues = {
    upload: t("upload"),
  };

  let hiddenInput = null;

  return (
    <InputGroup onClick={() => hiddenInput.click()}>
      <Input
        type="file"
        hidden
        {...props}
        ref={(e) => {
          hiddenInput = e;
        }}
      />

      <Button {...props} _focus={{ border: "none" }}>
        {props?.text ? props.text : languageValues.upload}
      </Button>
    </InputGroup>
  );
}

export default FileUpload;
