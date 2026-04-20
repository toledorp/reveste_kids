import { useEffect, useMemo, useState } from "react";
import { getStarships, fetchData } from "../services/api";
import "./Starships.css";

function Starships() {
  const [starships, setStarships] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newStarship, setNewStarship] = useState({
    name: "",
    model: "",
    manufacturer: "",
    cost_in_credits: "",
    length: "",
    max_atmosphering_speed: "",
    crew: "",
    passengers: "",
    cargo_capacity: "",
    consumables: "",
    hyperdrive_rating: "",
    MGLT: "",
    starship_class: "",
  });

  const starshipsPerPage = 9;

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
    loadStarships();
  }, []);

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

  const resetForm = () => {
    setNewStarship({
      name: "",
      model: "",
      manufacturer: "",
      cost_in_credits: "",
      length: "",
      max_atmosphering_speed: "",
      crew: "",
      passengers: "",
      cargo_capacity: "",
      consumables: "",
      hyperdrive_rating: "",
      MGLT: "",
      starship_class: "",
    });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Deseja excluir esta espaçonave?");
    if (!confirmed) return;

    try {
      await fetchData(`/starships/${id}`, {
        method: "DELETE",
      });

      await loadStarships();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (starship) => {
    setEditingId(starship._id);
    setNewStarship({
      name: starship.name || "",
      model: starship.model || "",
      manufacturer: starship.manufacturer || "",
      cost_in_credits: starship.cost_in_credits || "",
      length: starship.length || "",
      max_atmosphering_speed: starship.max_atmosphering_speed || "",
      crew: starship.crew || "",
      passengers: starship.passengers || "",
      cargo_capacity: starship.cargo_capacity || "",
      consumables: starship.consumables || "",
      hyperdrive_rating: starship.hyperdrive_rating || "",
      MGLT: starship.MGLT || "",
      starship_class: starship.starship_class || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...newStarship,
        cost_in_credits: Number(newStarship.cost_in_credits),
        length: Number(newStarship.length),
        max_atmosphering_speed: Number(newStarship.max_atmosphering_speed),
        crew: Number(newStarship.crew),
        passengers: Number(newStarship.passengers),
        cargo_capacity: Number(newStarship.cargo_capacity),
        hyperdrive_rating: Number(newStarship.hyperdrive_rating),
        MGLT: Number(newStarship.MGLT),
      };

      if (editingId) {
        await fetchData(`/starships/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });

        alert("Espaçonave atualizada com sucesso.");
      } else {
        await fetchData("/starships", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        alert("Espaçonave criada com sucesso.");
      }

      resetForm();
      await loadStarships();
    } catch (err) {
      alert(err.message);
    }
  };

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

        {isAdmin && (
          <div className="admin-form-wrapper">
            <h2 className="admin-form-title">
              {editingId ? "Editar Espaçonave" : "Adicionar Espaçonave"}
            </h2>

            <form className="admin-film-form" onSubmit={handleSubmit}>
              <div className="admin-form-grid">
                <input
                  type="text"
                  placeholder="Nome"
                  value={newStarship.name}
                  onChange={(e) =>
                    setNewStarship({ ...newStarship, name: e.target.value })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Modelo"
                  value={newStarship.model}
                  onChange={(e) =>
                    setNewStarship({ ...newStarship, model: e.target.value })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Fabricante"
                  value={newStarship.manufacturer}
                  onChange={(e) =>
                    setNewStarship({
                      ...newStarship,
                      manufacturer: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Custo em créditos"
                  value={newStarship.cost_in_credits}
                  onChange={(e) =>
                    setNewStarship({
                      ...newStarship,
                      cost_in_credits: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="number"
                  step="0.1"
                  placeholder="Comprimento"
                  value={newStarship.length}
                  onChange={(e) =>
                    setNewStarship({ ...newStarship, length: e.target.value })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Velocidade máxima"
                  value={newStarship.max_atmosphering_speed}
                  onChange={(e) =>
                    setNewStarship({
                      ...newStarship,
                      max_atmosphering_speed: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Tripulação"
                  value={newStarship.crew}
                  onChange={(e) =>
                    setNewStarship({ ...newStarship, crew: e.target.value })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Passageiros"
                  value={newStarship.passengers}
                  onChange={(e) =>
                    setNewStarship({
                      ...newStarship,
                      passengers: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Capacidade de carga"
                  value={newStarship.cargo_capacity}
                  onChange={(e) =>
                    setNewStarship({
                      ...newStarship,
                      cargo_capacity: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Consumíveis"
                  value={newStarship.consumables}
                  onChange={(e) =>
                    setNewStarship({
                      ...newStarship,
                      consumables: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="number"
                  step="0.1"
                  placeholder="Hyperdrive Rating"
                  value={newStarship.hyperdrive_rating}
                  onChange={(e) =>
                    setNewStarship({
                      ...newStarship,
                      hyperdrive_rating: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="MGLT"
                  value={newStarship.MGLT}
                  onChange={(e) =>
                    setNewStarship({ ...newStarship, MGLT: e.target.value })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Classe da espaçonave"
                  value={newStarship.starship_class}
                  onChange={(e) =>
                    setNewStarship({
                      ...newStarship,
                      starship_class: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="admin-actions">
                <button type="submit" className="admin-submit-btn">
                  {editingId ? "Salvar Alterações" : "Criar Espaçonave"}
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

                  {isAdmin && (
                    <div className="film-admin-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(starship)}
                      >
                        Editar
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(starship._id)}
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

export default Starships;