import { useEffect, useMemo, useState } from "react";
import { getFilms } from "../services/api";
import "./Films.css";

function Films() {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const filmsPerPage = 6;

  useEffect(() => {
    const loadFilms = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getFilms();
        const filmsList = Array.isArray(data) ? data : data.films || [];

        setFilms(filmsList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadFilms();
  }, []);

  const totalPages = Math.ceil(films.length / filmsPerPage);

  const currentFilms = useMemo(() => {
    const startIndex = (currentPage - 1) * filmsPerPage;
    const endIndex = startIndex + filmsPerPage;
    return films.slice(startIndex, endIndex);
  }, [films, currentPage]);

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
    <section className="films">
      <div className="films-container">
        <h1 className="films-title">Films</h1>
        <p className="films-subtitle">
          Explore the legendary movies of the Star Wars saga.
        </p>

        {loading && <p className="films-message">Loading films...</p>}

        {error && <p className="films-message error">Error: {error}</p>}

        {!loading && !error && films.length === 0 && (
          <p className="films-message">No films found.</p>
        )}

        {!loading && !error && films.length > 0 && (
          <>
            <div className="films-grid">
              {currentFilms.map((film) => (
                <div className="film-card" key={film._id}>
                  <h3>{film.title ?? film.name ?? "Untitled"}</h3>

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

export default Films;