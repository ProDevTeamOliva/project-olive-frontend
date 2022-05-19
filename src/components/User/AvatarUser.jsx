import { Avatar } from "@chakra-ui/react";
import { memo } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../config/baseUrl";

function AvatarUser({ link, avatar, id }) {
  return (
    <Link to={link}>
      <Avatar
        boxSize={["50", "70px", "100px"]}
        src={avatar && baseUrl + avatar}
        alt={id}
        mt="30px"
      />
    </Link>
  );
}
export default memo(AvatarUser);
