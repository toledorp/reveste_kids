import { useEffect, useState } from "react";
import { fetchData } from "../services/api";
import "./Species.css";

function Species() {
  const [species, setSpecies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSpecies = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const data = await fetchData("/species", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSpecies(Array.isArray(data) ? data : data.species || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSpecies();
  }, []);

  return (
    <section className="species">
      <div className="species-container">
        <h1 className="species-title">Species</h1>
        <p className="species-subtitle">
          Discover the diverse species of the Star Wars galaxy.
        </p>

        {loading && <p className="species-message">Loading species...</p>}
        {error && <p className="species-message error">Error: {error}</p>}
        {!loading && !error && species.length === 0 && (
          <p className="species-message">No species found.</p>
        )}

        <div className="species-grid">
          {species.map((item) => (
            <div className="species-card" key={item._id}>
              <h3>{item.name}</h3>
              <p><strong>Classification:</strong> {item.classification ?? "N/A"}</p>
              <p><strong>Designation:</strong> {item.designation ?? "N/A"}</p>
              <p><strong>Average Height:</strong> {item.average_height ?? "N/A"}</p>
              <p><strong>Skin Colors:</strong> {item.skin_colors ?? "N/A"}</p>
              <p><strong>Hair Colors:</strong> {item.hair_colors ?? "N/A"}</p>
              <p><strong>Eye Colors:</strong> {item.eye_colors ?? "N/A"}</p>
              <p><strong>Language:</strong> {item.language ?? "N/A"}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Species;