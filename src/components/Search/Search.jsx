import {
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Center,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

function Search({ placeholder }) {
  return (
    <Center>
      <InputGroup w={["100%", "80%", "50%", "40%", "30%"]}>
        <Input
          variant="unstyled"
          placeholder={placeholder}
          bgColor="rgba(255, 255, 255, 0.2)"
          border="none"
          borderRadius="10px"
          p="0 30px"
          lineHeight="40px"
          _placeholder={{ color: "white" }}
          display={["none", "block"]}
        />
        <InputRightElement>
          <Icon
            as={Search2Icon}
            w={["10", "4"]}
            h="10"
            mb={["10", "0"]}
            display={["inline", "block"]}
          />
        </InputRightElement>
      </InputGroup>
    </Center>
  );
}

export default Search;
