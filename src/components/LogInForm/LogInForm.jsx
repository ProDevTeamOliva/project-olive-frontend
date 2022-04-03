import { Grid, Box, Text, Divider } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import InputComponent from "../Inputs/InputComponent";
import RegisterModal from "../RegisterForm/RegisterModal";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { logIn } from "../../actions/authActions";
import { validatorOfRequired } from "../../validators/validatorOfRequired";
import ButtonLoginForm from "./ButtonLoginForm";

const initialDataLogin = { login: "", password: "" };
const inputColors = { color: "gray.800", borderColor: "gray.600" };

function LogInForm({ logIn, message, status }) {
  const { t } = useTranslation();
  const languageValues = {
    required: t("required"),
    login: t("login"),
    password: t("password"),
  };

  const handleSubmit = (values) => {
    return logIn(values);
  };
  const validateRequired = validatorOfRequired(languageValues.required);

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
                name={languageValues.login}
                id="login"
                type="text"
                validate={(value) => validateRequired(value)}
                value={login}
                {...inputColors}
              />
              <InputComponent
                name={languageValues.password}
                type="password"
                id="password"
                validate={(value) => validateRequired(value)}
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

const mapStateToProps = (state) => ({
  message: state.logIn.message,
  status: state.logIn.status.toString(),
});

const mapDispatchToProps = (dispatch) => ({
  logIn: (data) => dispatch(logIn(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);
