import MagicGrid from "magic-grid-react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import Picture from "./Picture";
import LoadingSpinner from "../Spinner/LoadingSpinner";

function MagicGridImages() {
  const gridRef = useRef();
  const pictures = useSelector((state) => state.mePictures.pictures);
  const sizeOfPictures = pictures.length;

  return sizeOfPictures > 0 ? (
    <MagicGrid items={sizeOfPictures || 0} ref={gridRef} useTransform={false}>
      {pictures.map((picture) => (
        <Picture picture={picture} key={picture.id} />
      ))}
    </MagicGrid>
  ) : (
    <LoadingSpinner />
  );
}

export default MagicGridImages;
