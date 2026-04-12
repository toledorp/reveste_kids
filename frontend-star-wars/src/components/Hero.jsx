import "./Hero.css";

function Hero({ onStart }) {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Explore the Galaxy</h1>
          <p>
            Discover characters, films and starships from the Star Wars universe
          </p>
          <button onClick={onStart}>Start Exploring</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;