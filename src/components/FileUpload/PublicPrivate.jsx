import { Box, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "blue.600",
          color: "white",
          borderColor: "blue.600",
        }}
        _focus={{
          boxShadow: "none",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

function PublicPrivate({ setValue }) {
  const { t } = useTranslation();
  const options = [t("publicImages"), t("privateImages")];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "publicPrivate",
    defaultValue: t("publicImages"),
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
