import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../services/socket";
import "./Matches.css";

function Matches() {
  const navigate = useNavigate();

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageLoading, setMessageLoading] = useState(false);
  const [content, setContent] = useState("");

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:4000/api/chat/users/${user._id}/matches`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao buscar matches");
        }
        return res.json();
      })
      .then((data) => {
        setMatches(data);
        setLoading(false);

        if (data.length > 0) {
          setSelectedMatch(data[0]);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [user?._id]);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket conectado:", socket.id);
    });

    socket.on("new-message", (message) => {
      setMessages((prev) => {
        const alreadyExists = prev.some(
          (msg) => String(msg._id) === String(message._id),
        );

        if (alreadyExists) return prev;

        return [...prev, message];
      });
    });

    return () => {
      socket.off("connect");
      socket.off("new-message");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!selectedMatch?._id || !user?._id) return;

    socket.emit("join-match-room", { matchId: selectedMatch._id });

    setMessageLoading(true);

    fetch(
      `http://localhost:4000/api/chat/matches/${selectedMatch._id}/messages?userId=${user._id}`,
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao carregar mensagens");
        }
        return res.json();
      })
      .then((data) => {
        setMessages(data);
        setMessageLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setMessages([]);
        setMessageLoading(false);
      });
  }, [selectedMatch?._id, user?._id]);

  const getOtherUser = (match) => {
    if (!user?._id || !match) return null;

    if (String(match.ownerId?._id) === String(user._id)) {
      return match.interestedUserId;
    }

    return match.ownerId;
  };

  const getPreviewMedia = (clothing) => {
    if (!clothing) return [];

    if (clothing.media && clothing.media.length > 0) {
      const imageMedia = clothing.media.filter((item) => item.type === "image");

      if (imageMedia.length > 0) {
        return imageMedia;
      }

      return clothing.media;
    }

    if (clothing.images && clothing.images.length > 0) {
      return clothing.images.map((url) => ({ type: "image", url }));
    }

    if (clothing.image) {
      return [{ type: "image", url: clothing.image }];
    }

    return [];
  };

  const getOtherUserClothing = (match) => {
    if (!user?._id || !match) return null;

    if (String(match.ownerId?._id) === String(user._id)) {
      return match.interestedClothingId;
    }

    return match.ownerClothingId;
  };

  const getMyClothing = (match) => {
    if (!user?._id || !match) return null;

    if (String(match.ownerId?._id) === String(user._id)) {
      return match.ownerClothingId;
    }

    return match.interestedClothingId;
  };

  const renderClothingMedia = (clothing, altText) => {
    const media = getPreviewMedia(clothing);
    const firstMedia = media[0];

    if (!firstMedia?.url) {
      return <div className="chat-item-placeholder">Sem imagem</div>;
    }

    if (firstMedia.type === "video") {
      return (
        <video
          src={firstMedia.url}
          muted
          playsInline
          className="chat-item-video"
        />
      );
    }

    return <img src={firstMedia.url} alt={altText} />;
  };

  const handleSendMessage = async () => {
    if (!selectedMatch?._id || !user?._id || !content.trim()) return;

    try {
      const response = await fetch("http://localhost:4000/api/chat/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matchId: selectedMatch._id,
          senderId: user._id,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar mensagem");
      }

      setContent("");
    } catch (error) {
      console.log(error);
      alert("Erro ao enviar mensagem");
    }
  };

  if (loading) {
    return <div className="matches-loading">Carregando matches...</div>;
  }

  return (
    <div className="matches-page-layout">
      <aside className="matches-page-sidebar compact-brand">
        <img src="/logo_sem_fundo.png" alt="logo" className="matches-page-logo" />

        <div className="matches-page-actions-menu">
          <button
            type="button"
            className="matches-home-btn"
            onClick={() => navigate("/feed")}
          >
            <img
              src="/home_sem_fundo.png"
              alt="Home"
              className="matches-home-icon"
            />
            <span className="matches-home-label">Home</span>
          </button>
        </div>

        <div className="matches-user-card">
          <span>Logado por</span>
          <strong>{user?.name || user?.email?.split("@")[0]}</strong>
        </div>
      </aside>

      <main className="matches-container">
        <div className="matches-header">
          <h1>Matches</h1>
          <p>Converse com usuários com interesse mútuo em troca de peças.</p>
        </div>

        {matches.length === 0 ? (
          <div className="matches-empty">
            <p>Ainda não há matches.</p>
          </div>
        ) : (
          <div className="matches-layout">
            <aside className="matches-sidebar">
              {matches.map((match) => {
                const otherUser = getOtherUser(match);
                const isActive =
                  String(selectedMatch?._id) === String(match._id);

                return (
                  <button
                    key={match._id}
                    className={`match-list-item ${isActive ? "active" : ""}`}
                    onClick={() => setSelectedMatch(match)}
                  >
                    <strong>{otherUser?.name || "Usuário"}</strong>
                    <span>{otherUser?.email || "Email não disponível"}</span>
                  </button>
                );
              })}
            </aside>

            <section className="chat-panel">
              <div className="chat-panel-header">
                <h2>{getOtherUser(selectedMatch)?.name || "Conversa"}</h2>
                <p>{getOtherUser(selectedMatch)?.email || ""}</p>
              </div>

              <div className="chat-items-preview">
                {getOtherUserClothing(selectedMatch) && (
                  <div className="chat-item-preview">
                    <div className="chat-item-media">
                      {renderClothingMedia(
                        getOtherUserClothing(selectedMatch),
                        getOtherUserClothing(selectedMatch)?.title ||
                          "Peça do outro usuário",
                      )}
                    </div>

                    <div className="chat-item-info">
                      <h3>
                        {getOtherUserClothing(selectedMatch)?.title ||
                          "Peça sem título"}
                      </h3>
                      <p>Peça do outro usuário</p>
                    </div>
                  </div>
                )}

                {getMyClothing(selectedMatch) && (
                  <div className="chat-item-preview">
                    <div className="chat-item-media">
                      {renderClothingMedia(
                        getMyClothing(selectedMatch),
                        getMyClothing(selectedMatch)?.title || "Sua peça",
                      )}
                    </div>

                    <div className="chat-item-info">
                      <h3>
                        {getMyClothing(selectedMatch)?.title ||
                          "Peça sem título"}
                      </h3>
                      <p>Sua peça no match</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="chat-messages">
                {messageLoading ? (
                  <div className="chat-empty">Carregando mensagens...</div>
                ) : messages.length === 0 ? (
                  <div className="chat-empty">Nenhuma mensagem ainda.</div>
                ) : (
                  messages.map((msg) => {
                    const isMine =
                      String(msg.senderId?._id || msg.senderId) ===
                      String(user?._id);

                    return (
                      <div
                        key={msg._id}
                        className={`chat-bubble ${isMine ? "mine" : "theirs"}`}
                      >
                        <p>{msg.content}</p>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="chat-input-area">
                <input
                  type="text"
                  placeholder="Digite sua mensagem"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                />
                <button onClick={handleSendMessage}>Enviar</button>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export default Matches;