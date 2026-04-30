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

  const activeItem = useMemo(() => {
    return (
      filteredClothes.find((item) => String(item._id) === String(activeClothingId)) ||
      filteredClothes[0] ||
      null
    );
  }, [filteredClothes, activeClothingId]);

  useEffect(() => {
    if (filteredClothes.length > 0 && !activeClothingId) {
      setActiveClothingId(filteredClothes[0]._id);
    }
  }, [filteredClothes, activeClothingId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);

        if (visibleEntry?.target?.dataset?.id) {
          setActiveClothingId(visibleEntry.target.dataset.id);
        }
      },
      {
        threshold: 0.55,
      },
    );

    filteredClothes.forEach((item) => {
      const element = cardRefs.current[item._id];

      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [filteredClothes]);

  const generateTags = (item) => {
    const text = `${item.title || ""} ${item.description || ""}`.toLowerCase();

    const tagRules = [
      "jeans",
      "camiseta",
      "calça",
      "bermuda",
      "vestido",
      "moletom",
      "blusa",
      "jaqueta",
      "casaco",
      "shorts",
      "azul",
      "preto",
      "branco",
      "rosa",
      "vermelho",
      "verde",
      "amarelo",
      "cinza",
      "novo",
      "nova",
      "seminovo",
      "seminova",
      "usado",
      "usada",
      "infantil",
      "bebê",
      "menino",
      "menina",
      "tamanho p",
      "tamanho m",
      "tamanho g",
      "tamanho gg",
      "p",
      "m",
      "g",
      "gg",
    ];

    const tags = tagRules.filter((tag) => text.includes(tag));
    return [...new Set(tags)].slice(0, 5);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const getAllMedia = (item) => {
    if (item?.media?.length > 0) return item.media;

    if (item?.images?.length > 0) {
      return item.images.map((url) => ({ type: "image", url }));
    }

    if (item?.image) return [{ type: "image", url: item.image }];

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
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao atualizar like");
      }

      if (alreadyLiked) {
        setLikedIds((prev) => prev.filter((id) => id !== clothingId));

        showToast(
          "Like removido",
          "A peça foi removida da sua lista de curtidas.",
        );

        return;
      }

      setLikedIds((prev) => [...prev, clothingId]);

      if (data.matchCreated) {
        showToast(
          "Deu match!",
          "Vocês demonstraram interesse em trocar peças. A conversa já está disponível em Matches.",
        );
      } else {
        showToast(
          "Like enviado!",
          "Se houver interesse mútuo, o match aparecerá na área de Matches.",
        );
      }
    } catch (error) {
      console.log(error);
      alert("Não foi possível atualizar o like.");
    }
  };

  const renderSearchBox = (variant = "") => (
    <div className={`feed-search-box ${variant}`}>
      <input
        type="text"
        placeholder="Buscar peças..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchTerm && (
        <button
          type="button"
          className="feed-clear-search"
          onClick={() => setSearchTerm("")}
        >
          Limpar
        </button>
      )}
    </div>
  );

  const renderActionButtons = (item, isLiked, isOwnClothing, variant = "") => {
    if (!item) return null;

    return (
      <div className={`tiktok-actions ${variant}`}>
        <button
          type="button"
          className="tiktok-action-btn"
          onClick={() => navigate("/feed")}
          title="Home"
        >
          <img
            src="/home_sem_fundo.png"
            alt="Home"
            className="action-icon-img"
          />
        </button>
        <span>Home</span>

        <button
          type="button"
          className={`tiktok-action-btn ${isLiked ? "liked" : ""}`}
          onClick={() => handleLike(item._id)}
          disabled={isOwnClothing}
          title={
            isOwnClothing ? "Você não pode curtir sua própria peça" : "Curtir"
          }
        >
          {isOwnClothing ? (
            <img
              src="/notLike_sem_fundo.png"
              alt="Not Like"
              className="action-icon-img"
            />
          ) : (
            <img
              src={
                isLiked
                  ? "/like_coracao_sem_fundo.png"
                  : "/like_sem_fundo.png"
              }
              alt={isLiked ? "Curtido" : "Curtir"}
              className="action-icon-img"
            />
          )}
        </button>
        <span>{isOwnClothing ? "Sua peça" : isLiked ? "Curtido" : "Curtir"}</span>

        <button
          type="button"
          className="tiktok-action-btn"
          onClick={() => navigate("/closet")}
          title="Closet"
        >
          <img
            src="/closet_sem_fundo.png"
            alt="Closet"
            className="action-icon-img"
          />
        </button>
        <span>Closet</span>

        <button
          type="button"
          className="tiktok-action-btn"
          onClick={() => navigate("/matches")}
          title="Match"
        >
          <img
            src="/match_sem_fundo.png"
            alt="Match"
            className="action-icon-img"
          />
        </button>
        <span>Match</span>

        <button
          type="button"
          className="tiktok-action-btn logout-action-btn"
          onClick={handleLogout}
          title="Sair"
        >
          <img
            src="/logout_sem_fundo.png"
            alt="Sair"
            className="action-icon-img"
          />
        </button>
        <span>Sair</span>
      </div>
    );
  };

  const activeOwnerId = getOwnerId(activeItem);
  const isActiveLiked = activeItem ? likedIds.includes(activeItem._id) : false;
  const isActiveOwnClothing =
    activeItem && String(activeOwnerId) === String(user?._id);

  return (
    <>
      <div className="tiktok-layout">
        <aside className="tiktok-sidebar compact-brand">
          <img src="/logo_sem_fundo.png" alt="logo" className="tiktok-logo" />

          {renderSearchBox()}

          {renderActionButtons(
            activeItem,
            isActiveLiked,
            isActiveOwnClothing,
            "sidebar-actions",
          )}

          {/* <div className="tiktok-user-card">
            <span>Logado por</span>
            <strong>{user?.name || user?.email?.split("@")[0]}</strong>
          </div> */}
        </aside>

        <main className="tiktok-feed">
          {clothes.length === 0 ? (
            <section className="tiktok-empty">
              <h2>Nenhuma peça encontrada</h2>
              <p>Cadastre roupas para visualizar o feed.</p>
            </section>
          ) : filteredClothes.length === 0 ? (
            <section className="tiktok-empty">
              <h2>Nenhum resultado encontrado</h2>
              <p>Tente buscar por cor, tipo de peça, tamanho ou condição.</p>
            </section>
          ) : (
            filteredClothes.map((item) => {
              const mediaList = getAllMedia(item);
              const activeIndex = currentMediaIndex[item._id] || 0;
              const activeMedia = mediaList[activeIndex];

              const isLiked = likedIds.includes(item._id);
              const ownerId = getOwnerId(item);
              const isOwnClothing = String(ownerId) === String(user?._id);
              const tags = generateTags(item);

              return (
                <section
                  key={item._id}
                  data-id={item._id}
                  ref={(element) => {
                    cardRefs.current[item._id] = element;
                  }}
                  className="tiktok-card"
                  onMouseEnter={() => setActiveClothingId(item._id)}
                >
                  <div className="tiktok-mobile-header">
                    <div className="tiktok-mobile-header-top">
                      <img
                        src="/logo_sem_fundo.png"
                        alt="logo"
                        className="tiktok-mobile-logo"
                      />

                      {renderActionButtons(
                        item,
                        isLiked,
                        isOwnClothing,
                        "mobile-actions",
                      )}
                    </div>

                    {renderSearchBox("mobile-search")}

                    <div className="tiktok-mobile-user-card">
                      <span>Logado por</span>
                      <strong>
                        {user?.name || user?.email?.split("@")[0]}
                      </strong>
                    </div>
                  </div>

                  <div className="tiktok-info-card">
                    <h2>{item.title || "Peça sem título"}</h2>
                    <p>{item.description || "Peça disponível para troca."}</p>

                    {tags.length > 0 && (
                      <div className="tiktok-tags">
                        {tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    )}
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

      <Footer />
    </>
  );
}

export default FeedTikTok;