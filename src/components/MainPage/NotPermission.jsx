import { Link } from "react-router-dom";

function NotPermission() {
  return (
    <div className="notPermission">
      <p>Brak dostępu</p>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default NotPermission;
