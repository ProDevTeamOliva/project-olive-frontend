import { Grid } from "@chakra-ui/layout";
import LogoDown from "./LogoDown";
import LogoUp from "./LogoUp";

function Logo({ fontSize }) {
  return (
    <Grid placeItems="center" gap="25px" w="100%">
      <LogoUp fontSize={fontSize} />
      <LogoDown />
    </Grid>
  );
}

export default Logo;
