import { HStack, useRadioGroup } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import RadioCard from "./RadioCard";

function PublicPrivate({ setValue }) {
  const { t } = useTranslation();
  const languageValues = {
    public: t("public"),
    privateImages: t("privateImages"),
  };

  const options = [languageValues.public, languageValues.privateImages];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "publicPrivate",
    defaultValue: languageValues.public,
    onChange: (e) => setValue(e === options[1]),
  });

  const group = getRootProps();

  return (
    <HStack {...group} justify="center">
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
}

export default PublicPrivate;
