import { useEffect, useState } from "react";
import "./Feed.css";

export default function Feed() {
  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/clothes")
      .then((res) => res.json())
      .then((data) => setClothes(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="feed-container">
      {clothes.map((item) => (
        <article key={item._id} className="feed-card">
          <div className="feed-image-wrapper">
            {item.images && item.images.length > 0 ? (
              <img
                src={item.images[0]}
                alt={item.title}
                className="feed-image"
              />
            ) : (
              <div className="feed-image-placeholder">
                <span>Sem imagem</span>
              </div>
            )}
          </div>

          <div className="feed-info">
            <h2 className="feed-title">{item.title}</h2>
            <p className="feed-description">
              {item.description || "Sem descrição"}
            </p>

            <div className="feed-meta">
              <span>
                <strong>Tamanho:</strong> {item.size}
              </span>
              <span>
                <strong>Categoria:</strong> {item.category}
              </span>
              <span>
                <strong>Condição:</strong> {item.condition}
              </span>
            </div>
          </div>

          <div className="feed-actions">
            <button type="button">❤️</button>
            <button type="button">❌</button>
          </div>
        </article>
      ))}
    </main>
  );
}
