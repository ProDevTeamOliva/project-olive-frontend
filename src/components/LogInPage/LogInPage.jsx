import { Container, Grid, GridItem } from "@chakra-ui/react";
import Logo from "../Logo/Logo.jsx";

function LogInPage() {
  return (
    <Container w="100vw" h="100vh">
      <Grid templateColumns="repeat(1,100vw)" templateRows="repeat(10,10vh)">
        <GridItem rowSpan={3}>
          <Logo></Logo>
        </GridItem>
        <GridItem rowSpan={7}>{/* Form login */}</GridItem>
      </Grid>
    </Container>
  );
}

export default LogInPage;
