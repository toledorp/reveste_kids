import { useNavigate } from "react-router-dom";
import "./Features.css";

export default function Features() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Characters",
      description:
        "Explore heroes, villains, Jedi, Sith and iconic figures from across the galaxy.",
      icon: "👤",
      route: "/characters",
    },
    {
      title: "Planets",
      description:
        "Travel through desert worlds, ice planets and legendary systems of the Republic.",
      icon: "🪐",
      route: "/planets",
    },
    {
      title: "Starships",
      description:
        "Discover the ships that shaped battles, missions and adventures in Star Wars.",
      icon: "🚀",
      route: "/starships",
    },
    {
      title: "Vehicles",
      description:
        "From speeders to armored transports, view powerful machines of the saga.",
      icon: "🛸",
      route: "/vehicles",
    },
    {
      title: "Species",
      description:
        "Meet the diverse species that bring the galaxy far, far away to life.",
      icon: "🧬",
      route: "/species",
    },
    {
      title: "Films",
      description:
        "Revisit the movies, timelines and stories that built the Star Wars universe.",
      icon: "🎬",
      route: "/films",
    },
  ];

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  function handleGoHome() {
    navigate("/");
  }

  function handleCardClick(route) {
    navigate(route);
  }

  return (
    <div className="features-page">
      <header className="features-navbar">
        <div className="features-logo" onClick={handleGoHome}>
          STAR WARS EXPLORER
        </div>

        <nav className="features-nav-actions">
          <button className="nav-btn nav-btn-secondary" onClick={handleGoHome}>
            Home
          </button>
          <button className="nav-btn nav-btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      <main className="features-content">
        <section className="features-hero">
          <p className="features-badge">Galaxy Control Panel</p>
          <h1>Choose your next galactic destination</h1>
          <p className="features-subtitle">
            Access the main Star Wars categories and navigate through data from
            a galaxy far, far away.
          </p>
        </section>

        <section className="features-grid">
          {categories.map((item) => (
            <article
              key={item.title}
              className="feature-card"
              onClick={() => handleCardClick(item.route)}
            >
              <div className="feature-icon">{item.icon}</div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <span className="feature-link">Access category →</span>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
