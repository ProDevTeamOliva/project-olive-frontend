import { Box, Grid, Image } from "@chakra-ui/react";
import LogoUp from "../Logo/LogoUp";
import Search from "../Search/Search";
import Account from "../../img/account_white.png";

const Navbar = () => {
  return (
    <Box
      pos="fixed"
      top="0"
      left="0"
      zIndex={999}
      h="75px"
      w="100%"
      bgColor="rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(50px)"
      className="blur"
    >
      <Grid
        templateColumns="170px 1fr 170px"
        h="100%"
        w="100%"
        placeItems="center"
      >
        <LogoUp fontSize="15.2" scaleWidth={9.4} />
        <Search />
        <Grid templateColumns="repeat(3, 50px)" gridColumn="3/4">
          <Image
            src={Account}
            alt="Account"
            h="50px"
            cursor="pointer"
            gridColumn="3/4"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Navbar;
