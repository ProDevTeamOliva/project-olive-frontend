import { Button, Input, InputGroup } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const FileUpload = (props) => {
  const { t } = useTranslation();
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
      <Button {...props}>{props?.text ? props.text : t("upload")}</Button>
    </InputGroup>
  );
};

export default FileUpload;
