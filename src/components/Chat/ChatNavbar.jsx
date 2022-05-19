import {
  useMediaQuery,
  Grid,
  Button,
  Flex,
  Avatar,
  Heading,
} from "@chakra-ui/react";
import { unStyledButton } from "../../styles/Buttons/unStyledButton";
import { Link } from "react-router-dom";
import LogoUp from "../Logo/LogoUp";
import LogoDown from "../Logo/LogoDown";
import { baseUrl } from "../../config/baseUrl";

function ChatNavbar({ user }) {
  const [isDesktop] = useMediaQuery("(min-width: 48em)");

  return (
    <Grid
      gridColumn="span 2"
      templateColumns={{ base: "75px 1fr", md: "300px 1fr" }}
      placeItems="center"
    >
      <Grid
        boxSize="100%"
        placeItems="center"
        borderRight="1px"
        borderBottom="1px"
        borderColor="gray.500"
      >
        <Button
          variant="unstyled"
          {...unStyledButton}
          w={{ base: "75px", md: "150px" }}
          h="100%"
          gridRow="1"
        >
          <Link
            to="/main"
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
            }}
          >
            {isDesktop ? (
              <LogoUp fontSize="14" scaleWidth={9.2} />
            ) : (
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
            )}
          </Link>
        </Button>
      </Grid>

      <Flex
        w="100%"
        h="100%"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        borderBottom="1px"
        borderColor="gray.500"
      >
        {user && (
          <>
            <Avatar boxSize="48px" src={baseUrl + user.avatar} />
            <Heading
              fontSize="2xl"
              textAlign="center"
              m={{ base: "8px", sm: "16px" }}
            >
              {user.nameFirst} {user.nameLast}
            </Heading>
          </>
        )}
      </Flex>
    </Grid>
  );
}

export default ChatNavbar;
