import "../../styles/Logo/LogoUp.css";

function LogoUp({ fontSize, scaleWidth }) {
  const width = parseInt(fontSize) * scaleWidth;
  const widthForFirefox = parseInt(fontSize) * (scaleWidth + 0.5);

  setTimeout(() => {
    var isFirefox = typeof InstallTrigger !== "undefined";
    if (isFirefox) {
      document
        .getElementById("animation")

        .style.setProperty("--widthChange", `${widthForFirefox}px`);
    } else {
      document
        .getElementById("animation")
        .style.setProperty("--widthChange", `${width}px`);
    }
  }, 5);

  return (
    <div className="textAnimation">
      <div>
        <p
          className="text animation"
          id="animation"
          style={{ fontSize: fontSize + "px" }}
        >
          ChatterMatter
        </p>
      </div>
    </div>
  );
}

export default LogoUp;
