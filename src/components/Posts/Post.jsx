import {
  Box,
  Image,
  Button,
  Avatar,
  Text,
  HStack,
  Tag,
} from "@chakra-ui/react";
import publicPostIcon from "../../img/icons/PublicPostIcon.png";
import FriendsPostIcon from "../../img/icons/FriendsPostIcon.png";
import GroupChatPostIcon from "../../img/icons/GroupChatPostIcon.png";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { baseUrl } from "../../config/baseUrl";
import { connect } from "react-redux";
import { dislikePost, likePost } from "../../actions/postActions";
import Carousel from "../Carousel/Carousel";
import { Link } from "react-router-dom";

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

const Post = ({ property, likePost, dislikePost, me }) => {
  const [hiddenContent, setHiddenContent] = useState(true);

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
        <Box display="flex" justifyContent="space-between">
          <Avatar
            boxSize={["50", "70px", "100px"]}
            src={baseUrl + property.user.avatar}
            alt={property.user.id}
          />
          <Box
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize={["xl", "xl", "3xl"]}
            textTransform="capitalization"
            mx="5"
          >
            {property.user.nameFirst} {property.user.nameLast}
          </Box>
          <Box text="right" color="gray.500">
            {getPostTypeIcon(property.type) ? (
              <Box display="flex" flexDirection="column">
                <Image
                  boxSize={["25px", "35px"]}
                  src={getPostTypeIcon(property.type)}
                  borderRadius="full"
                ></Image>
                <Text fontSize={["xs", "xs"]} textAlign="center">
                  {t(property.type)}
                </Text>
              </Box>
            ) : (
              t(property.type)
            )}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          fontSize={["xl", "2xl"]}
          lineHeight="tight"
          isTruncated={hiddenContent}
          onClick={() => setHiddenContent(!hiddenContent)}
        >
          {property.content}
        </Box>

        <Box display="grid" mt="2" alignItems="center">
          <Box color="gray.300" fontSize="sm" textShadow="sm">
            {property.feeling} (TUTAJ DOROBIĆ nastrój w poście.) 😎🤬🤢
          </Box>
          <HStack>
            {property.tags &&
              property.tags.map((tag, index) => (
                <Link to={`/posts/${tag}`} key={index}>
                  <Tag size={"md"} variant="solid" colorScheme="teal">
                    {tag}
                  </Tag>
                </Link>
              ))}
          </HStack>
        </Box>
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
        {/* <Box padding='2'>
                {t('postBottomCommentBoxTitle')}
            </Box>
            
            <AddCommentModal idPost={property.id}/> */}
      </Box>
    </Box>
  );
};
const mapStateToProps = (state) => ({
  me: state.me,
});
const mapDispatchToProps = (dispatch) => ({
  likePost: (id) => dispatch(likePost(id)),
  dislikePost: (id) => dispatch(dislikePost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
