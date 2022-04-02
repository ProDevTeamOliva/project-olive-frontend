import { Button, Grid, Box, Divider, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import InputComponent from "../Inputs/InputComponent";
import { purpleButtonStyle } from "../../styles/Buttons/purpleButton";
import { useSelector, useDispatch } from "react-redux";
import { logIn, signUp } from "../../actions/authActions";
import { useState, useRef, memo } from "react";
import Alert from "../Alert/Alert";
import { validatePassword } from "../../validators/validatePassword";
import { useTranslation } from "react-i18next";
import { validateUserData } from "../../validators/validateUserDate";
import { validateLogin } from "../../validators/validateLogin";
import { validateRepeatPassword } from "../../validators/validateRepeatPassword";

const initialDataRegister = {
  nameFirst: "",
  nameLast: "",
  login: "",
  password: "",
  repeatPassword: "",
};
const inputColors = { color: "gray.700", borderColor: "gray.100" };

function RegisterForm() {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.register.message);
  const status = useSelector((state) => state.register.status).toString();

  const { t } = useTranslation();

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

  const register = async () => {
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
              {load && !status.startsWith("4") ? (
                <Button
                  isLoading
                  mb="10px"
                  mt="30px"
                  {...purpleButtonStyle}
                  loadingText={t("register")}
                >
                  {t("register")}
                </Button>
              ) : (
                <Button
                  type="submit"
                  mb="10px"
                  mt="30px"
                  {...purpleButtonStyle}
                >
                  {t("register")}
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
        header={t("createAccount")}
        body={t("alertRegistrationBody")}
      />
    </Box>
  );
}

export default memo(RegisterForm);
