import { Input } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Field } from "formik";

function InputComponent({
  namePlaceholder,
  nameFormLabel,
  id,
  value,
  type,
  color,
  borderColor,
  validate,
  autoComplete = "on",
}) {
  return (
    <>
      <Field name={id} value={value} validate={validate}>
        {({ field, form }) => (
          <FormControl isInvalid={form.errors[id] && form.touched[id]}>
            <FormLabel
              htmlFor="login"
              mb="5%"
              color={color}
              fontSize="auto"
              fontWeight="bold"
            >
              {nameFormLabel}
            </FormLabel>
            <Input
              {...field}
              id={id}
              type={type}
              placeholder={namePlaceholder}
              color={color}
              borderWidth="0.125rem"
              _placeholder={{ color: "#2D3748" }}
              borderColor={borderColor}
              focusBorderColor={color}
              _hover={{}}
              borderRadius="1.25em"
              shadow="0px 0px 4px 0px #171923"
              autoComplete={autoComplete}
            />
            <FormErrorMessage color="red">{form.errors[id]}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </>
  );
}

export default InputComponent;
