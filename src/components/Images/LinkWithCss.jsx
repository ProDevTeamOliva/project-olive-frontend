import { memo } from "react";

function LinkWithCss() {
  const link = "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0";

  return (
    <>
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
    </>
  );
}
export default memo(LinkWithCss);
