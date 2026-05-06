import { useEffect, useState } from "react";
import MediaCarousel from "../components/MediaCarousel";
import "./Feed.css";

export default function Feed() {
  const [clothes, setClothes] = useState([]);
  const [likedIds, setLikedIds] = useState([]);
  const [loadingLikes, setLoadingLikes] = useState(true);
  const [matchedUserIds, setMatchedUserIds] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/clothes")
      .then((res) => res.json())
      .then((data) => setClothes(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoadingLikes(false);
      return;
    }

    fetch("http://localhost:4000/api/my-likes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const likedClothingIds = data.map(
          (item) => item.clothingId?._id || item.clothingId,
        );
        setLikedIds(likedClothingIds);
        setLoadingLikes(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingLikes(false);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    fetch("http://localhost:4000/api/matches", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const ids = data.map((match) => match.user?._id).filter(Boolean);
        setMatchedUserIds(ids);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLikeToggle = async (clothingId) => {
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
      } else {
        setLikedIds((prev) => [...prev, clothingId]);
      }
    } catch (error) {
      console.log(error);
      alert("Não foi possível atualizar o like.");
    }
  };

  const token = localStorage.getItem("token");
  let loggedUserId = null;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      loggedUserId = payload.id;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="feed-container">
      {clothes.map((item) => {
        const previewMedia =
          item.media && item.media.length > 0
            ? item.media
            : item.images && item.images.length > 0
              ? item.images.map((url) => ({ type: "image", url }))
              : item.image
                ? [{ type: "image", url: item.image }]
                : [];

        const ownerId =
          item.userId && typeof item.userId === "object"
            ? item.userId._id
            : item.userId;

        const isOwnClothing = ownerId === loggedUserId;

        const isLiked = likedIds.includes(item._id);

        const hasMatch = matchedUserIds.includes(ownerId);

        return (
          <article key={item._id} className="feed-card">
            <div className="feed-image-wrapper">
              <MediaCarousel media={previewMedia} alt={item.title} />

              {hasMatch && !isOwnClothing && (
                <div className="match-badge">💜 Match</div>
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
              <button
                type="button"
                onClick={() => handleLikeToggle(item._id)}
                disabled={loadingLikes || isOwnClothing}
                className={isLiked ? "like-btn liked" : "like-btn"}
                title={
                  isOwnClothing ? "Você não pode curtir sua própria peça" : ""
                }
              >
                {isOwnClothing ? "🚫" : isLiked ? "💜" : "🤍"}
              </button>
            </div>
          </article>
        );
      })}
    </main>
  );
}
