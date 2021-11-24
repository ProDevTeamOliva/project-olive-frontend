import { Grid } from "@chakra-ui/react";
import LogInForm from "../LogInForm/LogInForm";
import Logo from "../Logo/Logo";

function LogInPage({ loginSubmit }) {
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
    </Grid>
  );
}

export default LogInPage;
