import { Box, useRadio } from "@chakra-ui/react";
function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props);
    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
        <Box as="label">
            <input {...input} />
            <Box
                {...checkbox}
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                _checked={{
                    bg: "mediumslateblue",
                    color: "white",
                    borderColor: "mediumslateblue",
                }}
                _focus={{
                    boxShadow: "none",
                }}
                px={5}
                py={3}>
                {props.children}
            </Box>
        </Box>
    );
}
export default RadioCard;
