import "../../styles/Logo/LogoDown.css";
import LogoDown from "./LogoDown";
import LogoUp from "./LogoUp";
function Logo() {
  return (
    <div className="logo">
      <LogoUp />
      <LogoDown />
    </div>
  );
}
export default Logo;
