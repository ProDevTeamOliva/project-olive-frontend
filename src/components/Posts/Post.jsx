import {
  Box,
  Image,
  Badge,
  Button,
  StatHelpText,
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
import AddCommentModal from "./AddCommentModal";
import { baseUrl } from "../../config/baseUrl";
import SimpleImageSlider from "react-simple-image-slider";
import { connect } from "react-redux";
import { likePost } from "../../actions/postActions";

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

const convertArrayToArrayOfObjects = (arr) => {
  let acc = [];
  arr.forEach((elem) => acc.push({ url: baseUrl + elem }));
  console.log(acc);
  return acc;
};

const Post = ({ property, likePost }) => {
  const [hiddenContent, setHiddenContent] = useState(true);

  const { t } = useTranslation();
  const handleLikeButtonClick = () => {
    likePost(property.id);
  };
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bgColor="rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(50px)"
      className="blur"
      w="70vw"
    >
      <Box p="6">
        <Box display="flex" justifyContent="space-between">
          <Badge borderRadius="full" colorScheme="teal">
            <Avatar
              boxSize="100"
              src={baseUrl + property.user.avatar}
              alt={property.user.id}
            />
          </Badge>
          <Box
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="4xl"
            textTransform="capitalization"
            ml="2"
          >
            {property.user.nameFirst} {property.user.nameLast}
          </Box>
          <Box text="right" color="gray.500">
            {getPostTypeIcon(property.type) ? (
              <Box display="flex">
                <Image
                  marginRight="10px"
                  boxSize="50"
                  src={getPostTypeIcon(property.type)}
                  borderRadius="full"
                ></Image>{" "}
                <Text fontSize="2xl">{property.type}</Text>
              </Box>
            ) : (
              property.type
            )}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          fontSize={"2xl"}
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
              property.tags.map((tag) => (
                <Tag size={"md"} variant="solid" colorScheme="teal">
                  {tag}
                </Tag>
              ))}
          </HStack>
        </Box>
      </Box>

      {/* <Image
          display="block"
          marginLeft="auto"
          marginRight="auto"
          src={property.imageUrl}
          alt={property.imageAlt}
        /> */}
      {property.pictures && property.pictures.length > 0 && (
        <SimpleImageSlider
          height={600}
          width={"100%"}
          images={convertArrayToArrayOfObjects(property.pictures)}
          showBullets={true}
          showNavs={true}
        />
      )}

      <Box display="flex" flexWrap="wrap" justifyContent="space-between">
        <Box padding="2">
          {t("likes")} {property.likes.length}
        </Box>
        <Button padding="2" onClick={handleLikeButtonClick}>
          {t("iLikeIt")}
        </Button>
        {/* Tutaj mozna odkomentowac i zobaczyc modal dodawania komentarza */}
        {/* <Box padding='2'>
                {t('postBottomCommentBoxTitle')}
            </Box>
            
            <AddCommentModal idPost={property.id}/> */}
      </Box>
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => ({
  likePost: (id) => dispatch(likePost(id)),
});

export default connect(null, mapDispatchToProps)(Post);
