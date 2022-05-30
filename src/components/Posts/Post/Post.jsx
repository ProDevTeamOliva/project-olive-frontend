import { Button, GridItem, Box, Flex, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { memo, useCallback, useMemo, useRef, useState } from "react";
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
import { unStyledButton } from "../../../styles/Buttons/unStyledButton";
import { BsXLg } from "react-icons/bs";
import AlertToConfirmation from "../../Alert/AlertToConfirmation";

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

    const removePost = () => {
        onCloseAlert();
        return dispatch(deletePost(id));
    };

    const me = useSelector(state => state.me.me);
    const property = useSelector(
        state =>
            state.mePosts.posts.find(post => post.id === id) ||
            state.posts.posts.find(post => post.id === id) ||
            state.postsFiltered.posts.find(post => post.id === id)
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

    const renderLikeDislikeButton = useCallback(() => {
        if (property.likesMe) {
            return (
                <Button
                    padding="2"
                    onClick={handleDisLikeButtonClick}
                    _focus={{ border: "none" }}>
                    {languageValues.iDisLikeIt}
                </Button>
            );
        }
        return (
            <Button
                padding="2"
                onClick={handleLikeButtonClick}
                _focus={{ border: "none" }}>
                {languageValues.iLikeIt}
            </Button>
        );
    }, [
        handleLikeButtonClick,
        handleDisLikeButtonClick,
        property.likesMe,
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
                mb="50px">
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
                            mt="10px">
                            <BsXLg m="0px" p="0px"></BsXLg>
                        </Button>
                    </Box>
                ) : (
                    <></>
                )}

                <Box px={["3", "6"]} pb="6">
                    {me.id === property.user.id ? (
                        <AuthorPostSection
                            avatar={me.avatar}
                            id={id}
                            type={property.type.toLowerCase()}
                            nameFirst={me.nameFirst}
                            nameLast={me.nameLast}
                            link="/me"
                        />
                    ) : (
                        <AuthorPostSection
                            avatar={property.user.avatar}
                            id={id}
                            type={property.type.toLowerCase()}
                            nameFirst={property.user.nameFirst}
                            nameLast={property.user.nameLast}
                            link={`/user/${property.user.id}`}
                        />
                    )}

                    <Content content={property.content} />
                    <Tags tags={property.tags} />
                </Box>

                {property.pictures && property.pictures.length > 0 && (
                    <Carousel cards={property.pictures} />
                )}

                <Flex flexWrap="wrap" justifyContent="space-between">
                    <Box padding="2">
                        <Like
                            isLikedByMe={property.likesMe}
                            languageValues={languageValues}
                            likes={property.likes}
                        />
                    </Box>
                    {renderLikeDislikeButton()}
                    <Box onClick={onOpen} padding="2" cursor="pointer">
                        {languageValues.postBottomCommentBoxTitle}
                        {" " + property.comments}
                    </Box>
                    <AddCommentModal
                        idPost={id}
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                    />
                </Flex>
            </Box>
            <AlertToConfirmation
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
