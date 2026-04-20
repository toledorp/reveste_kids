import { useEffect, useMemo, useState } from "react";
import { getVehicles, fetchData } from "../services/api";
import "./Vehicles.css";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newVehicle, setNewVehicle] = useState({
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
    vehicle_class: "",
  });

  const vehiclesPerPage = 9;

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getVehicles();
      const list = Array.isArray(data) ? data : data.vehicles || [];
      setVehicles(list);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewVehicle({
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
      vehicle_class: "",
    });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Deseja excluir este veículo?");
    if (!confirmed) return;

    try {
      await fetchData(`/vehicles/${id}`, {
        method: "DELETE",
      });

      await loadVehicles();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (vehicle) => {
    setEditingId(vehicle._id);
    setNewVehicle({
      name: vehicle.name || "",
      model: vehicle.model || "",
      manufacturer: vehicle.manufacturer || "",
      cost_in_credits: vehicle.cost_in_credits || "",
      length: vehicle.length || "",
      max_atmosphering_speed: vehicle.max_atmosphering_speed || "",
      crew: vehicle.crew || "",
      passengers: vehicle.passengers || "",
      cargo_capacity: vehicle.cargo_capacity || "",
      consumables: vehicle.consumables || "",
      vehicle_class: vehicle.vehicle_class || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...newVehicle,
        cost_in_credits: Number(newVehicle.cost_in_credits),
        length: Number(newVehicle.length),
        max_atmosphering_speed: Number(newVehicle.max_atmosphering_speed),
        crew: Number(newVehicle.crew),
        passengers: Number(newVehicle.passengers),
        cargo_capacity: Number(newVehicle.cargo_capacity),
      };

      if (editingId) {
        await fetchData(`/vehicles/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });

        alert("Veículo atualizado com sucesso.");
      } else {
        await fetchData("/vehicles", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        alert("Veículo criado com sucesso.");
      }

      resetForm();
      await loadVehicles();
    } catch (err) {
      alert(err.message);
    }
  };

  const totalPages = Math.ceil(vehicles.length / vehiclesPerPage);

  const currentVehicles = useMemo(() => {
    const startIndex = (currentPage - 1) * vehiclesPerPage;
    const endIndex = startIndex + vehiclesPerPage;
    return vehicles.slice(startIndex, endIndex);
  }, [vehicles, currentPage]);

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
    <section className="vehicles">
      <div className="vehicles-container">
        <h1 className="vehicles-title">Vehicles</h1>
        <p className="vehicles-subtitle">
          Explore the ground and atmospheric vehicles of the Star Wars galaxy.
        </p>

        {isAdmin && (
          <div className="admin-form-wrapper">
            <h2 className="admin-form-title">
              {editingId ? "Editar Veículo" : "Adicionar Veículo"}
            </h2>

            <form className="admin-film-form" onSubmit={handleSubmit}>
              <div className="admin-form-grid">
                <input
                  type="text"
                  placeholder="Nome"
                  value={newVehicle.name}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, name: e.target.value })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Modelo"
                  value={newVehicle.model}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, model: e.target.value })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Fabricante"
                  value={newVehicle.manufacturer}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, manufacturer: e.target.value })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Custo em créditos"
                  value={newVehicle.cost_in_credits}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, cost_in_credits: e.target.value })
                  }
                  required
                />

                <input
                  type="number"
                  step="0.1"
                  placeholder="Comprimento"
                  value={newVehicle.length}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, length: e.target.value })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Velocidade máxima"
                  value={newVehicle.max_atmosphering_speed}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      max_atmosphering_speed: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Tripulação"
                  value={newVehicle.crew}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, crew: e.target.value })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Passageiros"
                  value={newVehicle.passengers}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, passengers: e.target.value })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Capacidade de carga"
                  value={newVehicle.cargo_capacity}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, cargo_capacity: e.target.value })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Consumíveis"
                  value={newVehicle.consumables}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, consumables: e.target.value })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Classe do veículo"
                  value={newVehicle.vehicle_class}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, vehicle_class: e.target.value })
                  }
                  required
                />
              </div>

              <div className="admin-actions">
                <button type="submit" className="admin-submit-btn">
                  {editingId ? "Salvar Alterações" : "Criar Veículo"}
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

        {loading && <p className="vehicles-message">Loading vehicles...</p>}
        {error && <p className="vehicles-message error">Error: {error}</p>}

        {!loading && !error && vehicles.length === 0 && (
          <p className="vehicles-message">No vehicles found.</p>
        )}

        {!loading && !error && vehicles.length > 0 && (
          <>
            <div className="vehicles-grid">
              {currentVehicles.map((vehicle) => (
                <div className="vehicle-card" key={vehicle._id}>
                  <h3>{vehicle.name ?? "Unknown Vehicle"}</h3>

                  <p>
                    <strong>Model:</strong> {vehicle.model ?? "N/A"}
                  </p>

                  <p>
                    <strong>Manufacturer:</strong> {vehicle.manufacturer ?? "N/A"}
                  </p>

                  <p>
                    <strong>Vehicle Class:</strong> {vehicle.vehicle_class ?? "N/A"}
                  </p>

                  <p>
                    <strong>Crew:</strong> {vehicle.crew ?? "N/A"}
                  </p>

                  <p>
                    <strong>Passengers:</strong> {vehicle.passengers ?? "N/A"}
                  </p>

                  <p>
                    <strong>Max Speed:</strong>{" "}
                    {vehicle.max_atmosphering_speed ?? "N/A"}
                  </p>

                  {isAdmin && (
                    <div className="film-admin-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(vehicle)}
                      >
                        Editar
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(vehicle._id)}
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

export default Vehicles;