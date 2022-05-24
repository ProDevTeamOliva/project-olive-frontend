import { Avatar } from "@chakra-ui/react";
import { memo } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../config/baseUrl";

function AvatarUser({ link, avatar, id }) {
  return (
    <Link to={link}>
      <Avatar boxSize="100%" src={avatar && baseUrl + avatar} alt={id} />
    </Link>
  );
}
export default memo(AvatarUser);
