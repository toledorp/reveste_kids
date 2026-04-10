import { useEffect, useMemo, useState } from "react";
import { fetchData } from "../services/api";
import "./Characters.css";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const charactersPerPage = 9;

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const data = await fetchData("/persons", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const personsList = Array.isArray(data) ? data : data.persons || [];
        setCharacters(personsList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, []);

  const totalPages = Math.ceil(characters.length / charactersPerPage);

  const currentCharacters = useMemo(() => {
    const startIndex = (currentPage - 1) * charactersPerPage;
    const endIndex = startIndex + charactersPerPage;
    return characters.slice(startIndex, endIndex);
  }, [characters, currentPage]);

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
    <section className="characters" id="characters">
      <div className="characters-container">
        <h2 className="characters-title">Characters</h2>
        <p className="characters-subtitle">
          Explore iconic beings from the Star Wars universe.
        </p>

        {loading && <p className="characters-message">Loading characters...</p>}

        {error && (
          <p className="characters-message error">
            Error loading characters: {error}
          </p>
        )}

        {!loading && !error && characters.length === 0 && (
          <p className="characters-message">No characters found.</p>
        )}

        {!loading && !error && characters.length > 0 && (
          <>
            <div className="characters-grid">
              {currentCharacters.map((character) => (
                <div className="character-card" key={character._id}>
                  <h3>{character.name}</h3>

                  <p>
                    <strong>Birth Year:</strong>{" "}
                    {character["birth year"] ?? "N/A"}
                  </p>

                  <p>
                    <strong>Homeworld:</strong> {character.homeworld ?? "N/A"}
                  </p>

                  <p>
                    <strong>Height:</strong>{" "}
                    {character.descriptions?.height ?? "N/A"}
                  </p>

                  <p>
                    <strong>Mass:</strong>{" "}
                    {character.descriptions?.mass ?? "N/A"}
                  </p>

                  <p>
                    <strong>Gender:</strong>{" "}
                    {character.descriptions?.gender ?? "N/A"}
                  </p>

                  <p>
                    <strong>Eye Color:</strong>{" "}
                    {character.descriptions?.eye_color ?? "N/A"}
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

export default Characters;