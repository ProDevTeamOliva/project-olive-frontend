import {
    Text,
    HStack,
    Avatar,
    Box,
    Button,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import { memo, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../config/baseUrl";
import { parseDate } from "../../operations/parseDate";
import { BsXLg } from "react-icons/bs";
// https://github.com/twbs/icons
import { unStyledButton } from "../../styles/Buttons/unStyledButton";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../actions/commentActions";
import AlertToConfirmation from "../Alert/AlertToConfirmation";
import { useTranslation } from "react-i18next";

function Comment({
    comment,
    user,
    date,
    bgColor,
    link,
    closeButton,
    idPost,
    idComment,
}) {
    const { t } = useTranslation();
    const languageValues = useMemo(
        () => ({
            deletingComment: t("deletingComment"),
            alertDeleteComment: t("alertDeleteComment"),
        }),
        [t]
    );

    const [hiddenContent, setHiddenContent] = useState(true);
    const dispatch = useDispatch();

    const removeComment = () => {
        onCloseAlert();
        return dispatch(deleteComment(idPost, { id: idComment }));
    };

    const [isOpen, setIsOpen] = useState(false);
    const onCloseAlert = () => setIsOpen(false);
    const cancelRef = useRef();
    return (
        <>
            <Box
                bgColor={bgColor}
                borderRadius="15px 15px 0px 15px"
                mt="10px"
                px="8px"
                py="6px">
                <Grid templateColumns="95% 5%">
                    <GridItem colStart="1" colEnd="2">
                        <HStack align="left" color="black">
                            <Link to={link}>
                                <Avatar
                                    src={baseUrl + user.avatar}
                                    bg="transparent"
                                />
                            </Link>
                            <Box>
                                <Link to={link}>
                                    <Text
                                        fontWeight="500"
                                        _hover={{
                                            fontWeight: "700",
                                            color: "gray.900",
                                        }}>
                                        {user.nameFirst} {user.nameLast}
                                    </Text>
                                </Link>
                                <Text
                                    maxW="250px"
                                    as="h4"
                                    isTruncated={hiddenContent}
                                    onClick={() =>
                                        setHiddenContent(state => !state)
                                    }>
                                    {comment}
                                </Text>
                            </Box>
                        </HStack>
                    </GridItem>
                    <GridItem colStart="2" colEnd="3">
                        {closeButton ? (
                            <Button
                                mb="20px"
                                variant="unstyled"
                                fontSize="15px"
                                {...unStyledButton}
                                onClick={() => setIsOpen(true)}
                                align="end"
                                w="10px"
                                h="10px">
                                <BsXLg m="0px" p="0px"></BsXLg>
                            </Button>
                        ) : (
                            <></>
                        )}
                    </GridItem>
                </Grid>
            </Box>
            <Text align="end" mr="10px" fontSize="11px">
                {parseDate(date)}
            </Text>
            <AlertToConfirmation
                isOpen={isOpen}
                onCloseAlert={onCloseAlert}
                fun={removeComment}
                cancelRef={cancelRef}
                header={languageValues.deletingComment}
                body={languageValues.alertDeleteComment}
            />
        </>
    );
}

export default memo(Comment);
