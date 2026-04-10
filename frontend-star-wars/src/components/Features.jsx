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
        <h2 className="features-title">Explore o universo Star Wars</h2>

        <div className="features-grid">
          <Link to="/characters" className="feature-card">
            <h3>Personagens</h3>

            {character ? (
              <>
                <p><strong>{character.name}</strong></p>
                <p>Homeworld: {character.homeworld}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </Link>

          <div className="feature-card">
            <h3>Filmes</h3>
            <p>Explore os episódios da saga</p>
          </div>

          <div className="feature-card">
            <h3>Planetas</h3>
            <p>Descubra mundos incríveis</p>
          </div>

          <div className="feature-card">
            <h3>Espaçonaves</h3>
            <p>Conheça naves lendárias</p>
          </div>

          <div className="feature-card">
            <h3>Espécies</h3>
            <p>Veja diferentes raças</p>
          </div>

          <div className="feature-card">
            <h3>Veículos</h3>
            <p>Explore transportes icônicos</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;