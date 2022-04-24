import { Box, Button, GridItem } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { useSelector } from "react-redux";
import { dislikePost, likePost } from "../../../actions/postActions";
import Carousel from "../../Images/CarouselViewPost.jsx";
import AddCommentModal from "../AddComment/AddCommentModal";
import AuthorPostSection from "./AuthorPostSection";
import Content from "./Content";
import Tags from "./Tags";

function Post({ id }) {
  const { t } = useTranslation();
  const languageValues = {
    iDisLikeIt: t("iDisLikeIt"),
    iLikeIt: t("iLikeIt"),
    likes: t("likes"),
    meLikingPost: t("meLikingPost"),
    postBottomCommentBoxTitle: t("postBottomCommentBoxTitle"),
  };

  const me = useSelector((state) => state.me);
  const property = useSelector((state) =>
    state.posts.find((post) => post.id === id)
  );

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
          {languageValues.iDisLikeIt}
        </Button>
      );
    }
    return (
      <Button padding="2" onClick={handleLikeButtonClick}>
        {languageValues.iLikeIt}
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
            type={property.type.toLowerCase()}
            nameFirst={property.user.nameFirst}
            nameLast={property.user.nameLast}
          />
          <Content content={property.content} />
          {/* <Feeling feeling={property.feeling ?? ""} /> */}
          <Tags tags={property.tags} />
        </Box>

        {property.pictures && property.pictures.length > 0 && (
          <Carousel cards={property.pictures} />
        )}

        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
          <Box padding="2">
            {languageValues.likes} {property.likes.length}{" "}
            {checkIfILikePost() && languageValues.meLikingPost}
          </Box>
          {renderLikeDislikeButton()}
          <Box padding="2">{languageValues.postBottomCommentBoxTitle}</Box>

          <AddCommentModal idPost={property.id} />
        </Box>
      </Box>
    </GridItem>
  );
}

export default memo(Post);
