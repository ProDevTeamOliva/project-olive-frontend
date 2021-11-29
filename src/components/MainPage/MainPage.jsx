import { Box, Grid, Image } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { baseUrl } from "../../config/baseUrl";

function MainPage() {
  const logout = async () =>
    await axios.post(`${baseUrl}/logout`, { withCredentials: true });
  return (
    <Box h="100vh" mt="75px" d="grid" justifyContent="center">
      <Navbar />
      <button onClick={logout}>logout</button>
      <Grid templateColumns="minmax(200px, 500px)" gap={5} m="25px">
        <Image
          w="100%"
          src="https://cdn.shibe.online/shibes/54e2950bdc7710f2625867582058f940e51f7117.jpg"
        />
        <Image
          w="100%"
          src="https://cdn.shibe.online/shibes/136039407689318e6ae9e8e366634ae14d8c0c96.jpg"
        />
        <Image
          w="100%"
          src="https://cdn.shibe.online/shibes/9de66f8a613c8febb9ac3ba648e3234c6c080fa8.jpg"
        />
        <Image
          w="100%"
          src="https://cdn.shibe.online/shibes/62965acf429196839ad3b5466632fd5d21d68e05.jpg"
        />
        <Image
          w="100%"
          src="https://cdn.shibe.online/shibes/8ce997fb584290059260542b7c63ae6966ccf360.jpg"
        />
        <Image
          w="100%"
          src="https://cdn.shibe.online/shibes/13aef0017a2ee4a2f67d413d6f85b448d8563c7c.jpg"
        />
      </Grid>
    </Box>
  );
}

export default MainPage;
