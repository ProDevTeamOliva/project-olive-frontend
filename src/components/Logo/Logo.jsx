import { Grid } from "@chakra-ui/layout";
import LogoDown from "./LogoDown";
import LogoUp from "./LogoUp";

function Logo({ fontSize, scaleWidth }) {
  return (
    <Grid placeItems="center" gap="25px" w="100%">
      <LogoUp fontSize={fontSize} scaleWidth={scaleWidth} />
      <LogoDown />
    </Grid>
  );
}

export default Logo;
