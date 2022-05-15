import { Button, GridItem, Box, Flex, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  dislikePost,
  likePost,
} from "../../../actions/postActions";
import Carousel from "../../Images/CarouselViewPost.jsx";
import AddCommentModal from "../../CommentForm/AddCommentModal";
import AuthorPostSection from "./AuthorPostSection";
import Content from "./Content";
import Tags from "./Tags";
import Like from "./Like";
import { getComments } from "../../../actions/commentActions";
import { unStyledButton } from "../../../styles/Buttons/unStyledButton";
import { BsXLg } from "react-icons/bs";
import Alert from "../../Alert/Alert";

function Post({ id }) {
  const { t } = useTranslation();
  const languageValues = useMemo(
    () => ({
      iDisLikeIt: t("iDisLikeIt"),
      iLikeIt: t("iLikeIt"),
      likes: t("likes"),
      meLikingPost: t("meLikingPost"),
      postBottomCommentBoxTitle: t("postBottomCommentBoxTitle"),
      deletingPost: t("deletingPost"),
      alertDeletePost: t("alertDeletePost"),
    }),
    [t]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComments(id));
  }, [dispatch, id]);

  const removePost = () => {
    onCloseAlert();
    return dispatch(deletePost(id));
  };

  const commentsForPost =
    useSelector((state) => state.comments.comments[id]) || [];
  const me = useSelector((state) => state.me.me);
  const property = useSelector((state) =>
    state.posts.posts.find((post) => post.id === id)
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelRef = useRef();

  const handleLikeButtonClick = useCallback(() => {
    dispatch(likePost(property?.id));
  }, [property?.id, dispatch]);
  const handleDisLikeButtonClick = useCallback(() => {
    dispatch(dislikePost(property?.id));
  }, [property?.id, dispatch]);

  const isLikedByMe =
    property?.likes.filter((like) => like.login === me.login).length > 0;

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

  if (!property) {
    return null;
  }

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
        {me.id === property.user.id ? (
          <Box align="left" justify="left">
            <Button
              variant="unstyled"
              fontSize={["15px", "20px"]}
              {...unStyledButton}
              onClick={() => setIsOpenAlert(true)}
              w="10px"
              h="10px"
              ml="15px"
              mt="10px"
            >
              <BsXLg m="0px" p="0px"></BsXLg>
            </Button>
          </Box>
        ) : (
          <></>
        )}

        <Box px={["3", "6"]} pb="6">
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
          {renderLikeDislikeButton()}
          <Box onClick={onOpen} padding="2" cursor="pointer">
            {languageValues.postBottomCommentBoxTitle}
            {" " + commentsForPost.length}
          </Box>
          <AddCommentModal
            idPost={id}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
          />
        </Flex>
      </Box>
      <Alert
        isOpen={isOpenAlert}
        onCloseAlert={onCloseAlert}
        fun={removePost}
        cancelRef={cancelRef}
        header={languageValues.deletingPost}
        body={languageValues.alertDeletePost}
      />
    </GridItem>
  );
}

export default memo(Post);
