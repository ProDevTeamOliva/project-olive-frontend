import { useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery, Box, Grid, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LogoUp from "../Logo/LogoUp";
import LogoMobile from "../Logo/LogoMobile";
import { getMeFriends } from "../../actions/meActions";
import { unStyledButton } from "../../styles/Buttons/unStyledButton";
import Bell from "../Notifications/Bell";
import { getPosts } from "../../actions/postActions";
import Search from "../Search/Search";
import DropDown from "./DropDown";
import SearchModal from "../Search/SearchModal";

function Navbar({ changeLanguage }) {
    const [isDesktop] = useMediaQuery("(min-width: 48em)");

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
            className="blur">
            <Grid
                templateColumns={{
                    base: "75px minmax(75px, 1fr) 75px 75px",
                    md: "150px 1fr 75px 75px",
                }}
                placeItems="center">
                <Button
                    variant="unstyled"
                    {...unStyledButton}
                    w={{ base: "75px", md: "150px" }}
                    h="100%">
                    <Link
                        to="/main"
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "grid",
                            placeItems: "center",
                        }}>
                        {isDesktop ? (
                            <LogoUp fontSize="14" scaleWidth={9.2} />
                        ) : (
                            <LogoMobile />
                        )}
                    </Link>
                </Button>
                <Search kindOfSearch="personV1" />
                <Box
                    boxSize="100%"
                    display={{ base: "grid", md: "none" }}
                    justifyContent="end">
                    <SearchModal kindOfSearch="personV2" />
                </Box>
                <Bell />
                <DropDown changeLanguage={changeLanguage} />
            </Grid>
        </Box>
    );
}

export default memo(Navbar);
