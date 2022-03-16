import { Avatar } from "@chakra-ui/react";
import { memo } from "react";
import { baseUrl } from "../../../config/baseUrl";

const AvatarUser = (props) => {
  console.log("Załadowano Awatara");
  return (
    <Avatar
      boxSize={["50", "70px", "100px"]}
      src={baseUrl + props.avatar}
      alt={props.id}
    />
  );
};
export default memo(AvatarUser);
