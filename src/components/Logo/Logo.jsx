import { Grid } from "@chakra-ui/react";
import LogoDown from "./LogoDown";
import LogoUp from "./LogoUp";

function Logo({ fontSize, scaleWidth }) {
  return (
    <Grid placeItems="center" gap="40px" w="100%">
      <LogoUp fontSize={fontSize} scaleWidth={scaleWidth} />
      <Grid w="36%" h="100%">
        <LogoDown />
      </Grid>
    </Grid>
  );
}

export default Logo;
