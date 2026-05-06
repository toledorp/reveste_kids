import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyCloset.css";
import MediaCarousel from "../components/MediaCarousel";

function MyCloset() {
  const navigate = useNavigate();

  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const [userSearch, setUserSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:4000/my-clothes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClothes(data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // 🔥 BUSCA CORRIGIDA
  const searchUsers = async (name) => {
    if (!name || name.trim() === "") {
      setUsers([]);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:4000/users/search?name=${encodeURIComponent(name)}`
      );

      const data = await res.json();
      setUsers(data || []);
    } catch (err) {
      console.log("Erro ao buscar usuários:", err);
    }
  };

  // 🔥 debounce simples (evita travar e requests demais)
  useEffect(() => {
    const delay = setTimeout(() => {
      searchUsers(userSearch);
    }, 300);

    return () => clearTimeout(delay);
  }, [userSearch]);

  const getPreviewMedia = (item) => {
    if (item?.media && item.media.length > 0) return item.media;
    if (item?.images && item.images.length > 0)
      return item.images.map((url) => ({ type: "image", url }));
    if (item?.image) return [{ type: "image", url: item.image }];
    return [];
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Deseja excluir esta peça?");
    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:4000/clothes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao excluir peça");
      }

      setClothes((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
      alert("Não foi possível excluir a peça.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="closet-layout">
      <aside className="closet-sidebar compact-brand">
        <img src="/logo_sem_fundo.png" alt="logo" className="closet-logo" />

        <div className="closet-actions-menu">
          <button
            type="button"
            className="closet-home-btn"
            onClick={() => navigate("/feed")}
          >
            <img src="/home_sem_fundo.png" alt="Home" className="closet-home-icon" />
            <span className="closet-home-label">Home</span>
          </button>
        </div>
      </aside>

      <main className="closet-container">
        <div className="closet-header">
          <div>
            <h1>Closet</h1>

            {/* 🔥 BUSCA USUÁRIO */}
            <input
              type="text"
              placeholder="Buscar usuário..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              style={{
                marginTop: "10px",
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #333",
                width: "100%",
                maxWidth: "300px",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchUsers(userSearch);
                }
              }}
            />

            {/* 🔥 RESULTADOS */}
            {users.length > 0 && (
              <div style={{ marginTop: "10px" }}>
                {users.map((user) => (
                  <div
                    key={user._id}
                    onClick={() => navigate(`/user/${user._id}/closet`)}
                    style={{
                      cursor: "pointer",
                      padding: "6px",
                      borderBottom: "1px solid #333",
                    }}
                  >
                    {user.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            className="closet-add-btn"
            onClick={() => navigate("/add-clothing")}
          >
            + Nova peça
          </button>
        </div>

        {loading ? (
          <div className="closet-loading">Carregando seu closet...</div>
        ) : clothes.length === 0 ? (
          <div className="closet-empty">
            <h2>Seu closet ainda está vazio</h2>
            <p>Cadastre sua primeira peça para começar as trocas.</p>
            <button onClick={() => navigate("/add-clothing")}>
              Cadastrar peça
            </button>
          </div>
        ) : (
          <section className="closet-grid">
            {clothes.map((item) => {
              const previewMedia = getPreviewMedia(item);

              return (
                <article key={item._id} className="closet-card">
                  <div className="closet-image-wrapper">
                    <MediaCarousel media={previewMedia} alt={item.title} />
                  </div>

                  <div className="closet-info">
                    <h2>{item.title}</h2>
                    <p>{item.description || "Sem descrição"}</p>

                    <div className="closet-actions">
                      <button
                        type="button"
                        className="closet-edit-btn"
                        onClick={() => openEditModal(item)}
                      >
                        <img src="/file-edit.png" alt="Editar" />
                      </button>

                      <button
                        type="button"
                        className="closet-delete-btn"
                        onClick={() => handleDelete(item._id)}
                        disabled={deletingId === item._id}
                      >
                        <img src="/trash.png" alt="Excluir" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
}

export default MyCloset;