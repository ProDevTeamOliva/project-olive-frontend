import { Button, Grid, Box, Divider, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import InputComponent from "../Inputs/InputComponent";
import { staticPl } from "../../constants/Forms";
import { purpleButtonStyle } from "../../styles/Buttons/purpleButton";

function RegisterForm() {
  const initialDataRegister = {
    nameFirst: "",
    nameLast: "",
    login: "",
    password: "",
    repeatPassword: "",
  };
  const inputColors = { color: "gray.700", borderColor: "gray.100" };
  const handleSubmit = (values) => {};

  return (
    <Box p="20px">
      <Formik
        initialValues={initialDataRegister}
        onSubmit={() => {
          handleSubmit();
        }}
      >
        {({
          handleSubmit,
          isSubmitting,
          initialValues: {
            nameFirst,
            nameSecond,
            login,
            password,
            repeatPassword,
          },
        }) => (
          <Form onSubmit={handleSubmit}>
            <Grid placeItems="center" templateRows="auto" gap="15px">
              <Text color="gray.900" fontWeight="bold" fontSize="110%">
                {staticPl.userData}
              </Text>
              <Divider borderColor="mediumslateblue" border="1px"></Divider>

              <InputComponent
                name={staticPl.firstName}
                id="nameFirst"
                type="text"
                value={nameFirst}
                {...inputColors}
              />
              <InputComponent
                name={staticPl.secondName}
                type="text"
                id="nameSecond"
                value={nameSecond}
                {...inputColors}
              />
              <Text color="gray.900" fontWeight="bold" fontSize="110%">
                {staticPl.registrationData}
              </Text>
              <Divider borderColor="mediumslateblue" border="1px"></Divider>
              <InputComponent
                name={staticPl.login}
                id="login"
                type="text"
                value={login}
                {...inputColors}
              />
              <InputComponent
                name={staticPl.password}
                id="password"
                type="password"
                value={password}
                {...inputColors}
              />
              <InputComponent
                name={staticPl.repeatPassword}
                id="repeatPassword"
                type="password"
                value={repeatPassword}
                {...inputColors}
              />
              <Button
                isLoading={isSubmitting}
                type="submit"
                mb="10px"
                mt="30px"
                {...purpleButtonStyle}
              >
                {staticPl.register}
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default RegisterForm;
