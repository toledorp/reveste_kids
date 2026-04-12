import { useEffect, useMemo, useState } from "react";
import { getVehicles } from "../services/api";
import "./Vehicles.css";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const vehiclesPerPage = 9;

  useEffect(() => {
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

    loadVehicles();
  }, []);

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
                    <strong>Manufacturer:</strong>{" "}
                    {vehicle.manufacturer ?? "N/A"}
                  </p>

                  <p>
                    <strong>Vehicle Class:</strong>{" "}
                    {vehicle.vehicle_class ?? "N/A"}
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