import {
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Center,
  Button,
  HStack,
  Box,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { Formik, Form, Field } from "formik";
import { validateRequired } from "../../validators/validateRequired";
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SearchByTags = () => {
  const history = useHistory();
  const handleSubmit = ({ tag }) => {
    history.push(`/posts/${tag.toLowerCase()}`);
  };
  const { t } = useTranslation();

  return (
    <Box px="4" mt="10" mb="10px">
      <Formik initialValues={{ tag: "" }} onSubmit={handleSubmit}>
        {({ handleSubmit, isSubmitting, initialValues: { tag } }) => (
          <Form onSubmit={handleSubmit}>
            <HStack>
              <Field
                name="tag"
                value={tag}
                validate={(value) => validateRequired(value, t("required"))}
              >
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors["tag"] && form.touched["tag"]}
                  >
                    <Center>
                      <InputGroup w={["100%"]}>
                        <Input
                          {...field}
                          id="tag"
                          type="text"
                          variant="unstyled"
                          placeholder="# tag"
                          bgColor="mediumslateblue"
                          border="1px"
                          borderColor="gray.400"
                          borderRadius="10px"
                          p="0 30px"
                          lineHeight="40px"
                          _placeholder={{ color: "white" }}
                        />
                        <InputRightElement>
                          <Button
                            isLoading={isSubmitting}
                            type="submit"
                            variant="unstyled"
                          >
                            <Icon
                              as={Search2Icon}
                              w={["10", "4"]}
                              h="10"
                              mb={["10", "0"]}
                              color="gray.800"
                            />
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </Center>
                    <FormErrorMessage color="red.400">
                      {form.errors["tag"]}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </HStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SearchByTags;
