import { Box, Grid } from "@chakra-ui/react";
import { memo } from "react";
import AddPostModal from "../PostForm/AddPostModal";
import SearchModal from "../Search/SearchModal";

function MidSection() {
  return (
    <Grid mt="50px" mb="20px" templateColumns="50% 40% 10%">
      <AddPostModal />
      <Box gridColumn="3/4" gridRow="1" align="left" ml="10px">
        <SearchModal kindOfSearch="tag" />
      </Box>
    </Grid>
  );
}
export default memo(MidSection);
