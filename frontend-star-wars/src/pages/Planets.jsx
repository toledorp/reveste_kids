import { useEffect, useState } from "react";
import { fetchData } from "../services/api";
import "./Planets.css";

function Planets() {
  const [planets, setPlanets] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlanets = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const data = await fetchData("/planets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPlanets(Array.isArray(data) ? data : data.planets || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPlanets();
  }, []);

  return (
    <section className="planets">
      <div className="planets-container">
        <h1 className="planets-title">Planets</h1>
        <p className="planets-subtitle">
          Explore the worlds of the Star Wars galaxy.
        </p>

        {loading && <p className="planets-message">Loading planets...</p>}
        {error && <p className="planets-message error">Error: {error}</p>}
        {!loading && !error && planets.length === 0 && (
          <p className="planets-message">No planets found.</p>
        )}

        <div className="planets-grid">
          {planets.map((planet) => (
            <div className="planet-card" key={planet._id}>
              <h3>{planet.name}</h3>
              <p><strong>Climate:</strong> {planet.climate ?? "N/A"}</p>
              <p><strong>Terrain:</strong> {planet.terrain ?? "N/A"}</p>
              <p><strong>Population:</strong> {planet.population ?? "N/A"}</p>
              <p><strong>Gravity:</strong> {planet.gravity ?? "N/A"}</p>
              <p><strong>Diameter:</strong> {planet.diameter ?? "N/A"}</p>
              <p><strong>Rotation Period:</strong> {planet.rotation_period ?? "N/A"}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Planets;