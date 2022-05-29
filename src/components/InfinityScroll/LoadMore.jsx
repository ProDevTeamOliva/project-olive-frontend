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
        return (
            <Button mb="20px" onClick={onClickLoadMore}>
                {loadMoreText}
            </Button>
        );
    }
    if (isLoading) {
        return <LoadingSpinner isLoading={isLoading} />;
    }
    if (!isMore) {
        return (
            <Center mb="20px">
                <InfoIcon />
                <Text px={"3"}>{noMoreText}</Text>
            </Center>
        );
    }
    return null;
};

export default memo(LoadMore);
