import { memo } from "react";
import { Box, Image, CloseButton } from "@chakra-ui/react";
import Slider from "react-slick";
import { unStyledButton } from "../../styles/Buttons/unStyledButton";

function CarouselAddPost({ files, removeFile }) {
  const settings = {
    dots: true,
    infinite: files.length >= 4 ? true : false,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: files.length >= 3 ? true : false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: files.length >= 2 ? true : false,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {Array.from(files)
        .reverse()
        .map((file) => (
          <Box key={file.id} px={["30px", "15px", "10px"]} pt="20px">
            <CloseButton
              {...unStyledButton}
              id={file.id}
              color="blue.700"
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
