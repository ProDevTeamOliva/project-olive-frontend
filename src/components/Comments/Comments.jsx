import { Grid, GridItem, Box } from "@chakra-ui/react";
import { memo } from "react";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { useSelector } from "react-redux";
import Comment from "../Comments/Comment";

function Comments({ idPost }) {
  const commentsForPost =
    useSelector((state) => state.comments.comments[idPost]) || [];

  const me = useSelector((state) => state.me.me);

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
        </Grid>
      ) : (
        <Box h="150px">
          <LoadingSpinner />
        </Box>
      )}
    </>
  );
}

export default memo(Comments);
