import { Button, Grid, Box, Divider, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import InputComponent from "../Inputs/InputComponent";
import { purpleButtonStyle } from "../../styles/Buttons/purpleButton";
import { useSelector, useDispatch } from "react-redux";
import { logIn, signUp } from "../../actions/authActions";
import { useState, useRef, memo } from "react";
import Alert from "../Alert/Alert";
import { validatorOfPassword } from "../../validators/validatorOfPassword";
import { useTranslation } from "react-i18next";
import { validatorOfUserData } from "../../validators/validatorOfUserData";
import { validatorOfLogin } from "../../validators/validatorOfLogin";
import { validatorOfRepeatPassword } from "../../validators/validatorOfRepeatPassword";

const initialDataRegister = {
  nameFirst: "",
  nameLast: "",
  login: "",
  password: "",
  repeatPassword: "",
};
const inputColors = { color: "gray.700", borderColor: "gray.100" };

function RegisterForm() {
  const { t } = useTranslation();
  const languageValues = {
    required: t("required"),
    amoutOfSignMin2: t("amoutOfSignMin2"),
    amoutOfSignMin8: t("amoutOfSignMin8"),
    amoutOfSignMax20: t("amoutOfSignMax20"),
    amoutOfSignMax60: t("amoutOfSignMax60"),
    password: t("password"),
    passwordValidation: t("passwordValidation"),
    repeatPassword: t("repeatPassword"),
    passwordRepeatValidation: t("passwordRepeatValidation"),
    userData: t("userData"),
    registrationData: t("registrationData"),
    firstName: t("firstName"),
    secondName: t("secondName"),
    register: t("register"),
    createAccount: t("createAccount"),
    alertRegistrationBody: t("alertRegistrationBody"),
  };

  const dispatch = useDispatch();
  const message = useSelector((state) => state.register.message);
  const status = useSelector((state) => state.register.status).toString();

  const [isOpen, setIsOpen] = useState(false);
  const onCloseAlert = () => setIsOpen(false);
  const cancelRef = useRef();

  const [formValues, setFormValues] = useState({});
  const [load, setLoad] = useState(false);

  const handleSubmit = (values) => {
    const { repeatPassword, ...payload } = values;
    setIsOpen(true);
    return setFormValues(payload);
  };

  const register = () => {
    setLoad(true);
    onCloseAlert();
    return dispatch(signUp(formValues));
  };

  const login = () => {
    if (status === "201") {
      const { nameFirst, nameLast, repeatPassword, ...dataToLogIn } =
        formValues;
      setTimeout(() => {
        dispatch(logIn(dataToLogIn));
      }, 1000);
    }
  };

  const validateNameFirst = validatorOfUserData(
    languageValues.required,
    languageValues.amoutOfSignMin2,
    languageValues.amoutOfSignMax60
  );

  const validateNameLast = validatorOfUserData(
    languageValues.required,
    languageValues.amoutOfSignMin2,
    languageValues.amoutOfSignMax60
  );
  const validateLogin = validatorOfLogin(
    languageValues.required,
    languageValues.amoutOfSignMin2,
    languageValues.amoutOfSignMax20
  );
  const validatePassword = validatorOfPassword(
    languageValues.required,
    languageValues.amoutOfSignMin8,
    languageValues.amoutOfSignMax20,
    languageValues.passwordValidation
  );

  const validateRepeatPassword = validatorOfRepeatPassword(
    languageValues.required,
    languageValues.passwordRepeatValidation
  );

  return (
    <Box p="20px">
      {login()}
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
                {languageValues.userData}
              </Text>
              <Divider borderColor="mediumslateblue" border="1px"></Divider>

              <InputComponent
                name={languageValues.firstName}
                id="nameFirst"
                type="text"
                validate={(value) => validateNameFirst(value)}
                value={nameFirst}
                {...inputColors}
              />
              <InputComponent
                name={languageValues.secondName}
                id="nameLast"
                type="text"
                validate={(value) => validateNameLast(value)}
                value={nameLast}
                {...inputColors}
              />
              <Text color="gray.900" fontWeight="bold" fontSize="110%">
                {languageValues.registrationData}
              </Text>
              <Divider borderColor="mediumslateblue" border="1px"></Divider>
              <InputComponent
                name={t("login")}
                id="login"
                type="text"
                validate={(value) => validateLogin(value)}
                value={login}
                {...inputColors}
              />
              <InputComponent
                name={languageValues.password}
                id="password"
                type="password"
                value={password}
                validate={(value) => validatePassword(value)}
                {...inputColors}
              />
              <InputComponent
                name={languageValues.repeatPassword}
                id="repeatPassword"
                type="password"
                value={repeatPassword}
                validate={(value) =>
                  validateRepeatPassword(value, values.password)
                }
                {...inputColors}
              />
              {load && !status.startsWith("4") ? (
                <Button
                  isLoading
                  mb="10px"
                  mt="30px"
                  {...purpleButtonStyle}
                  loadingText={languageValues.register}
                >
                  {languageValues.register}
                </Button>
              ) : (
                <Button
                  type="submit"
                  mb="10px"
                  mt="30px"
                  {...purpleButtonStyle}
                >
                  {languageValues.register}
                </Button>
              )}
            </Grid>
          </Form>
        )}
      </Formik>

      <Alert
        isOpen={isOpen}
        onCloseAlert={onCloseAlert}
        fun={register}
        cancelRef={cancelRef}
        header={languageValues.createAccount}
        body={t("alertRegistrationBody")}
      />
    </Box>
  );
}

export default memo(RegisterForm);
