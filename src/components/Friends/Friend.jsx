import {
    Text,
    Flex,
    Avatar,
    WrapItem,
    CloseButton,
    Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../config/baseUrl";
import { unStyledButton } from "../../styles/Buttons/unStyledButton";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import AlertToConfirmation from "../Alert/AlertToConfirmation";
import { useDispatch } from "react-redux";
import { unAcceptFriendInvitation } from "../../actions/meActions";

function Friend({ id, nameFirst, nameLast, avatar }) {
    const { t } = useTranslation();
    const languageValues = {
        delFriend: t("delFriend"),
        alertDelFriend: t("alertDelFriend"),
    };

    const [isOpen, setIsOpen] = useState(false);
    const onCloseAlert = () => setIsOpen(false);
    const cancelRef = useRef();

    const dispatch = useDispatch();

    const ignore = () => {
        onCloseAlert();
        return dispatch(unAcceptFriendInvitation(id));
    };

    return (
        <WrapItem key={id}>
            <Flex direction="column" align="center" justify="center">
                <Flex justify="right" width="150px">
                    <CloseButton
                        {...unStyledButton}
                        onClick={() => setIsOpen(true)}
                    />
                </Flex>
                <Link to={`/user/${id}`}>
                    <Avatar
                        boxSize="80px"
                        src={avatar && baseUrl + avatar}
                        bg="transparent"
                    />
                </Link>
                <Box width="150px">
                    <Link to={`/user/${id}`}>
                        <Text textAlign="center" mt="1">
                            {nameFirst} {nameLast}
                        </Text>
                    </Link>
                </Box>
            </Flex>
            <AlertToConfirmation
                isOpen={isOpen}
                onCloseAlert={onCloseAlert}
                fun={ignore}
                cancelRef={cancelRef}
                header={languageValues.delFriend}
                body={languageValues.alertDelFriend}
            />
        </WrapItem>
    );
}

export default Friend;
