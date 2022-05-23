import { Grid, GridItem, Box } from "@chakra-ui/react";
import { memo, useCallback, useEffect } from "react";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../Comments/Comment";
import { getComments, getMoreComments } from "../../actions/commentActions";
import LoadMore from "../InfinityScroll/LoadMore";
import { useTranslation } from "react-i18next";

function Comments({ idPost }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const commentsForPost =
    useSelector((state) => state.comments.comments[idPost]) || [];
  const me = useSelector((state) => state.me.me);

  const isLoading = useSelector((state) => state.comments.isFetching);
  const isMoreComments = useSelector((state) => state.comments.isMoreComments);

  const lastCommentId = commentsForPost[commentsForPost.length - 1]?.id || 0;

  const onClickLoadMore = useCallback(() => {
    if (commentsForPost?.length > 0) {
      dispatch(getMoreComments(idPost, lastCommentId));
    }
  }, [idPost, dispatch, lastCommentId, commentsForPost?.length]);

  useEffect(() => {
    dispatch(getComments(idPost));
  }, [dispatch, idPost]);

  return (
    <>
      {commentsForPost.length > 0 ? (
        <Grid templateColumns="repeat(3, 40%,20%,40%)">
          {commentsForPost.map(({ id, user, date, comment }) =>
            me.id === user.id ? (
              <GridItem colStart={["1", "2"]} colEnd={["3", "4"]} key={id}>
                <Comment
                  user={me}
                  date={date}
                  comment={comment}
                  bgColor="mediumslateblue"
                  link="/me"
                  closeButton={true}
                  idPost={idPost}
                  idComment={id}
                />
              </GridItem>
            ) : (
              <GridItem colStart="1" colEnd="3" key={id}>
                <Comment
                  user={user}
                  date={date}
                  comment={comment}
                  bgColor="gray.400"
                  link={`/user/${user.id}`}
                  closeButton={false}
                  idPost={idPost}
                  idComment={id}
                />
              </GridItem>
            )
          )}
          <LoadMore
            isMore={isMoreComments}
            isLoading={isLoading}
            onClickLoadMore={onClickLoadMore}
            loadMoreText={t("loadMoreComments")}
            noMoreText={t("noMoreComments")}
          />
        </Grid>
      ) : (
        <Box h="150px">
          <LoadingSpinner isLoading={isLoading} />
        </Box>
      )}
    </>
  );
}

export default memo(Comments);
