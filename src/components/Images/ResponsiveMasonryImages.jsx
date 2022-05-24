import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Picture from "./Picture";
import LoadingSpinner from "../Spinner/LoadingSpinner";

function ResponsiveMasonryImages({ pictures }) {
  return pictures.length > 0 ? (
    <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 479: 2, 767: 3 }}>
      <Masonry gutter="24px">
        {pictures.map((picture) => (
          <Picture picture={picture} key={picture.id} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  ) : (
    <LoadingSpinner />
  );
}

export default ResponsiveMasonryImages;
