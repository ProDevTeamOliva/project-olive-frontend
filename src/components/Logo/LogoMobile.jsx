import { Grid } from "@chakra-ui/react";
import LogoDown from "./LogoDown";

function LogoMobile() {
  return (
    <Grid
      boxSize="50px"
      borderRadius="16px"
      bg="mediumslateblue"
      placeItems="center"
    >
      <Grid boxSize="84%">
        <LogoDown />
      </Grid>
    </Grid>
  );
}

export default LogoMobile;
