import { Button, Grid, Box, Divider, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import InputComponent from "../Inputs/InputComponent";
import { purpleButtonStyle } from "../../styles/Buttons/purpleButton";
import { connect } from "react-redux";
import { signUp } from "../../actions/authActions";
import { useState, useRef } from "react";
import Alert from "../Alert/Alert";
import { validatePassword } from "../../validators/validatePassword";
import { useTranslation } from "react-i18next";

function RegisterForm({ status, signUp, message }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const onCloseAlert = () => setIsOpen(false);
  const cancelRef = useRef();
  const [formValues, setFormValues] = useState({});

  const initialDataRegister = {
    nameFirst: "",
    nameLast: "",
    login: "",
    password: "",
    repeatPassword: "",
  };
  const inputColors = { color: "gray.700", borderColor: "gray.100" };

  const handleSubmit = (values) => {
    const { repeatPassword, ...payload } = values;
    setIsOpen(true);
    return setFormValues(payload);
  };

  const register = () => {
    onCloseAlert();
    return signUp(formValues);
  };

  return (
    <Box p="20px">
      <Text
        color={status.startsWith("4") ? "red" : "green"}
        fontSize="110%"
        mb="10px"
        fontWeight="bold"
        align="center"
      >
        {message}
      </Text>
      <Formik initialValues={initialDataRegister} onSubmit={handleSubmit}>
        {({
          handleSubmit,
          initialValues: {
            nameFirst,
            nameLast,
            login,
            password,
            repeatPassword,
          },
        }) => (
          <Form onSubmit={handleSubmit}>
            <Grid placeItems="center" templateRows="auto" gap="15px">
              <Text color="gray.900" fontWeight="bold" fontSize="110%">
                {t("userData")}
              </Text>
              <Divider borderColor="mediumslateblue" border="1px"></Divider>

              <InputComponent
                name={t("firstName")}
                id="nameFirst"
                type="text"
                value={nameFirst}
                {...inputColors}
              />
              <InputComponent
                name={t("secondName")}
                type="text"
                id="nameLast"
                value={nameLast}
                {...inputColors}
              />
              <Text color="gray.900" fontWeight="bold" fontSize="110%">
                {t("registrationData")}
              </Text>
              <Divider borderColor="mediumslateblue" border="1px"></Divider>
              <InputComponent
                name={t("login")}
                id="login"
                type="text"
                value={login}
                {...inputColors}
              />
              <InputComponent
                name={t("password")}
                id="password"
                type="password"
                value={password}
                validate={(value) => validatePassword(value, t("required"))}
                {...inputColors}
              />
              <InputComponent
                name={t("repeatPassword")}
                id="repeatPassword"
                type="password"
                value={repeatPassword}
                {...inputColors}
              />
              <Button type="submit" mb="10px" mt="30px" {...purpleButtonStyle}>
                {t("register")}
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>

      <Alert
        isOpen={isOpen}
        onCloseAlert={onCloseAlert}
        register={register}
        cancelRef={cancelRef}
        header={t("createAccount")}
        body={t("alertRegistrationBody")}
      />
    </Box>
  );
}

const mapStateToProps = (state) => ({
  message: state.register.message,
  status: state.register.status.toString(),
});
const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (payload) => dispatch(signUp(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
