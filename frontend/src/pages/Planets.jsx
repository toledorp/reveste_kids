import { useEffect, useMemo, useState } from "react";
import { getPlanets, fetchData } from "../services/api";
import "./Planets.css";

function Planets() {
  const [planets, setPlanets] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newPlanet, setNewPlanet] = useState({
    name: "",
    climate: "",
    terrain: "",
    population: "",
    gravity: "",
    diameter: "",
    rotation_period: "",
  });

  const planetsPerPage = 6;

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
    loadPlanets();
  }, []);

  const loadPlanets = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getPlanets();
      const list = Array.isArray(data) ? data : data.planets || [];
      setPlanets(list);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewPlanet({
      name: "",
      climate: "",
      terrain: "",
      population: "",
      gravity: "",
      diameter: "",
      rotation_period: "",
    });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Deseja excluir este planeta?");
    if (!confirmed) return;

    try {
      await fetchData(`/planets/${id}`, { method: "DELETE" });
      await loadPlanets();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (planet) => {
    setEditingId(planet._id);
    setNewPlanet({
      name: planet.name || "",
      climate: planet.climate || "",
      terrain: planet.terrain || "",
      population: planet.population || "",
      gravity: planet.gravity || "",
      diameter: planet.diameter || "",
      rotation_period: planet.rotation_period || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...newPlanet,
        population: Number(newPlanet.population),
        diameter: Number(newPlanet.diameter),
        rotation_period: Number(newPlanet.rotation_period),
      };

      if (editingId) {
        await fetchData(`/planets/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        alert("Planeta atualizado com sucesso.");
      } else {
        await fetchData("/planets", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        alert("Planeta criado com sucesso.");
      }

      resetForm();
      await loadPlanets();
    } catch (err) {
      alert(err.message);
    }
  };

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

        {isAdmin && (
          <div className="admin-form-wrapper">
            <h2 className="admin-form-title">
              {editingId ? "Editar Planeta" : "Adicionar Planeta"}
            </h2>

            <form className="admin-film-form" onSubmit={handleSubmit}>
              <div className="admin-form-grid">
                <input
                  type="text"
                  placeholder="Nome"
                  value={newPlanet.name}
                  onChange={(e) =>
                    setNewPlanet({ ...newPlanet, name: e.target.value })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Clima"
                  value={newPlanet.climate}
                  onChange={(e) =>
                    setNewPlanet({ ...newPlanet, climate: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Terreno"
                  value={newPlanet.terrain}
                  onChange={(e) =>
                    setNewPlanet({ ...newPlanet, terrain: e.target.value })
                  }
                />

                <input
                  type="number"
                  placeholder="População"
                  value={newPlanet.population}
                  onChange={(e) =>
                    setNewPlanet({ ...newPlanet, population: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Gravidade"
                  value={newPlanet.gravity}
                  onChange={(e) =>
                    setNewPlanet({ ...newPlanet, gravity: e.target.value })
                  }
                />

                <input
                  type="number"
                  placeholder="Diâmetro"
                  value={newPlanet.diameter}
                  onChange={(e) =>
                    setNewPlanet({ ...newPlanet, diameter: e.target.value })
                  }
                />

                <input
                  type="number"
                  placeholder="Rotação"
                  value={newPlanet.rotation_period}
                  onChange={(e) =>
                    setNewPlanet({
                      ...newPlanet,
                      rotation_period: e.target.value,
                    })
                  }
                />
              </div>

              <div className="admin-actions">
                <button type="submit" className="admin-submit-btn">
                  {editingId ? "Salvar" : "Criar"}
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

        {loading && <p className="planets-message">Loading planets...</p>}
        {error && <p className="planets-message error">{error}</p>}

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

                  {isAdmin && (
                    <div className="film-admin-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(planet)}
                      >
                        Editar
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(planet._id)}
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

export default Planets;