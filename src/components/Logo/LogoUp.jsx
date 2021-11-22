import "../../styles/Logo/LogoUp.css";

function LogoUp({ fontSize }) {
  return (
    <div className="textAnimation">
      <div>
        <p className="text animation" style={{ fontSize: fontSize }}>
          ChatterMatter
        </p>
      </div>
    </div>
  );
}

export default LogoUp;
