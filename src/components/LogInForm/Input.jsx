import { Input } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Field } from "formik";

function Inputs({ name, id, value }) {
  return (
    <>
      <Field name={id} value={value}>
        {({ field }) => (
          <FormControl w={["60%", "45%", "40%", "35%", "25%", "20%"]}>
            <FormLabel htmlFor="login" mt="5%" mb="3%">
              {name}
            </FormLabel>
            <Input
              {...field}
              id={id}
              placeholder={name}
              borderColor="blackAlpha.500"
              focusBorderColor="blue.500"
              h="50px"
            />
          </FormControl>
        )}
      </Field>
    </>
  );
}

export default Inputs;
