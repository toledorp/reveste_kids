import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        Reveste Kids
      </div>

      <div className="navbar-actions">
        <Link to="/feed" className="nav-link-btn">
          Feed
        </Link>

        <Link to="/closet" className="nav-link-btn">
          Meu Closet
        </Link>

        <Link to="/add-clothing" className="nav-link-btn">
          Cadastrar Peça
        </Link>

        <Link to="/matches" className="nav-link-btn">
          Matches
        </Link>

        {isAuthenticated && (
          <button className="logout-btn" onClick={handleLogout}>
            Sair
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
