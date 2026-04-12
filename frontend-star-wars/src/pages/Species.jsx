import { useEffect, useMemo, useState } from "react";
import { getSpecies } from "../services/api";
import "./Species.css";

function Species() {
  const [speciesList, setSpeciesList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const speciesPerPage = 9;

  useEffect(() => {
    const loadSpecies = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getSpecies();
        const list = Array.isArray(data) ? data : data.species || [];

        setSpeciesList(list);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSpecies();
  }, []);

  const totalPages = Math.ceil(speciesList.length / speciesPerPage);

  const currentSpecies = useMemo(() => {
    const startIndex = (currentPage - 1) * speciesPerPage;
    const endIndex = startIndex + speciesPerPage;
    return speciesList.slice(startIndex, endIndex);
  }, [speciesList, currentPage]);

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
    <section className="species">
      <div className="species-container">
        <h1 className="species-title">Species</h1>
        <p className="species-subtitle">
          Discover the many life forms of the Star Wars galaxy.
        </p>

        {loading && <p className="species-message">Loading species...</p>}

        {error && <p className="species-message error">Error: {error}</p>}

        {!loading && !error && speciesList.length === 0 && (
          <p className="species-message">No species found.</p>
        )}

        {!loading && !error && speciesList.length > 0 && (
          <>
            <div className="species-grid">
              {currentSpecies.map((species) => (
                <div className="species-card" key={species._id}>
                  <h3>{species.name ?? "Unknown Species"}</h3>

                  <p>
                    <strong>Classification:</strong>{" "}
                    {species.classification ?? "N/A"}
                  </p>

                  <p>
                    <strong>Designation:</strong>{" "}
                    {species.designation ?? "N/A"}
                  </p>

                  <p>
                    <strong>Average Height:</strong>{" "}
                    {species.average_height ?? "N/A"}
                  </p>

                  <p>
                    <strong>Average Lifespan:</strong>{" "}
                    {species.average_lifespan ?? "N/A"}
                  </p>

                  <p>
                    <strong>Language:</strong> {species.language ?? "N/A"}
                  </p>

                  <p>
                    <strong>Skin Colors:</strong> {species.skin_colors ?? "N/A"}
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

export default Species;