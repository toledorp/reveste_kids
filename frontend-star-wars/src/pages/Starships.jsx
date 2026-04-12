import { useEffect, useMemo, useState } from "react";
import { getStarships } from "../services/api";
import "./Starships.css";

function Starships() {
  const [starships, setStarships] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const starshipsPerPage = 9;

  useEffect(() => {
    const loadStarships = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getStarships();
        const list = Array.isArray(data) ? data : data.starships || [];

        setStarships(list);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStarships();
  }, []);

  const totalPages = Math.ceil(starships.length / starshipsPerPage);

  const currentStarships = useMemo(() => {
    const startIndex = (currentPage - 1) * starshipsPerPage;
    const endIndex = startIndex + starshipsPerPage;
    return starships.slice(startIndex, endIndex);
  }, [starships, currentPage]);

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

        {!loading && !error && starships.length > 0 && (
          <>
            <div className="starships-grid">
              {currentStarships.map((starship) => (
                <div className="starship-card" key={starship._id}>
                  <h3>{starship.name ?? "Unknown Starship"}</h3>

                  <p>
                    <strong>Model:</strong> {starship.model ?? "N/A"}
                  </p>

                  <p>
                    <strong>Manufacturer:</strong>{" "}
                    {starship.manufacturer ?? "N/A"}
                  </p>

                  <p>
                    <strong>Starship Class:</strong>{" "}
                    {starship.starship_class ?? "N/A"}
                  </p>

                  <p>
                    <strong>Crew:</strong> {starship.crew ?? "N/A"}
                  </p>

                  <p>
                    <strong>Passengers:</strong> {starship.passengers ?? "N/A"}
                  </p>

                  <p>
                    <strong>Hyperdrive Rating:</strong>{" "}
                    {starship.hyperdrive_rating ?? "N/A"}
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

export default Starships;