import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FeedTikTok.css";

function FeedTikTok() {
  const [clothes, setClothes] = useState([]);
  const [likedIds, setLikedIds] = useState([]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState({});
  const [matchAlert, setMatchAlert] = useState(null);

  const navigate = useNavigate();

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/clothes")
      .then((res) => res.json())
      .then((data) => setClothes(data || []))
      .catch((error) => console.log("Erro ao carregar feed:", error));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    fetch("http://localhost:4000/api/my-likes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const ids = data.map((item) => item.clothingId?._id || item.clothingId);
        setLikedIds(ids);
      })
      .catch((error) => console.log("Erro ao buscar likes:", error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const getAllMedia = (item) => {
    if (item?.media?.length > 0) {
      return item.media;
    }

    if (item?.images?.length > 0) {
      return item.images.map((url) => ({ type: "image", url }));
    }

    if (item?.image) {
      return [{ type: "image", url: item.image }];
    }

    return [];
  };

  const getOwnerId = (item) => {
    if (!item?.userId) return null;

    if (typeof item.userId === "object") {
      return item.userId._id;
    }

    return item.userId;
  };

  const handleNextMedia = (itemId, total) => {
    setCurrentMediaIndex((prev) => {
      const current = prev[itemId] || 0;

      return {
        ...prev,
        [itemId]: current === total - 1 ? 0 : current + 1,
      };
    });
  };

  const handlePrevMedia = (itemId, total) => {
    setCurrentMediaIndex((prev) => {
      const current = prev[itemId] || 0;

      return {
        ...prev,
        [itemId]: current === 0 ? total - 1 : current - 1,
      };
    });
  };

  const showToast = (title, message) => {
    setMatchAlert({ title, message });

    setTimeout(() => {
      setMatchAlert(null);
    }, 3000);
  };

  const handleLike = async (clothingId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Você precisa estar logado para curtir.");
      return;
    }

    const alreadyLiked = likedIds.includes(clothingId);

    try {
      const response = await fetch(
        `http://localhost:4000/api/like/${clothingId}`,
        {
          method: alreadyLiked ? "DELETE" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao atualizar like");
      }

      if (alreadyLiked) {
        setLikedIds((prev) => prev.filter((id) => id !== clothingId));

        showToast(
          "Like removido",
          "A peça foi removida da sua lista de curtidas."
        );

        return;
      }

      setLikedIds((prev) => [...prev, clothingId]);

      if (data.matchCreated) {
        showToast(
          "Deu match! 🎉",
          "Vocês demonstraram interesse em trocar peças. A conversa já está disponível em Matches."
        );
      } else {
        showToast(
          "Like enviado!",
          "Se houver interesse mútuo, o match aparecerá na área de Matches."
        );
      }
    } catch (error) {
      console.log(error);
      alert("Não foi possível atualizar o like.");
    }
  };

  return (
    <div className="tiktok-layout">
      <aside className="tiktok-sidebar">
        <h1>Reveste Kids</h1>

        <nav className="tiktok-menu">
          <button onClick={() => navigate("/feed")}>🏠 Para você</button>
          <button onClick={() => navigate("/closet")}>👕 Meu Closet</button>
          <button onClick={() => navigate("/add-clothing")}>
            ➕ Cadastrar Peça
          </button>
          <button onClick={() => navigate("/matches")}>💬 Matches</button>

          <button className="logout-btn" onClick={handleLogout}>
            🚪 Sair
          </button>
        </nav>

        <div className="tiktok-user-card">
          <span>Logado como</span>
          <strong>{user?.email || "Usuário"}</strong>
        </div>
      </aside>

      <main className="tiktok-feed">
        {clothes.length === 0 ? (
          <section className="tiktok-empty">
            <h2>Nenhuma peça encontrada</h2>
            <p>Cadastre roupas para visualizar o feed.</p>
          </section>
        ) : (
          clothes.map((item) => {
            const mediaList = getAllMedia(item);
            const activeIndex = currentMediaIndex[item._id] || 0;
            const activeMedia = mediaList[activeIndex];

            const isLiked = likedIds.includes(item._id);
            const ownerId = getOwnerId(item);
            const isOwnClothing = String(ownerId) === String(user?._id);

            return (
              <section key={item._id} className="tiktok-card">
                <div className="tiktok-info-card">
                  <h2>{item.title || "Peça sem título"}</h2>
                  <p>{item.description || "Peça disponível para troca."}</p>

                  <div className="tiktok-tags">
                    {item.size && <span>Tamanho: {item.size}</span>}
                    {item.category && <span>{item.category}</span>}
                    {item.condition && <span>{item.condition}</span>}
                  </div>
                </div>

                <div className="tiktok-media-frame">
                  {activeMedia?.type === "video" ? (
                    <video
                      src={activeMedia.url}
                      className="tiktok-media"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : activeMedia?.url ? (
                    <img
                      src={activeMedia.url}
                      alt={item.title || "Peça"}
                      className="tiktok-media"
                    />
                  ) : (
                    <div className="tiktok-no-media">Sem mídia</div>
                  )}

                  {mediaList.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="media-arrow media-arrow-left"
                        onClick={() =>
                          handlePrevMedia(item._id, mediaList.length)
                        }
                      >
                        ‹
                      </button>

                      <button
                        type="button"
                        className="media-arrow media-arrow-right"
                        onClick={() =>
                          handleNextMedia(item._id, mediaList.length)
                        }
                      >
                        ›
                      </button>

                      <div className="media-dots">
                        {mediaList.map((_, index) => (
                          <span
                            key={index}
                            className={index === activeIndex ? "active" : ""}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {isLiked && <div className="tiktok-like-pop">❤️</div>}
                </div>

                <div className="tiktok-actions">
                  <button
                    className={`tiktok-action-btn ${isLiked ? "liked" : ""}`}
                    onClick={() => handleLike(item._id)}
                    disabled={isOwnClothing}
                    title={
                      isOwnClothing
                        ? "Você não pode curtir sua própria peça"
                        : ""
                    }
                  >
                    {isOwnClothing ? "🚫" : "❤️"}
                  </button>

                  <span>
                    {isOwnClothing
                      ? "Sua peça"
                      : isLiked
                      ? "Curtido"
                      : "Curtir"}
                  </span>

                  <button
                    type="button"
                    className="tiktok-action-btn"
                    onClick={() => navigate("/closet")}
                  >
                    👕
                  </button>
                  <span>Closet</span>

                  <button
                    type="button"
                    className="tiktok-action-btn"
                    onClick={() => navigate("/matches")}
                  >
                    💬
                  </button>
                  <span>Match</span>
                </div>
              </section>
            );
          })
        )}
      </main>

      {matchAlert && (
        <div className="match-toast">
          <strong>{matchAlert.title}</strong>
          <p>{matchAlert.message}</p>
        </div>
      )}
    </div>
  );
}

export default FeedTikTok;