import { useEffect, useState } from "react";
import { fetchData } from "../services/api";
import "./Vehicles.css";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const data = await fetchData("/vehicles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setVehicles(Array.isArray(data) ? data : data.vehicles || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, []);

  return (
    <section className="vehicles">
      <div className="vehicles-container">
        <h1 className="vehicles-title">Vehicles</h1>
        <p className="vehicles-subtitle">
          Discover the iconic ground and transport vehicles of Star Wars.
        </p>

        {loading && <p className="vehicles-message">Loading vehicles...</p>}
        {error && <p className="vehicles-message error">Error: {error}</p>}
        {!loading && !error && vehicles.length === 0 && (
          <p className="vehicles-message">No vehicles found.</p>
        )}

        <div className="vehicles-grid">
          {vehicles.map((vehicle) => (
            <div className="vehicle-card" key={vehicle._id}>
              <h3>{vehicle.name}</h3>
              <p><strong>Model:</strong> {vehicle.model ?? "N/A"}</p>
              <p><strong>Manufacturer:</strong> {vehicle.manufacturer ?? "N/A"}</p>
              <p><strong>Cost:</strong> {vehicle.cost_in_credits ?? "N/A"}</p>
              <p><strong>Length:</strong> {vehicle.length ?? "N/A"}</p>
              <p><strong>Crew:</strong> {vehicle.crew ?? "N/A"}</p>
              <p><strong>Passengers:</strong> {vehicle.passengers ?? "N/A"}</p>
              <p><strong>Vehicle Class:</strong> {vehicle.vehicle_class ?? "N/A"}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Vehicles;