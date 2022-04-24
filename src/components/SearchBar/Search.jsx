import { Input, InputLeftElement } from "@chakra-ui/input";
import {
  InputGroup,
  Box,
  Center,
  List,
  ListItem,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useState, useEffect, useRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import listenForOutsideClick from "./listen-for-outside-clicks";
import { getError, getLoading, getUsers } from "./selectors";
import { restartSearchUsers, searchUsers } from "../../actions/searchActions";
import { baseUrl } from "../../config/baseUrl";
import LinkSearch from "../Search/LinkSearch";

function SearchBar() {
  const dispatch = useDispatch();

  const history = useHistory();

  const searchBarRef = useRef(null);

  const [currentSelect, setCurrentSelect] = useState(0);
  const [listening, setListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [timer, setTimer] = useState(null);

  const loading = useSelector(getLoading);
  const error = useSelector(getError);
  const suggestions = useSelector(getUsers);

  const getSuggestions = (data) => dispatch(searchUsers(data));
  const clearSuggestions = () => dispatch(restartSearchUsers());

  const toggle = () => setIsOpen(true);

  useEffect(
    () =>
      listenForOutsideClick(listening, setListening, searchBarRef, setIsOpen),
    [listening]
  );

  const handleSuggestionClick = (elem) => {
    setInputValue("");
    history.push(`/user/${elem.id}`);
  };

  const inputChanged = (e) => {
    setInputValue(e.target.value);
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      if (inputValue.length > 1) {
        clearSuggestions();
        getSuggestions({ valueSearch: e.target.value });
      }
    }, 500);

    setTimer(newTimer);
  };
  const getResultsToRender = () => {
    if (inputValue.length > 2 && !loading && suggestions.length > 0) {
      return suggestions.map(({ id, nameFirst, nameLast, avatar }) => {
        return (
          <LinkSearch
            key={id}
            id={id}
            nameFirst={nameFirst}
            nameLast={nameLast}
            avatar={baseUrl + avatar}
            onClose={() => setIsOpen(false)}
          />
        );
      });
    }
    if (loading) {
      return (
        <ListItem
          p={3}
          borderBottom={"2px solid light-white"}
          fontFamily="Ubuntu"
          color={"black"}
        >
          <Spinner />
          &nbsp;&nbsp;
          <span>Ładowanie ...</span>
        </ListItem>
      );
    }
    if (error) {
      return (
        <ListItem
          p={3}
          borderBottom={"2px solid light-white"}
          fontFamily="Ubuntu"
          color={"black"}
        >
          Wystąpił problem, spróbuj ponownie
        </ListItem>
      );
    }
    return (
      <ListItem
        p={3}
        borderBottom={"2px solid light-white"}
        fontFamily="Ubuntu"
        color={"black"}
      >
        Brak Wyników
      </ListItem>
    );
  };

  const renderSuggestions = () => (
    <List
      bg="white"
      border={"1px solid rgba(66, 153, 225, 0.6)"}
      borderRadius={{ sm: "35px", md: "40px", lg: "50px", xl: "60px" }}
      p={{
        sm: "10px 10px 10px 10px",
        md: "15px 30px 15px 30px",
        lg: "20px 40px 20px 40px",
        xl: "25px 50px 25px 50px",
      }}
      bgGradient="linear(to-tl, #ffffff, #7b68ee)"
    >
      {getResultsToRender()}
    </List>
  );

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      setIsOpen(false);
      suggestions.length > 0 &&
        handleSuggestionClick(suggestions[currentSelect]);
    }
  };

  const isBottomOpen = isOpen && inputValue.length > 2;

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
    }
    if (
      event.key === "ArrowDown" &&
      suggestions.length > 0 &&
      suggestions.length > currentSelect + 1
    ) {
      setCurrentSelect(currentSelect + 1);
    }
    if (
      event.key === "ArrowUp" &&
      suggestions.length > 0 &&
      currentSelect > 0
    ) {
      setCurrentSelect(currentSelect - 1);
    }
  };

  return (
    <Box
      gridRow="2/3"
      gridColumn="2/3"
      alignContent="start"
      justifySelf="center"
      mb="40px"
      left="0"
      right="0"
      ml="auto"
      mr="auto"
      width="100%"
      height="100%"
    >
      <Center gridRow="1" display={["none", "none", "none", "block"]} ml="75px">
        <InputGroup
          ref={searchBarRef}
          className={isOpen ? "m-menu -active" : "m-menu "}
          justifySelf="center"
          left="0"
          right="0"
          ml="auto"
          mr="auto"
          w={["0vw", "0vw", "0vw", "35vw", "22vw"]}
          autoComplete="off"
        >
          <InputLeftElement
            pointerEvents="none"
            justifyContent="center"
            autoComplete="off"
          >
            <Icon as={Search2Icon} w="4" h="10" gridRow="1/2" />
          </InputLeftElement>
          <Input
            id="mainInput"
            onKeyPress={handleKeyPressed}
            onKeyDown={handleKeyDown}
            onClick={toggle}
            placeholder={"Message or Find ..."}
            color="white"
            fontFamily="Ubuntu"
            fontWeight="300"
            border="none"
            fontSize={"2xl"}
            value={inputValue}
            onChange={inputChanged}
            borderBottom={"1px solid white"}
            bgGradient="linear(to-bl, #ffffff, #7b68ee)"
            borderRadius={"full"}
            _placeholder={{
              fontWeight: "lighter",
              fontSize: "large",
              textAlign: "left",
              paddingRight: { xl: "60px" },
              color: "black",
            }}
            position="absolute"
            width="100%"
            autoComplete="off"
          />
        </InputGroup>
      </Center>
      <Center
        position="absolute"
        top="95px"
        left="0"
        right="0"
        ml="auto"
        mr="auto"
        display={["none", "none", "none", "block"]}
        w={["0vw", "0vw", "0vw", "34vw", "21vw"]}
      >
        {isBottomOpen && renderSuggestions()}
      </Center>
    </Box>
  );
}

export default memo(SearchBar);
