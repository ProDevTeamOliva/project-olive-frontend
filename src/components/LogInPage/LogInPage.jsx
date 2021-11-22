import { Grid } from "@chakra-ui/react";
import LogInForm from "../LogInForm/LogInForm";
import Logo from "../Logo/Logo";

function LogInPage({ loginSubmit }) {
  return (
    <Grid placeItems="center" h="100%">
      <Grid placeItems="center" w="300px" m="25px" gap="25px">
        <Logo fontSize="27px" />
        <LogInForm loginSubmit={loginSubmit} />
      </Grid>
    </Grid>
  );
}

export default LogInPage;
