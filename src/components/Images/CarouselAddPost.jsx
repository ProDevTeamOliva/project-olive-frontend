import { memo } from "react";
import { Box, Image, CloseButton } from "@chakra-ui/react";
import Slider from "react-slick";
import { unStyledButton } from "../../styles/Buttons/unStyledButton";

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
};

function CarouselAddPost({ files, removeFile }) {
  return (
    <Slider {...settings}>
      {Array.from(files).map((file) => (
        <Box
          key={file.id}
          px="10px"
          pt="20px"
          onMouseMove={() => {
            document.getElementById(file.id).style.color = "black";
          }}
          onMouseOut={() => {
            document.getElementById(file.id).style.color = "transparent";
          }}
        >
          <CloseButton
            {...unStyledButton}
            id={file.id}
            color="transparent"
            bg="blue.300"
            borderRadius="full"
            w="21px"
            h="21px"
            position="relative"
            left="90px"
            top="10px"
            onClick={() => removeFile(file.id)}
          />
          <Image
            src={URL.createObjectURL(file.file)}
            alt=""
            objectFit="cover"
            objectPosition="center"
            width="100px"
            height="100px"
          />
        </Box>
      ))}
    </Slider>
  );
}
export default memo(CarouselAddPost);
