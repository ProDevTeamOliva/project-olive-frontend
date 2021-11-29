import { Grid, Button, Box, Text, Divider } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import InputComponent from "../Inputs/InputComponent";
import RegisterModal from "../RegisterForm/RegisterModal";
import { blueButtonStyle } from "../../styles/Buttons/blueButton";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { logIn } from "../../actions/authActions";

function LogInForm({ logIn }) {
  const initialDataLogin = { login: "", password: "" };
  const { t } = useTranslation();

  const handleSubmit = (values) => {
    logIn(values);
  };

  const inputColors = { color: "gray.800", borderColor: "gray.600" };
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
      <Formik
        initialValues={initialDataLogin}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
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
                name={t("login")}
                id="login"
                type="text"
                value={login}
                {...inputColors}
              />
              <InputComponent
                name={t("password")}
                type="password"
                id="password"
                value={password}
                {...inputColors}
              />

              <Button
                isLoading={isSubmitting}
                type="submit"
                mb="20px"
                mt="20px"
                {...blueButtonStyle}
              >
                {t("logIn")}
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
      <RegisterModal></RegisterModal>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  logIn: (data) => dispatch(logIn(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);
