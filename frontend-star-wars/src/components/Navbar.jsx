import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // volta pra home
    window.location.reload(); // força re-render
  };

  return (
    <nav className="navbar">
      <div className="logo">STAR WARS</div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {isAuthenticated && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;