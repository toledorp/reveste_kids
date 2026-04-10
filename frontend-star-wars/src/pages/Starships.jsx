import { useEffect, useState } from "react";
import { fetchData } from "../services/api";
import "./Starships.css";

function Starships() {
  const [starships, setStarships] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStarships = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const data = await fetchData("/starships", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStarships(Array.isArray(data) ? data : data.starships || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStarships();
  }, []);

  return (
    <section className="starships">
      <div className="starships-container">
        <h1 className="starships-title">Starships</h1>
        <p className="starships-subtitle">
          Explore the most iconic ships in the Star Wars galaxy.
        </p>

        {loading && <p className="starships-message">Loading starships...</p>}
        {error && <p className="starships-message error">Error: {error}</p>}
        {!loading && !error && starships.length === 0 && (
          <p className="starships-message">No starships found.</p>
        )}

        <div className="starships-grid">
          {starships.map((starship) => (
            <div className="starship-card" key={starship._id}>
              <h3>{starship.name}</h3>
              <p><strong>Model:</strong> {starship.model ?? "N/A"}</p>
              <p><strong>Manufacturer:</strong> {starship.manufacturer ?? "N/A"}</p>
              <p><strong>Cost:</strong> {starship.cost_in_credits ?? "N/A"}</p>
              <p><strong>Length:</strong> {starship.length ?? "N/A"}</p>
              <p><strong>Crew:</strong> {starship.crew ?? "N/A"}</p>
              <p><strong>Passengers:</strong> {starship.passengers ?? "N/A"}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Starships;