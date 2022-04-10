import { Box, Grid, Button } from "@chakra-ui/react";
import LogoUp from "../Logo/LogoUp";
import { connect } from "react-redux";
import { getMeFriends } from "../../actions/meActions";
import { Link } from "react-router-dom";
import { unStyledButton } from "../../styles/Buttons/unStyledButton";
import { useEffect } from "react";
import Bell from "../Notifications/Bell";
import { getPosts } from "../../actions/postActions";
import Search from "../SearchBar/Search";
import DropDown from "./DropDown";

function Navbar({ changeLanguage, getMe, getMeFriends, getPosts }) {
  useEffect(() => {
    getPosts();
    const intervalId = setInterval(() => {
      getPosts();
      getMeFriends();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [getPosts, getMeFriends]);

  return (
    <Box
      pos="fixed"
      top="0"
      left="0"
      zIndex={999}
      h="75px"
      w="100%"
      bgColor="rgba(0, 0, 0, 0.25)"
      backdropFilter="blur(50px)"
      className="blur"
    >
      <Grid
        templateColumns="150px 1fr 75px 75px"
        placeItems="center"
        templateRows="1fr 1fr"
      >
        <Button
          variant="unstyled"
          {...unStyledButton}
          w="100%"
          h="100%"
          ml="2"
          gridRow="1"
        >
          <Link to="/main">
            <LogoUp fontSize="14" scaleWidth={9.2} />
          </Link>
        </Button>
        <Box pos="relative" gridRow="1/3" alignContent="start">
          <Search />
        </Box>
        <DropDown changeLanguage={changeLanguage} />
        <Bell />
      </Grid>
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMeFriends: () => dispatch(getMeFriends()),
    getPosts: () => dispatch(getPosts()),
  };
};

export default connect(null, mapDispatchToProps)(Navbar);
