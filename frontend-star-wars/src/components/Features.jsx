import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../services/api";
import "./Features.css";

function Features() {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        const token = localStorage.getItem("token");

        const data = await fetchData("/persons", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const list = Array.isArray(data) ? data : data.persons || [];
        setCharacter(list[0]); // 👈 pega o primeiro
      } catch (err) {
        console.error(err);
      }
    };

    loadCharacter();
  }, []);

  return (
    <section className="features">
      <div className="features-overlay">
        <h2 className="features-title">TESTE FEATURES</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Personagens</h3>
            <p>Teste ok</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
