import {
  useMediaQuery,
  Box,
  Grid,
  Avatar,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect } from "react";
import { getMeFriends } from "../../actions/meActions";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
// https://ionicons.com/

function ChatFriends({ user }) {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.meFriends.friends);
  const [isDesktop] = useMediaQuery("(min-width: 48em)");

  useEffect(() => {
    dispatch(getMeFriends());
  }, [dispatch]);

  // const prevRef = useRef(undefined);
  // const nextRef = useRef(undefined);

  return (
    <Box borderRight="1px" borderColor="gray.500">
      {friends.length > 0 && (
        <Swiper
          modules={[Navigation]}
          direction="vertical"
          slidesPerView="auto"
          // slidesPerGroupAuto={true}
          // onInit={(swiper) => {
          //   swiper.params.navigation.prevEl = prevRef.current;
          //   swiper.params.navigation.nextEl = nextRef.current;
          //   swiper.navigation.init();
          //   swiper.navigation.update();
          // }}
          className="mySwiper"
        >
          {isDesktop
            ? friends.map((f) => (
                <SwiperSlide
                  key={f.id}
                  style={{ width: "300px", height: "74px" }}
                >
                  <Link to={`/chat/${f.idConversation}`}>
                    <Grid
                      h="74px"
                      templateColumns="74px 1fr"
                      placeItems="center"
                      bgColor={f.id === user?.id && "rgba(0, 0, 0, 0.1)"}
                      _hover={{
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Avatar
                        boxSize="48px"
                        m="13px"
                        src={baseUrl + f.avatar}
                      />
                      <Text
                        fontSize="lg"
                        fontWeight="500"
                        textAlign="center"
                        m="7px"
                      >
                        {f.nameFirst} {f.nameLast}
                      </Text>
                    </Grid>
                  </Link>
                </SwiperSlide>
              ))
            : friends.map((f) => (
                <SwiperSlide
                  key={f.id}
                  style={{ width: "74px", height: "74px" }}
                >
                  <Link to={`/chat/${f.idConversation}`}>
                    <Tooltip
                      label={`${f.nameFirst} ${f.nameLast}`}
                      bg="white"
                      placement="right"
                    >
                      <Avatar
                        boxSize="48px"
                        m="13px"
                        src={baseUrl + f.avatar}
                      />
                    </Tooltip>
                  </Link>
                </SwiperSlide>
              ))}
          {/* <Box ref={prevRef} pos="absolute" top="0" zIndex="1" cursor="pointer">
            <IconContext.Provider
              value={{
                size: "80px",
                color: "black",
                style: {
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  cursor: "pointer",
                },
              }}
            >
              <IoEllipse />
            </IconContext.Provider>
            <Avatar
              boxSize="60px"
              m="10px"
              bg="white"
              icon={
                <IconContext.Provider
                  value={{
                    size: "3rem",
                    color: "black",
                    style: {
                      marginBottom: "5px",
                    },
                  }}
                >
                  <IoChevronUp />
                </IconContext.Provider>
              }
            />
          </Box>
          <Box
            ref={nextRef}
            pos="absolute"
            bottom="0"
            zIndex="1"
            cursor="pointer"
          >
            <IconContext.Provider
              value={{
                size: "80px",
                color: "black",
                style: {
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  cursor: "pointer",
                },
              }}
            >
              <IoEllipse />
            </IconContext.Provider>
            <Avatar
              boxSize="60px"
              m="10px"
              bg="white"
              icon={
                <IconContext.Provider
                  value={{
                    size: "3rem",
                    color: "black",
                    style: {
                      marginTop: "5px",
                    },
                  }}
                >
                  <IoChevronDown />
                </IconContext.Provider>
              }
            />
          </Box> */}
        </Swiper>
      )}
    </Box>
  );
}

export default memo(ChatFriends);
