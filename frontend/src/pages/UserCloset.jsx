import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MyCloset.css";

function UserCloset() {
  const { userId } = useParams();

  const [clothes, setClothes] = useState([]);
  const [search, setSearch] = useState("");

  const fetchClothes = async (searchText = "") => {
    try {
      const response = await fetch(
        `http://localhost:4000/users/${userId}/closet?search=${searchText}`
      );

      const data = await response.json();
      setClothes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Erro ao buscar closet:", error);
    }
  };

  useEffect(() => {
    fetchClothes();
  }, [userId]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchClothes(value);
  };

  return (
    <div className="closet-container">
      {/* HEADER */}
      <div className="closet-header">
        <div>
          <h1>Closet do usuário</h1>
          <p>Veja as peças disponíveis</p>
        </div>

        <input
          type="text"
          placeholder="Buscar roupas..."
          value={search}
          onChange={handleSearch}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #444",
            background: "#111",
            color: "#fff",
          }}
        />
      </div>

      {/* EMPTY */}
      {clothes.length === 0 ? (
        <div className="closet-empty">
          <h2>Nada por aqui 😢</h2>
          <p>Esse usuário ainda não tem roupas cadastradas</p>
        </div>
      ) : (
        <div className="closet-grid">
          {clothes.map((item) => (
            <div key={item._id} className="closet-card">
              <div className="closet-image-wrapper">
                {item.media?.[0]?.url && (
                  <img src={item.media[0].url} />
                )}
              </div>

              <div className="closet-info">
                <h2>{item.title}</h2>
                <p>{item.description}</p>

                <div className="closet-meta">
                  {item.size && <span>{item.size}</span>}
                  {item.category && <span>{item.category}</span>}
                  {item.condition && <span>{item.condition}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserCloset;