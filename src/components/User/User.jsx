import {
    Box,
    Grid,
    Tab,
    Tabs,
    TabList,
    TabPanel,
    TabPanels,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Navbar from "../Navbar/Navbar";
import Post from "../Posts/Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { tabStyle } from "../../styles/Tabs/tabStyle";
import { useEffect, memo, useCallback } from "react";
import {
    getUser,
    getUserPosts,
    getUserPictures,
    getMoreUserPosts,
} from "../../actions/userActions";
import ResponsiveMasonryImages from "../Images/ResponsiveMasonryImages";
import InfoAboutUser from "./InfoAboutUser";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import LoadMore from "../InfinityScroll/LoadMore";

function User({ changeLanguage, id }) {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const languageValues = {
        posts: t("posts"),
        images: t("images"),
        loadMorePosts: t("loadMorePosts"),
        noMorePosts: t("noMorePosts"),
    };

    const isLoading = useSelector(state => state.userPictures.isFetching);
    const posts = useSelector(state => state.userPosts.posts);
    const pictures = useSelector(state => state.userPictures.pictures);
    const isMorePosts = useSelector(state => state.userPosts.isMorePosts);

    useEffect(() => {
        dispatch(getUser(id));
        dispatch(getUserPosts(id));
        dispatch(getUserPictures(id));
    }, [id, dispatch]);

    const onClickLoadMore = useCallback(() => {
        if (posts?.length > 0) {
            dispatch(getMoreUserPosts(id, posts[posts.length - 1].id));
        }
    }, [id, dispatch, posts]);

    return (
        <Grid
            h="100vh"
            mt="75px"
            justifyContent="center"
            templateColumns="minmax(200px, 1000px)">
            <Navbar changeLanguage={changeLanguage} />
            <Box p="25px">
                <InfoAboutUser id={id} />

                <Tabs variant="soft-rounded" align="center">
                    <TabList>
                        <Tab {...tabStyle}>{languageValues.posts}</Tab>
                        <Tab {...tabStyle}>{languageValues.images}</Tab>
                    </TabList>

                    <TabPanels>
                        {/* Posts */}
                        <TabPanel>
                            {posts.length > 0 ? (
                                <>
                                    {posts.map(post => (
                                        <Post
                                            property={post}
                                            key={post.id}
                                            id={post.id}
                                        />
                                    ))}
                                    <LoadMore
                                        isMore={isMorePosts}
                                        isLoading={isLoading}
                                        onClickLoadMore={onClickLoadMore}
                                        loadMoreText={
                                            languageValues.loadMorePosts
                                        }
                                        noMoreText={languageValues.noMorePosts}
                                    />
                                </>
                            ) : (
                                <LoadingSpinner isLoading={isLoading} />
                            )}
                        </TabPanel>

                        {/* Images */}
                        <TabPanel px="0" py="4">
                            <ResponsiveMasonryImages pictures={pictures} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Grid>
    );
}

export default memo(User);
