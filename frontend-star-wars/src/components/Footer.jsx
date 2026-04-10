import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-logo">STAR WARS</h2>

        <p className="footer-text">
          Explore a galáxia, descubra personagens e mergulhe no universo Star Wars.
        </p>

        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#">Characters</a>
          <a href="#">Films</a>
          <a href="#">Starships</a>
        </div>

        <p className="footer-copy">
          © 2026 Star Wars Explorer - Projeto acadêmico
        </p>
      </div>
    </footer>
  );
}

export default Footer;