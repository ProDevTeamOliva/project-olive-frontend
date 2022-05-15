import { Avatar } from "@chakra-ui/react";
import { memo } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../config/baseUrl";

function AvatarUser(props) {
  return (
    <Link to={props.link}>
      <Avatar
        boxSize={["50", "70px", "100px"]}
        src={baseUrl + props.avatar}
        alt={props.id}
        mt="30px"
      />
    </Link>
  );
}
export default memo(AvatarUser);
