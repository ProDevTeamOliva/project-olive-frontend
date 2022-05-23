import { Grid, Box, Text, Divider } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import InputComponent from "../Inputs/InputComponent";
import RegisterModal from "../RegisterForm/RegisterModal";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../actions/authActions";
import { validatorOfContent } from "../../validators/validatorOfContent";
import ButtonLoginForm from "./ButtonLoginForm";
import { memo } from "react";

const initialDataLogin = { login: "", password: "" };
const inputColors = { color: "gray.800", borderColor: "gray.600" };

function LogInForm() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const languageValues = {
    required: t("required"),
    login: t("login"),
    password: t("password"),
    maxSizeOfContent: t("maxSizeOfContent"),
  };
  const message = useSelector((state) => state.logIn.message);
  const status = useSelector((state) => state.logIn.status.toString());

  const handleSubmit = (values) => dispatch(logIn(values));

  const validateContent = validatorOfContent(
    languageValues.required,
    languageValues.maxSizeOfContent
  );

  return (
    <Box
      width="100%"
      bg="gray.50"
      boxShadow="0 0.5em 5em -0.125em black, 2px 2px 5px 1px white"
      borderWidth="1px"
      borderRadius="1.25em"
      color="white"
      p="30px"
      mb="25px"
      mt="25px"
    >
      <Text
        color="gray.700"
        fontSize="150%"
        mb="10px"
        fontWeight="bold"
        align="center"
      >
        {t("logging")}
      </Text>

      <Divider borderColor="mediumslateblue" mb="20px" borderWidth="1px" />
      <Text
        color={status.startsWith("2") ? "green" : "red"}
        fontSize="100%"
        mb="10px"
        fontWeight="bold"
        align="center"
      >
        {t(message)}
      </Text>
      <Formik initialValues={initialDataLogin} onSubmit={handleSubmit}>
        {({
          handleSubmit,
          isSubmitting,
          initialValues: { login, password },
        }) => (
          <Form
            onSubmit={handleSubmit}
            style={{ display: "inline-block", width: "100%" }}
          >
            <Grid placeItems="center" templateRows="auto" gap="20px">
              <InputComponent
                namePlaceholder={languageValues.login}
                nameFormLabel={languageValues.login}
                id="login"
                type="text"
                validate={(value) => validateContent(value)}
                value={login}
                {...inputColors}
              />
              <InputComponent
                namePlaceholder={languageValues.password}
                nameFormLabel={languageValues.password}
                type="password"
                id="password"
                validate={(value) => validateContent(value)}
                value={password}
                {...inputColors}
              />
              <ButtonLoginForm isSubmitting={isSubmitting} />
            </Grid>
          </Form>
        )}
      </Formik>
      <RegisterModal />
    </Box>
  );
}

export default memo(LogInForm);
