import { Grid } from "@chakra-ui/react";
import { Redirect } from "react-router";
import LogInForm from "../LogInForm/LogInForm";
import Logo from "../Logo/Logo";

function LogInPage({ isAuth, loginSubmit }) {
  return (
    <Grid placeItems="center" h="100%">
      <Grid
        placeItems="center"
        w={["280px", "400px"]}
        mt={["20px", "30px", "5px"]}
        gap="25px"
      >
        <Logo fontSize="26" scaleWidth={9.4} />
        <LogInForm loginSubmit={loginSubmit} />
      </Grid>
      {isAuth !== true ? (
        <Redirect to="/login"></Redirect>
      ) : (
        <Redirect to="/user"></Redirect>
      )}
    </Grid>
  );
}

export default LogInPage;
