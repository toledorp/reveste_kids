import { useEffect, useMemo, useState } from "react";
import { getFilms, fetchData } from "../services/api";
import "./Films.css";

function Films() {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newFilm, setNewFilm] = useState({
    title: "",
    episode_id: "",
    opening_crawl: "",
    director: "",
    producer: "",
    release_date: "",
  });

  const filmsPerPage = 6;

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
    loadFilms();
  }, []);

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

  const resetForm = () => {
    setNewFilm({
      title: "",
      episode_id: "",
      opening_crawl: "",
      director: "",
      producer: "",
      release_date: "",
    });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Deseja excluir este filme?");
    if (!confirmed) return;

    try {
      await fetchData(`/films/${id}`, {
        method: "DELETE",
      });

      await loadFilms();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (film) => {
    setEditingId(film._id);
    setNewFilm({
      title: film.title || "",
      episode_id: film.episode_id || "",
      opening_crawl: film.opening_crawl || "",
      director: film.director || "",
      producer: film.producer || "",
      release_date: film.release_date ? film.release_date.slice(0, 10) : "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...newFilm,
        episode_id: Number(newFilm.episode_id),
      };

      if (editingId) {
        await fetchData(`/films/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });

        alert("Filme atualizado com sucesso.");
      } else {
        await fetchData("/films", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        alert("Filme criado com sucesso.");
      }

      resetForm();
      await loadFilms();
    } catch (err) {
      alert(err.message);
    }
  };

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

        {isAdmin && (
          <div className="admin-form-wrapper">
            <h2 className="admin-form-title">
              {editingId ? "Editar Filme" : "Adicionar Filme"}
            </h2>

            <form className="admin-film-form" onSubmit={handleSubmit}>
              <div className="admin-form-grid">
                <input
                  type="text"
                  placeholder="Título"
                  value={newFilm.title}
                  onChange={(e) =>
                    setNewFilm({ ...newFilm, title: e.target.value })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Episódio"
                  value={newFilm.episode_id}
                  onChange={(e) =>
                    setNewFilm({ ...newFilm, episode_id: e.target.value })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Diretor"
                  value={newFilm.director}
                  onChange={(e) =>
                    setNewFilm({ ...newFilm, director: e.target.value })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Produtor"
                  value={newFilm.producer}
                  onChange={(e) =>
                    setNewFilm({ ...newFilm, producer: e.target.value })
                  }
                  required
                />

                <input
                  type="date"
                  value={newFilm.release_date}
                  onChange={(e) =>
                    setNewFilm({ ...newFilm, release_date: e.target.value })
                  }
                  required
                />
              </div>

              <textarea
                placeholder="Opening Crawl"
                value={newFilm.opening_crawl}
                onChange={(e) =>
                  setNewFilm({ ...newFilm, opening_crawl: e.target.value })
                }
                rows="7"
                required
              />

              <div className="admin-actions">
                <button type="submit" className="admin-submit-btn">
                  {editingId ? "Salvar Alterações" : "Criar Filme"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="admin-cancel-btn"
                    onClick={resetForm}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

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
                  <h3>{film.title ?? "Untitled"}</h3>

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

                  {isAdmin && (
                    <div className="film-admin-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(film)}
                      >
                        Editar
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(film._id)}
                      >
                        Excluir
                      </button>
                    </div>
                  )}
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