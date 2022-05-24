import { Box, Grid } from "@chakra-ui/react";
import { memo } from "react";
import AddPostModal from "../PostForm/AddPostModal";
import SearchModal from "../Search/SearchModal";

function MidSection() {
  return (
    <Grid
      w={["300px", "400px", "600px", "800px", "950px"]}
      m="50px 25px 25px 25px"
      templateColumns="1fr 50px"
      justifyItems="end"
    >
      <AddPostModal />
      <Box>
        <SearchModal kindOfSearch="tag" />
      </Box>
    </Grid>
  );
}
export default memo(MidSection);
