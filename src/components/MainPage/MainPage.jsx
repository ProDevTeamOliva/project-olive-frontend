import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";

import { Grid } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import Post from "../Posts/Post/Post";
import FriendsSlider from "../FriendsSlider/FriendsSlider";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import MidSection from "./MidSection";

import { getMorePosts } from "../../actions/postActions";
import { useTranslation } from "react-i18next";
import LoadMore from "../InfinityScroll/LoadMore";

function MainPage({ changeLanguage }) {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const postsIds = useSelector(state =>
        state.posts.posts.map(post => post.id)
    );
    const isMorePosts = useSelector(state => state.posts.isMorePosts);
    const isLoading = useSelector(state => state.posts.isFetching);

    const onClickLoadMore = useCallback(() => {
        if (postsIds?.length > 0) {
            dispatch(getMorePosts(postsIds[postsIds.length - 1]));
        }
    }, [dispatch, postsIds]);

    return (
        <Grid
            h="100%"
            mt="75px"
            justifyContent="center"
            templateRows="repeat(5, 1fr)">
            <Navbar changeLanguage={changeLanguage} />
            <MidSection />
            <FriendsSlider />
            <Grid
                m="25px"
                mt="40px"
                w={["300px", "400px", "600px", "800px", "950px"]}>
                {postsIds.length > 0 ? (
                    <>
                        {postsIds.map(postId => (
                            <Post key={postId} id={postId} />
                        ))}
                        <LoadMore
                            isMore={isMorePosts}
                            isLoading={isLoading}
                            onClickLoadMore={onClickLoadMore}
                            loadMoreText={t("loadMorePosts")}
                            noMoreText={t("noMorePosts")}
                        />
                    </>
                ) : (
                    <LoadingSpinner isLoading={isLoading} />
                )}
            </Grid>
        </Grid>
    );
}

export default MainPage;
