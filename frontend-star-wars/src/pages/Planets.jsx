import { useEffect, useMemo, useState } from "react";
import { getPlanets } from "../services/api";
import "./Planets.css";

function Planets() {
  const [planets, setPlanets] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const planetsPerPage = 6;

  useEffect(() => {
    const loadPlanets = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPlanets();
        const planetsList = Array.isArray(data) ? data : data.planets || [];

        setPlanets(planetsList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPlanets();
  }, []);

  const totalPages = Math.ceil(planets.length / planetsPerPage);

  const currentPlanets = useMemo(() => {
    const startIndex = (currentPage - 1) * planetsPerPage;
    const endIndex = startIndex + planetsPerPage;
    return planets.slice(startIndex, endIndex);
  }, [planets, currentPage]);

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

        {!loading && !error && planets.length > 0 && (
          <>
            <div className="planets-grid">
              {currentPlanets.map((planet) => (
                <div className="planet-card" key={planet._id}>
                  <h3>{planet.name}</h3>

                  <p>
                    <strong>Climate:</strong> {planet.climate ?? "N/A"}
                  </p>

                  <p>
                    <strong>Terrain:</strong> {planet.terrain ?? "N/A"}
                  </p>

                  <p>
                    <strong>Population:</strong> {planet.population ?? "N/A"}
                  </p>

                  <p>
                    <strong>Gravity:</strong> {planet.gravity ?? "N/A"}
                  </p>

                  <p>
                    <strong>Diameter:</strong> {planet.diameter ?? "N/A"}
                  </p>

                  <p>
                    <strong>Rotation Period:</strong>{" "}
                    {planet.rotation_period ?? "N/A"}
                  </p>
                </div>
              ))}
            </div>

            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      className={`pagination-number ${
                        currentPage === pageNumber ? "active" : ""
                      }`}
                      onClick={() => goToPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  )
                )}
              </div>

              <button
                className="pagination-btn"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Planets;