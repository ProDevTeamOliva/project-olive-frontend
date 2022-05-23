import { GridItem, Box, Avatar, Text, Tooltip } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, memo } from "react";
import { getMeFriends } from "../../actions/meActions";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { baseUrl } from "../../config/baseUrl";
import FriendsSliderModal from "./FriendsSliderModal";
import { IconContext } from "react-icons";
import {
  IoChatboxEllipses,
  IoEllipse,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";
// https://ionicons.com/

function FriendsSlider() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const languageValues = {
    chat: t("chat"),
  };

  const friends = useSelector((state) => state.meFriends.friends);

  useEffect(() => {
    dispatch(getMeFriends());
  }, [dispatch]);

  const prevRef = useRef(undefined);
  const nextRef = useRef(undefined);

  return (
    <GridItem m="10px 25px" mt="20px">
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bgColor="rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(50px)"
        className="blur"
        w={["300px", "400px", "600px", "800px", "950px"]}
      >
        <Swiper
          modules={[Navigation]}
          slidesPerView="auto"
          slidesPerGroupAuto={true}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          className="mySwiper"
        >
          <SwiperSlide style={{ width: "160px" }}>
            <Avatar
              h="60px"
              w="140px"
              m="10px"
              bg="white"
              icon={
                <IconContext.Provider
                  value={{
                    size: "2.5rem",
                    color: "black",
                    style: {
                      marginRight: "5px",
                    },
                  }}
                >
                  <IoChatboxEllipses />
                  <Text textTransform="none" mb="5px">
                    {languageValues.chat}
                  </Text>
                </IconContext.Provider>
              }
            />
          </SwiperSlide>

          {friends.length > 0 ? (
            friends.map((f) => (
              <SwiperSlide key={f.id} style={{ width: "80px" }}>
                <Link to={`/chat/${f.idConversation}`}>
                  <Tooltip label={`${f.nameFirst} ${f.nameLast}`} bg="white">
                    <Avatar boxSize="60px" m="10px" src={baseUrl + f.avatar}>
                      {f.unreadConversation && (
                        <Box
                          position="absolute"
                          boxSize="16px"
                          bg="mediumslateblue"
                          borderRadius="12px"
                          top="0"
                          right="0"
                        />
                      )}
                    </Avatar>
                  </Tooltip>
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide style={{ width: "80px" }}>
              <FriendsSliderModal kindOfSearch="personV2" />
            </SwiperSlide>
          )}

          <Box
            ref={prevRef}
            pos="absolute"
            bottom="0"
            left="0"
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
                      marginRight: "5px",
                    },
                  }}
                >
                  <IoChevronBack />
                </IconContext.Provider>
              }
            />
          </Box>
          <Box
            ref={nextRef}
            pos="absolute"
            bottom="0"
            right="0"
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
                      marginLeft: "5px",
                    },
                  }}
                >
                  <IoChevronForward />
                </IconContext.Provider>
              }
            />
          </Box>
        </Swiper>
      </Box>
    </GridItem>
  );
}

export default memo(FriendsSlider);
