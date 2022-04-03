import MagicGrid from "magic-grid-react";
import { Box, Image, Text } from "@chakra-ui/react";
import { baseUrl } from "../../config/baseUrl";
import { useTranslation } from "react-i18next";

function MagicGridImages({ pictures, gridRef }) {
  const { t } = useTranslation();
  const languageValues = {
    noImages: t("noImages"),
  };

  const sizeOfPictures = pictures.length;

  return sizeOfPictures > 0 ? (
    <MagicGrid items={sizeOfPictures || 0} ref={gridRef} useTransform={false}>
      {pictures.map((picture) => (
        <Box w={{ base: "90%", md: "45%", lg: "29%" }} key={picture.id}>
          <Image src={baseUrl + picture.picture} w="100%"></Image>
        </Box>
      ))}
    </MagicGrid>
  ) : (
    <Text>{languageValues.noImages}</Text>
  );
}

export default MagicGridImages;
