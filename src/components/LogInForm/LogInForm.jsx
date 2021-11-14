import { Button, Stack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import Inputs from "./Input";
import { staticPl } from "../../constants/Forms";

function LogInForm({ changeAuth }) {
  const initialDataLogin = { login: "", password: "" };

  const handleSubmit = () => {
    changeAuth(true);
  };

  return (
    <Formik
      initialValues={initialDataLogin}
      onSubmit={() => {
        handleSubmit();
      }}
    >
      {({ handleSubmit, isSubmitting, initialValues: { login, password } }) => (
        <Form
          onSubmit={handleSubmit}
          style={{ height: "100%", marginTop: "7%" }}
        >
          <Inputs name={staticPl.login} id="login" value={login} />
          <Inputs name={staticPl.password} id="password" value={password} />

          <Stack
            direction="column"
            spacing={4}
            align="center"
            justify="center"
            mt={4}
          >
            <Button
              colorScheme="blue"
              isLoading={isSubmitting}
              type="submit"
              w={["60%", "45%", "40%", "35%", "25%", "20%"]}
            >
              {staticPl.log}
            </Button>
            <Button color="green.500" fontSize="150%" variant="link">
              {staticPl.reg}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

export default LogInForm;
