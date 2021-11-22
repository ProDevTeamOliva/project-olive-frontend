import { Input } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Field } from "formik";

function Inputs({ name, id, value }) {
  return (
    <>
      <Field name={id} value={value}>
        {({ field }) => (
          <FormControl>
            <FormLabel htmlFor="login" mb="5%">
              {name}
            </FormLabel>
            <Input
              {...field}
              id={id}
              placeholder={name}
              borderColor="white"
              focusBorderColor="blue.500"
            />
          </FormControl>
        )}
      </Field>
    </>
  );
}

export default Inputs;
