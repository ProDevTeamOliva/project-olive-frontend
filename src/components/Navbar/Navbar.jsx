import { useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { Box, Grid, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LogoUp from "../Logo/LogoUp";
import { getMeFriends } from "../../actions/meActions";
import { unStyledButton } from "../../styles/Buttons/unStyledButton";
import Bell from "../Notifications/Bell";
import { getPosts } from "../../actions/postActions";
import Search from "../Search/Search";
import DropDown from "./DropDown";
import SearchModal from "../Search/SearchModal";

function Navbar({ changeLanguage }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getMeFriends());
  }, [dispatch]);

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
        templateColumns="150px 1fr 75px 75px 75px"
        placeItems="center"
        templateRows="1fr 35px"
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
        <Search kindOfSearch="personV1" />
        <Box
          pos="relative"
          gridRow="1/2"
          gridColumn="3/4"
          display={["inline-block", "inline-block", "inline-block", "none"]}
        >
          <SearchModal kindOfSearch="personV2" />
        </Box>
        <Bell />
        <DropDown changeLanguage={changeLanguage} />
      </Grid>
    </Box>
  );
}

export default memo(Navbar);
