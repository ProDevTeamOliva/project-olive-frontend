import {
    Drawer,
    DrawerContent,
    DrawerOverlay,
    DrawerHeader,
    DrawerBody,
    DrawerCloseButton,
    Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { unStyledButton } from "../../styles/Buttons/unStyledButton";
import Notification from "./Notification";
import { memo } from "react";

function Notifications({ onClose, isOpen }) {
    const { t } = useTranslation();
    const languageValues = {
        notifications: t("notifications"),
        noResults: t("noResults"),
    };

    const pendingReceived = useSelector(
        state => state.meFriends.pendingReceived
    );

    return (
        <>
            <Drawer onClose={onClose} isOpen={isOpen} size={["xs"]}>
                <DrawerOverlay p="0px" />
                <DrawerContent bg="blue.700">
                    <DrawerCloseButton color="white" {...unStyledButton} />

                    <DrawerHeader px="20px">
                        {languageValues.notifications}
                    </DrawerHeader>
                    <DrawerBody px="20px">
                        {pendingReceived.length > 0 ? (
                            pendingReceived.map(
                                ({ id, nameFirst, nameLast, avatar }) => (
                                    <Notification
                                        key={id}
                                        id={id}
                                        nameFirst={nameFirst}
                                        nameLast={nameLast}
                                        avatar={avatar}
                                    />
                                )
                            )
                        ) : (
                            <Text
                                textAlign="center"
                                color="gray.400"
                                fontSize="30px">
                                {languageValues.noResults}
                            </Text>
                        )}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default memo(Notifications);
