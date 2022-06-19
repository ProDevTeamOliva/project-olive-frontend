import { Input, InputLeftElement } from "@chakra-ui/input";
import {
    InputGroup,
    Box,
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
            display: { base: "none", md: "grid" },
            widthInput: { base: "0vw", md: "36vw" },
            placeholder: languageValues.findPerson,
            getPayload: getUsers,
            getLink: getLinkForUser,
        },
        tag: {
            open: true,
            display: "grid",
            widthInput: { base: "65vw", sm: "45vw", md: "36vw" },
            placeholder: "#tag",
            getPayload: getTags,
            getLink: getLinkForTag,
        },
        personV2: {
            open: true,
            display: "grid",
            widthInput: { base: "65vw", sm: "45vw", md: "36vw" },
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
                <ListItem p="3" color="white">
                    <Spinner />
                    &nbsp;&nbsp;
                    <span>{languageValues.loading}</span>
                </ListItem>
            );
        }
        if (error) {
            return (
                <ListItem p="3" color="white">
                    {languageValues.problemSearch}
                </ListItem>
            );
        }
        return (
            <ListItem p="3" color="white">
                {languageValues.noResults}
            </ListItem>
        );
    };

    const isBottomOpen = isOpen && inputValue.length >= 2;

    return (
        <Box
            boxSize="100%"
            display={config[kindOfSearch].display}
            placeContent="center"
            ref={searchBarRef}>
            <InputGroup
                ref={searchBarRef}
                className={isOpen ? "m-menu -active" : "m-menu "}
                pos="relative"
                h="40px"
                w={config[kindOfSearch].widthInput}
                autoComplete="off">
                <InputLeftElement pointerEvents="none" autoComplete="off">
                    <Icon as={Search2Icon} w="16px" h="40px" />
                </InputLeftElement>
                <Input
                    id="mainInput"
                    onClick={toggle}
                    placeholder={config[kindOfSearch].placeholder}
                    color="white"
                    fontSize="xl"
                    value={inputValue}
                    onChange={inputChanged}
                    bg="mediumslateblue"
                    border="none"
                    borderRadius={isBottomOpen ? "16px 16px 0px 0px" : "16px"}
                    transition="border-radius 500ms ease-in-out"
                    _placeholder={{
                        fontSize: "large",
                        color: "white",
                    }}
                    _focus={{
                        outline: "none",
                    }}
                    autoComplete="off"
                />

                <Box
                    pos="absolute"
                    w={config[kindOfSearch].widthInput}
                    mt="40px"
                    overflow="hidden">
                    <List
                        bg="mediumslateblue"
                        mt={isBottomOpen ? "0" : "-100%"}
                        transition="margin-top 700ms ease-in-out"
                        borderRadius="0px 0px 16px 16px"
                        p={{ base: "10px 20px", md: "10px 40px" }}>
                        {getResultsToRender()}
                    </List>
                </Box>
            </InputGroup>
        </Box>
    );
}

export default memo(SearchBar);
