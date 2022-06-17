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
    inverse = false,
}) => {
    if (isMore && !isLoading) {
        return (
            <Button
                m={inverse ? "10px 10px 5px 10px" : "0 0 20px 0"}
                onClick={onClickLoadMore}>
                {loadMoreText}
            </Button>
        );
    }
    if (isLoading) {
        return <LoadingSpinner isLoading={isLoading} />;
    }
    if (!isMore) {
        return (
            <Center m={inverse ? "10px 10px 5px 10px" : "0 0 20px 0"}>
                <InfoIcon />
                <Text px="3">{noMoreText}</Text>
            </Center>
        );
    }
    return null;
};

export default memo(LoadMore);
