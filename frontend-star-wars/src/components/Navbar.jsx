import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">
        STAR WARS
      </Link>

      <nav>
        <Link to="/" className="navbar-home">
          Home
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;