import { useEffect, useMemo, useState } from "react";
import { getSpecies, fetchData } from "../services/api";
import "./Species.css";

function Species() {
  const [speciesList, setSpeciesList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newSpecies, setNewSpecies] = useState({
    name: "",
    classification: "",
    designation: "",
    average_height: "",
    skin_colors: "",
    hair_colors: "",
    eye_colors: "",
    average_lifespan: "",
    language: "",
  });

  const speciesPerPage = 9;

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
    loadSpecies();
  }, []);

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

  const resetForm = () => {
    setNewSpecies({
      name: "",
      classification: "",
      designation: "",
      average_height: "",
      skin_colors: "",
      hair_colors: "",
      eye_colors: "",
      average_lifespan: "",
      language: "",
    });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Deseja excluir esta espécie?");
    if (!confirmed) return;

    try {
      await fetchData(`/species/${id}`, {
        method: "DELETE",
      });

      await loadSpecies();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (species) => {
    setEditingId(species._id);
    setNewSpecies({
      name: species.name || "",
      classification: species.classification || "",
      designation: species.designation || "",
      average_height: species.average_height || "",
      skin_colors: species.skin_colors || "",
      hair_colors: species.hair_colors || "",
      eye_colors: species.eye_colors || "",
      average_lifespan: species.average_lifespan || "",
      language: species.language || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...newSpecies,
        average_height: Number(newSpecies.average_height),
        average_lifespan: Number(newSpecies.average_lifespan),
      };

      if (editingId) {
        await fetchData(`/species/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });

        alert("Espécie atualizada com sucesso.");
      } else {
        await fetchData("/species", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        alert("Espécie criada com sucesso.");
      }

      resetForm();
      await loadSpecies();
    } catch (err) {
      alert(err.message);
    }
  };

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

        {isAdmin && (
          <div className="admin-form-wrapper">
            <h2 className="admin-form-title">
              {editingId ? "Editar Espécie" : "Adicionar Espécie"}
            </h2>

            <form className="admin-film-form" onSubmit={handleSubmit}>
              <div className="admin-form-grid">
                <input
                  type="text"
                  placeholder="Nome"
                  value={newSpecies.name}
                  onChange={(e) =>
                    setNewSpecies({ ...newSpecies, name: e.target.value })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Classificação"
                  value={newSpecies.classification}
                  onChange={(e) =>
                    setNewSpecies({
                      ...newSpecies,
                      classification: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Designação"
                  value={newSpecies.designation}
                  onChange={(e) =>
                    setNewSpecies({ ...newSpecies, designation: e.target.value })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Altura média"
                  value={newSpecies.average_height}
                  onChange={(e) =>
                    setNewSpecies({
                      ...newSpecies,
                      average_height: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Cores de pele"
                  value={newSpecies.skin_colors}
                  onChange={(e) =>
                    setNewSpecies({
                      ...newSpecies,
                      skin_colors: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Cores de cabelo"
                  value={newSpecies.hair_colors}
                  onChange={(e) =>
                    setNewSpecies({
                      ...newSpecies,
                      hair_colors: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Cores dos olhos"
                  value={newSpecies.eye_colors}
                  onChange={(e) =>
                    setNewSpecies({
                      ...newSpecies,
                      eye_colors: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Expectativa de vida"
                  value={newSpecies.average_lifespan}
                  onChange={(e) =>
                    setNewSpecies({
                      ...newSpecies,
                      average_lifespan: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Idioma"
                  value={newSpecies.language}
                  onChange={(e) =>
                    setNewSpecies({ ...newSpecies, language: e.target.value })
                  }
                  required
                />
              </div>

              <div className="admin-actions">
                <button type="submit" className="admin-submit-btn">
                  {editingId ? "Salvar Alterações" : "Criar Espécie"}
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

                  {isAdmin && (
                    <div className="film-admin-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(species)}
                      >
                        Editar
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(species._id)}
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

export default Species;