import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FeedTikTok.css";
import Footer from "../components/Footer";


function FeedTikTok() {
  const [clothes, setClothes] = useState([]);
  const [likedIds, setLikedIds] = useState([]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState({});
  const [matchAlert, setMatchAlert] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeClothingId, setActiveClothingId] = useState(null);

  const cardRefs = useRef({});
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
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const ids = data.map((item) => item.clothingId?._id || item.clothingId);
        setLikedIds(ids);
      })
      .catch((error) => console.log("Erro ao buscar likes:", error));
  }, []);

  const filteredClothes = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) return clothes;

    return clothes.filter((item) => {
      const title = item.title?.toLowerCase() || "";
      const description = item.description?.toLowerCase() || "";

      return title.includes(search) || description.includes(search);
    });
  }, [clothes, searchTerm]);

  const getOwnerId = (item) => {
    if (!item?.userId) return null;
    return typeof item.userId === "object"
      ? item.userId._id
      : item.userId;
  };

  // 🔥 NOVO
  const handleViewCloset = (item) => {
    const ownerId = getOwnerId(item);
    if (!ownerId) return;
    navigate(`/user/${ownerId}/closet`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const getAllMedia = (item) => {
    if (item?.media?.length > 0) return item.media;
    return [];
  };

  return (
    <>
      <div className="tiktok-layout">
        {/* SIDEBAR COMPLETA */}
        <aside className="tiktok-sidebar compact-brand">
          <img src="/logo_sem_fundo.png" alt="logo" className="tiktok-logo" />

          <div className="tiktok-actions">
            <button onClick={() => navigate("/feed")}>Home</button>
            <button onClick={() => navigate("/closet")}>Closet</button>
            <button onClick={() => navigate("/matches")}>Matches</button>
            <button onClick={handleLogout}>Sair</button>
          </div>

          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </aside>

        {/* FEED */}
        <main className="tiktok-feed">
          {filteredClothes.map((item) => {
            const mediaList = getAllMedia(item);
            const activeMedia = mediaList[0];

            return (
              <section key={item._id} className="tiktok-card">
                <div className="tiktok-info-card">
                  <h2>{item.title || "Peça sem título"}</h2>
                  <p>{item.description || "Peça disponível para troca."}</p>

                  {/* 🔥 NOME CLICÁVEL */}
                  <p
                    onClick={() => handleViewCloset(item)}
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                  >
                    {item.userId?.name || "Usuário"}
                  </p>

                  {/* 🔥 BOTÃO */}
                  <button
                    onClick={() => handleViewCloset(item)}
                    style={{
                      marginTop: "6px",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Ver closet
                  </button>
                </div>

                <div className="tiktok-media-frame">
                  {activeMedia?.url ? (
                    <img
                      src={activeMedia.url}
                      alt={item.title}
                      className="tiktok-media"
                    />
                  ) : (
                    <div>Sem mídia</div>
                  )}
                </div>
              </section>
            );
          })}
        </main>
      </div>

      <Footer />
    </>
  );
}

export default FeedTikTok;