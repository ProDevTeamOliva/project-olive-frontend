import { Box, Grid } from "@chakra-ui/react";
import { Redirect } from "react-router";
import Language from "../Language/Language";
import LogInForm from "../LogInForm/LogInForm";
import Logo from "../Logo/Logo";

function LogInPage({ isAuth, changeLanguage }) {
  return (
    <Box>
      <Language changeLanguage={changeLanguage} />
      <Grid placeItems="center" h="100%" mt="50px">
        <Grid
          placeItems="center"
          w={["280px", "400px"]}
          mt={["20px", "30px", "5px"]}
          gap="25px"
        >
          <Logo fontSize="26" scaleWidth={9.4} />
          <LogInForm />
        </Grid>
        {isAuth !== true ? (
          <Redirect to="/login"></Redirect>
        ) : (
          <Redirect to="/main"></Redirect>
        )}
      </Grid>
    </Box>
  );
}

export default LogInPage;
