import { Button, GridItem, Box, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dislikePost, likePost } from "../../../actions/postActions";
import Carousel from "../../Images/CarouselViewPost.jsx";
import AddCommentModal from "../AddComment/AddCommentModal";
import AuthorPostSection from "./AuthorPostSection";
import Content from "./Content";
import Tags from "./Tags";
import Like from "./Like";

function Post({ id }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const languageValues = useMemo(
    () => ({
      iDisLikeIt: t("iDisLikeIt"),
      iLikeIt: t("iLikeIt"),
      likes: t("likes"),
      meLikingPost: t("meLikingPost"),
      postBottomCommentBoxTitle: t("postBottomCommentBoxTitle"),
    }),
    [t]
  );

  const me = useSelector((state) => state.me);
  const property = useSelector((state) =>
    state.posts.find((post) => post.id === id)
  );

  const handleLikeButtonClick = useCallback(() => {
    dispatch(likePost(property.id));
  }, [property.id, dispatch]);
  const handleDisLikeButtonClick = useCallback(() => {
    dispatch(dislikePost(property.id));
  }, [property.id, dispatch]);

  const isLikedByMe =
    property.likes.filter((like) => like.login === me.me.login).length > 0;

  const renderLikeDislikeButton = useCallback(() => {
    if (isLikedByMe) {
      return (
        <Button
          padding="2"
          onClick={handleDisLikeButtonClick}
          _focus={{ border: "none" }}
        >
          {languageValues.iDisLikeIt}
        </Button>
      );
    }
    return (
      <Button
        padding="2"
        onClick={handleLikeButtonClick}
        _focus={{ border: "none" }}
      >
        {languageValues.iLikeIt}
      </Button>
    );
  }, [
    handleLikeButtonClick,
    handleDisLikeButtonClick,
    isLikedByMe,
    languageValues,
  ]);

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
        mb="50px"
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

        <Flex flexWrap="wrap" justifyContent="space-between">
          <Box padding="2">
            <Like
              isLikedByMe={isLikedByMe}
              languageValues={languageValues}
              likes={property.likes.length}
            />
          </Box>
          {/* {renderLikeDislikeButton()} */}
          <Box padding="2">{languageValues.postBottomCommentBoxTitle}</Box>

          <AddCommentModal idPost={property.id} />
        </Flex>
      </Box>
    </GridItem>
  );
}

export default memo(Post);
