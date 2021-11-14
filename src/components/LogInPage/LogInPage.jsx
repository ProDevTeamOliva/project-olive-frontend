import { Grid, GridItem } from "@chakra-ui/react";
import LogInForm from "../LogInForm/LogInForm.jsx";
import Logo from "../Logo/Logo.jsx";

function LogInPage({ changeAuth }) {
  return (
    <Grid templateColumns="repeat(1,1fr)" templateRows="repeat(10,9vh)">
      <GridItem rowSpan={3}>
        <Logo></Logo>
      </GridItem>
      <GridItem rowSpan={7} align="center">
        <LogInForm changeAuth={changeAuth}></LogInForm>
      </GridItem>
    </Grid>
  );
}

export default LogInPage;
