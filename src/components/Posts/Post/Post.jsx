import {
  Box,
  Image,
  Button,
  Text,
  HStack,
  Tag,
  GridItem,
} from "@chakra-ui/react";
import publicPostIcon from "../../../img/icons/PublicPostIcon.png";
import FriendsPostIcon from "../../../img/icons/FriendsPostIcon.png";
import GroupChatPostIcon from "../../../img/icons/GroupChatPostIcon.png";
import { useTranslation } from "react-i18next";
import { memo, useState } from "react";
import { baseUrl } from "../../../config/baseUrl";
import { connect, useDispatch, useSelector } from "react-redux";
import { dislikePost, likePost } from "../../../actions/postActions";
import Carousel from "../../Carousel/Carousel";
import { Link } from "react-router-dom";
import AddCommentModal from "../AddComment/AddCommentModal";
import AvatarUser from "./Avatar";
import AuthorPostSection from "./AuthorPostSection";
import Content from "./Content";
import Feeling from "./Feeling";
import Tags from "./Tags";

const getPostTypeIcon = (postType) => {
  if (postType === "Public") {
    return publicPostIcon;
  }
  if (postType === "Friends") {
    return FriendsPostIcon;
  }
  if (postType === "Group") {
    return GroupChatPostIcon;
  }
  return null;
};

const Post = ({ id }) => {
  console.log("Wszedlem w post");

  const me = useSelector((state) => state.me);
  const property = useSelector((state) =>
    state.posts.find((post) => post.id === id)
  );

  const { t } = useTranslation();

  const handleLikeButtonClick = () => {
    likePost(property.id);
  };
  const handleDisLikeButtonClick = () => {
    dislikePost(property.id);
  };

  const checkIfILikePost = () => {
    const res = property.likes.filter((like) => like.login === me.me.login);
    if (res.length > 0) {
      return true;
    }
    return false;
  };

  const renderLikeDislikeButton = () => {
    if (checkIfILikePost()) {
      return (
        <Button padding="2" onClick={handleDisLikeButtonClick}>
          {t("iDisLikeIt")}
        </Button>
      );
    }
    return (
      <Button padding="2" onClick={handleLikeButtonClick}>
        {t("iLikeIt")}
      </Button>
    );
  };

  return (
    <GridItem>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bgColor="rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(50px)"
        className="blur"
        w={["300px", "400px", "600px", "800px", "950px"]}
        mb="2"
      >
        <Box p="6">
          <AuthorPostSection
            avatar={property.user.avatar}
            id={id}
            type={property.type}
            nameFirst={property.user.nameFirst}
            nameLast={property.user.nameLast}
          />
          <Content content={property.content} />
          <Feeling feeling={property.feeling ?? ""} />
          <Tags tags={property.tags} />
        </Box>

        {property.pictures && property.pictures.length > 0 && (
          <Carousel cards={property.pictures} />
        )}

        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
          <Box padding="2">
            {t("likes")} {property.likes.length}{" "}
            {checkIfILikePost() && t("meLikingPost")}
          </Box>
          {renderLikeDislikeButton()}
          <Box padding="2">{t("postBottomCommentBoxTitle")}</Box>

          <AddCommentModal idPost={property.id} />
        </Box>
      </Box>
    </GridItem>
  );
};

// const mapDispatchToProps = (dispatch) => ({
//   likePost: (id) => dispatch(likePost(id)),
//   dislikePost: (id) => dispatch(dislikePost(id)),
// });

// export default connect(null, mapDispatchToProps)(memo(Post));
export default memo(Post);
