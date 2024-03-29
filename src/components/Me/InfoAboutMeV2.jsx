import { Heading, Stack, Avatar } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../config/baseUrl";

function InfoAboutMeV2() {
    const me = useSelector(state => state.me.me);

    return (
        <Stack direction="row">
            {me.avatar === "/public/avatar_default.png" ? (
                <Avatar
                    boxSize={["70px", "100px"]}
                    src={baseUrl + me.avatar}
                    filter="auto"
                    invert="1"
                    bg="transparent"
                />
            ) : (
                <Avatar
                    boxSize={["70px", "100px"]}
                    src={baseUrl + me.avatar}
                    bg="transparent"
                />
            )}

            <Stack
                flex="1"
                flexDirection="column"
                alignItems="center"
                pt="5px"
                pr="100px">
                <Heading
                    fontSize={["xl", "2xl"]}
                    textAlign="center"
                    color="gray.800">
                    {me.nameFirst} {me.nameLast}
                </Heading>
            </Stack>
        </Stack>
    );
}

export default InfoAboutMeV2;
