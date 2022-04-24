import { Avatar } from "@chakra-ui/react";
import { memo } from "react";
import { baseUrl } from "../../config/baseUrl";

function AvatarUser(props) {
  return (
    <Avatar
      boxSize={["50", "70px", "100px"]}
      src={baseUrl + props.avatar}
      alt={props.id}
      mt="30px"
    />
  );
}
export default memo(AvatarUser);
