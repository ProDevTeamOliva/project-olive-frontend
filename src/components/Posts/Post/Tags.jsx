import { HStack, Tag } from "@chakra-ui/react";
import { memo } from "react";
import { Link } from "react-router-dom";

const customCompareMemoTags = (prevstate, nextstate) => {
    if (prevstate.tags.length !== nextstate.tags.length) {
        return false;
    }
    if (nextstate.tags.length < 1) {
        return true;
    }
    for (let i in prevstate.tags) {
        if (prevstate.tags[i] !== nextstate.tags[i]) {
            return false;
        }
    }
    return true;
};

function Tags({ tags }) {
    return (
        <HStack>
            {tags &&
                tags.map((tag, index) => (
                    <Link to={`/posts/${tag}`} key={index}>
                        <Tag
                            size="md"
                            variant="solid"
                            bgColor="mediumslateblue"
                            _hover={{
                                backgroundColor: "slateblue",
                            }}>
                            {tag}
                        </Tag>
                    </Link>
                ))}
        </HStack>
    );
}

export default memo(Tags, customCompareMemoTags);
