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
import { useState, useEffect, useRef, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getError, getLoading, getPayloadSearch } from "./selectors";
import {
    restartSearch,
    searchUsers,
    searchTags,
} from "../../actions/searchActions";
import { defaultConfig } from "./defaultConfig";
import { getLinkForTag, getLinkForUser } from "./Links";
import { useTranslation } from "react-i18next";

function SearchBar({ kindOfSearch }) {
    const { t } = useTranslation();

    const languageValues = {
        findPerson: t("findPerson"),
        loading: t("loading"),
        problemSearch: t("problemSearch"),
        noResults: t("noResults"),
    };

    const dispatch = useDispatch();
    const getUsers = data => dispatch(searchUsers(data));
    const getTags = data => dispatch(searchTags(data));
    const clearSuggestions = () => dispatch(restartSearch());

    const loading = useSelector(getLoading);
    const error = useSelector(getError);
    const suggestions = useSelector(getPayloadSearch);

    const config = {
        personV1: {
            open: false,
            ml: "75px",
            top: "105px",
            display: ["none", "none", "none", "block"],
            widthResult: ["0vw", "0vw", "0vw", "34vw", "29vw", "21vw"],
            widthInput: ["0vw", "0vw", "0vw", "35vw", "30vw", "22vw"],
            placeholder: languageValues.findPerson,
            getPayload: getUsers,
            getLink: getLinkForUser,
        },
        tag: {
            ...defaultConfig,
            placeholder: "# tag",
            getPayload: getTags,
            getLink: getLinkForTag,
        },
        personV2: {
            ...defaultConfig,
            placeholder: languageValues.findPerson,
            getPayload: getUsers,
            getLink: getLinkForUser,
        },
    };

    const [isOpen, setIsOpen] = useState(config[kindOfSearch].open);
    const [inputValue, setInputValue] = useState("");
    const [timer, setTimer] = useState(null);
    const searchBarRef = useRef(null);

    const toggle = () => {
        if (inputValue.length > 1) {
            clearSuggestions();
            config[kindOfSearch].getPayload({ valueSearch: inputValue });
        }
        return setIsOpen(true);
    };

    const mouseClickCloseSearch = useCallback(event => {
        if (
            searchBarRef.current &&
            !searchBarRef.current.contains(event.target)
        ) {
            return setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        const moves = ["click", "touchstart"];
        moves.forEach(move =>
            document.addEventListener(move, mouseClickCloseSearch)
        );
        return () => {
            moves.forEach(move =>
                document.removeEventListener(move, mouseClickCloseSearch)
            );
        };
    }, [mouseClickCloseSearch]);

    const inputChanged = e => {
        setInputValue(e.target.value);
        clearTimeout(timer);
        setIsOpen(true);
        const newTimer = setTimeout(() => {
            if (e.target.value.length >= 2) {
                clearSuggestions();
                config[kindOfSearch].getPayload({
                    valueSearch: e.target.value,
                });
            }
        }, 500);
        setTimer(newTimer);
    };

    const getResultsToRender = () => {
        if (inputValue.length >= 2 && !loading && suggestions.length > 0) {
            return suggestions.map((props, index) => {
                return config[kindOfSearch].getLink(props, index)(setIsOpen);
            });
        }
        if (loading) {
            return (
                <ListItem
                    p="3"
                    borderBottom="2px solid light-white"
                    fontFamily="Ubuntu"
                    color="black">
                    <Spinner />
                    &nbsp;&nbsp;
                    <span>{languageValues.loading}</span>
                </ListItem>
            );
        }
        if (error) {
            return (
                <ListItem
                    p="3"
                    borderBottom="2px solid light-white"
                    fontFamily="Ubuntu"
                    color="black">
                    {languageValues.problemSearch}
                </ListItem>
            );
        }
        return (
            <ListItem
                p="3"
                borderBottom="2px solid light-white"
                fontFamily="Ubuntu"
                color="black">
                {languageValues.noResults}
            </ListItem>
        );
    };

    const renderSuggestions = () => (
        <List
            bg="white"
            border={"1px solid rgba(66, 153, 225, 0.6)"}
            borderRadius={["25px", "30px", "35px", "60px"]}
            px={["10px", "30px", "40px", "50px"]}
            py={["10px", "15px", "20px", "25px"]}
            bgGradient="linear(to-tl, #ffffff, #7b68ee)">
            {getResultsToRender()}
        </List>
    );

    const isBottomOpen = isOpen && inputValue.length >= 2;

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
            display={config[kindOfSearch].display}
            ref={searchBarRef}>
            <Center ml={config[kindOfSearch].ml}>
                <InputGroup
                    ref={searchBarRef}
                    className={isOpen ? "m-menu -active" : "m-menu "}
                    justifySelf="center"
                    left="0"
                    right="0"
                    ml="auto"
                    mr="auto"
                    w={config[kindOfSearch].widthInput}
                    autoComplete="off">
                    <InputLeftElement
                        pointerEvents="none"
                        justifyContent="center"
                        autoComplete="off">
                        <Icon as={Search2Icon} w="4" h="10" gridRow="1/2" />
                    </InputLeftElement>
                    <Input
                        id="mainInput"
                        onClick={toggle}
                        placeholder={config[kindOfSearch].placeholder}
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
                top={config[kindOfSearch].top}
                left="0"
                right="0"
                ml="auto"
                mr="auto"
                display={config[kindOfSearch].display}
                w={config[kindOfSearch].widthResult}>
                {isBottomOpen && renderSuggestions()}
            </Center>
        </Box>
    );
}

export default memo(SearchBar);
