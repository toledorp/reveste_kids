import { useEffect, useState } from "react";
import { fetchData } from "../services/api";
import "./Films.css";

function Films() {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFilms = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const data = await fetchData("/films", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFilms(data.films || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadFilms();
  }, []);

  return (
    <section className="films">
      <div className="films-container">
        <h1 className="films-title">Films</h1>
        <p className="films-subtitle">
          Explore the legendary stories of the Star Wars universe.
        </p>

        {loading && <p className="films-message">Loading films...</p>}

        {error && <p className="films-message error">Error: {error}</p>}

        {!loading && !error && films.length === 0 && (
          <p className="films-message">No films found.</p>
        )}

        <div className="films-grid">
          {films.map((film) => (
            <div className="film-card" key={film._id}>
              <h3>{film.title}</h3>

              <p>
                <strong>Episode:</strong> {film.episode_id ?? "N/A"}
              </p>

              <p>
                <strong>Director:</strong> {film.director ?? "N/A"}
              </p>

              <p>
                <strong>Producer:</strong> {film.producer ?? "N/A"}
              </p>

              <p>
                <strong>Release Date:</strong> {film.release_date ?? "N/A"}
              </p>

              <p>
                <strong>Opening Crawl:</strong>{" "}
                {film.opening_crawl
                  ? `${film.opening_crawl.slice(0, 140)}...`
                  : "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Films;