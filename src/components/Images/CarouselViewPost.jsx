import { memo, useState } from "react";
import { Box, IconButton, Image, useBreakpointValue } from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import { baseUrl } from "../../config/baseUrl";

const settings = {
  dots: false,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function CarouselViewPost({ cards }) {
  const [slider, setSlider] = useState(null);

  const top = useBreakpointValue({ base: "50%", md: "50%" });
  const side = useBreakpointValue({ base: "5px", md: "10px" });
  const iconStyle = {
    colorScheme: "messenger",
    borderRadius: "full",
    position: "absolute",
    top: top,
    transform: "translate(0%, -50%)",
    zIndex: "2",
    _focus: { border: "none" },
  };

  const link = "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0";
  return (
    <Box
      position={"relative"}
      height={["210px", "280px", "420px", "550px", "650px"]}
      width={"full"}
      overflow={"hidden"}
    >
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href={link + "/slick.min.css"}
      />
      <link
        rel="stylesheet"
        type="text/css"
        href={link + "/slick-theme.min.css"}
      />

      {cards.length > 1 && (
        <>
          <IconButton
            aria-label="left-arrow"
            {...iconStyle}
            left={side}
            onClick={() => slider?.slickPrev()}
          >
            <BiLeftArrowAlt />
          </IconButton>
          <IconButton
            aria-label="right-arrow"
            {...iconStyle}
            right={side}
            onClick={() => slider?.slickNext()}
          >
            <BiRightArrowAlt />
          </IconButton>
        </>
      )}

      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((url, index) => (
          <Image
            key={index}
            src={`${baseUrl}${url}`}
            alt={`${baseUrl}${url}`}
            objectFit="cover"
            objectPosition="center"
            h={["190px", "260px", "400px", "530px", "630px"]}
            w="100%"
          ></Image>
        ))}
      </Slider>
    </Box>
  );
}
export default memo(CarouselViewPost);
