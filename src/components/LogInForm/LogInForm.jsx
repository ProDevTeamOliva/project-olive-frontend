import { Grid, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import Inputs from "./Input";
import { staticPl } from "../../constants/Forms";

function LogInForm({ loginSubmit }) {
  const initialDataLogin = { login: "", password: "" };

  const handleSubmit = (values) => {
    loginSubmit(values);
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
          style={{ display: "inline-block", width: "100%" }}
        >
          <Grid placeItems="center" templateRows="auto" gap="25px">
            <Inputs name={staticPl.login} id="login" value={login} />
            <Inputs name={staticPl.password} id="password" value={password} />

            <Button
              colorScheme="blue"
              isLoading={isSubmitting}
              type="submit"
              w="100%"
            >
              {staticPl.log}
            </Button>
            <Button color="green.500" fontSize="150%" variant="link">
              {staticPl.reg}
            </Button>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default LogInForm;
