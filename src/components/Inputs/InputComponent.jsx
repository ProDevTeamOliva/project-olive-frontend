import { Input } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Field } from "formik";

function InputComponent({ name, id, value, type, color, borderColor }) {
  return (
    <>
      <Field name={id} value={value}>
        {({ field }) => (
          <FormControl>
            <FormLabel
              htmlFor="login"
              mb="5%"
              color={color}
              fontSize="auto"
              fontWeight="bold"
            >
              {name}
            </FormLabel>
            <Input
              {...field}
              id={id}
              type={type}
              placeholder={name}
              color={color}
              borderWidth="0.125rem"
              _placeholder={{ color: "#2D3748" }}
              borderColor={borderColor}
              focusBorderColor={color}
              _hover={{}}
              borderRadius="1.25em"
              shadow="0px 0px 4px 0px #171923"
            />
          </FormControl>
        )}
      </Field>
    </>
  );
}

export default InputComponent;
