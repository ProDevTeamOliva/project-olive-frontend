import { InfoIcon } from "@chakra-ui/icons";
import { Button, Center, Text } from "@chakra-ui/react";
import { memo } from "react";
import LoadingSpinner from "../Spinner/LoadingSpinner";

const LoadMore = ({
  isMore,
  isLoading,
  onClickLoadMore,
  loadMoreText,
  noMoreText,
}) => {
  if (isMore && !isLoading) {
    return <Button onClick={onClickLoadMore}>{loadMoreText}</Button>;
  }
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (!isMore) {
    return (
      <Center>
        <InfoIcon />
        <Text padding={"3"}>{noMoreText}</Text>
      </Center>
    );
  }
  return null;
};

export default memo(LoadMore);
