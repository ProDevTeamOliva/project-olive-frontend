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
import { validateUserData } from "../../validators/validateUserDate";
import { validateLogin } from "../../validators/validateLogin";
import { validateRepeatPassword } from "../../validators/validateRepeatPassword";

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
        color={status.startsWith("2") ? "green" : "red"}
        fontSize="110%"
        mb="10px"
        fontWeight="bold"
        align="left"
      >
        {t(message)}
      </Text>
      <Formik initialValues={initialDataRegister} onSubmit={handleSubmit}>
        {({
          handleSubmit,
          values,
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
                validate={(value) =>
                  validateUserData(
                    value,
                    t("required"),
                    t("amoutOfSignMin2"),
                    t("amoutOfSignMax60")
                  )
                }
                value={nameFirst}
                {...inputColors}
              />
              <InputComponent
                name={t("secondName")}
                id="nameLast"
                type="text"
                validate={(value) =>
                  validateUserData(
                    value,
                    t("required"),
                    t("amoutOfSignMin2"),
                    t("amoutOfSignMax60")
                  )
                }
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
                validate={(value) =>
                  validateLogin(
                    value,
                    t("required"),
                    t("amoutOfSignMin2"),
                    t("amoutOfSignMax20")
                  )
                }
                value={login}
                {...inputColors}
              />
              <InputComponent
                name={t("password")}
                id="password"
                type="password"
                value={password}
                validate={(value) =>
                  validatePassword(
                    value,
                    t("required"),
                    t("amoutOfSignMin8"),
                    t("amoutOfSignMax20"),
                    t("passwordValidation")
                  )
                }
                {...inputColors}
              />
              <InputComponent
                name={t("repeatPassword")}
                id="repeatPassword"
                type="password"
                value={repeatPassword}
                validate={(value) =>
                  validateRepeatPassword(
                    value,
                    values.password,
                    t("required"),
                    t("passwordRepeatValidation")
                  )
                }
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
        fun={register}
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
