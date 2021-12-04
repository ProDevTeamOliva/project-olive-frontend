import { Box, Grid } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import Post from "../Posts/Post";
function MainPage() {
  return (
    <Box h="100vh" mt="75px" d="grid" justifyContent="center">
      <Navbar />
      <Grid m="25px" gap={5}>
      {/* <Grid templateColumns="minmax(200px, 500px)" gap={5} m="25px"> */}
        <Post/>
      </Grid>
    </Box>
  );
}

export default MainPage;
