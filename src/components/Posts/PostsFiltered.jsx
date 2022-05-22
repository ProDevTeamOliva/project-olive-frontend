import { Grid } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import Post from "../Posts/Post/Post";
import { memo, useCallback, useEffect } from "react";
import { getMorePostsByTag, getPostsByTag } from "../../actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { useTranslation } from "react-i18next";
import LoadMore from "../InfinityScroll/LoadMore";

function PostsFiltered({ tag, changeLanguage }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const postsIds = useSelector((state) =>
    state.postsFiltered.posts.map((post) => post.id)
  );
  const isMorePosts = useSelector((state) => state.postsFiltered.isMorePosts);
  const isLoading = useSelector((state) => state.postsFiltered.isFetching);

  const onClickLoadMore = useCallback(() => {
    if (postsIds?.length > 0) {
      dispatch(getMorePostsByTag(tag, postsIds[postsIds.length - 1]));
    }
  }, [dispatch, postsIds, tag]);

  useEffect(() => {
    dispatch(getPostsByTag(tag));
  }, [dispatch]);

  return (
    <Grid mt="150px" justifyContent="center">
      <Navbar changeLanguage={changeLanguage} />
      <Grid m="25px" gap={8}>
        {postsIds.length > 0 ? (
          <>
            {postsIds.map((postId) => (
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
          <LoadingSpinner />
        )}
      </Grid>
    </Grid>
  );
}

export default memo(PostsFiltered);
