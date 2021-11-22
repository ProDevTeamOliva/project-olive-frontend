import { Link } from "react-router-dom";

function NoPermission() {
  return (
    <div className="noPermission">
      <p>Brak dostępu</p>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default NoPermission;
