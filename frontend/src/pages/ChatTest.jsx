import { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "../services/socket";

export default function ChatTest() {
  const [matchId, setMatchId] = useState("");
  const [userId, setUserId] = useState("");
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket conectado:", socket.id);
    });

    socket.on("new-message", (message) => {
      setMessages((prev) => {
        const alreadyExists = prev.some((msg) => msg._id === message._id);
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

  const joinRoom = () => {
    if (!matchId) return;
    socket.emit("join-match-room", { matchId });
    alert("Entrou na sala do match");
  };

  const loadMessages = async () => {
    if (!matchId || !userId) return;

    try {
      const response = await axios.get(
        `http://localhost:4000/api/chat/matches/${matchId}/messages`,
        {
          params: { userId },
        }
      );

      setMessages(response.data);
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error);
      alert("Erro ao carregar mensagens");
    }
  };

  const sendMessage = async () => {
    if (!matchId || !userId || !content.trim()) return;

    try {
      await axios.post("http://localhost:4000/api/chat/messages", {
        matchId,
        senderId: userId,
        content,
      });

      setContent("");
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      alert("Erro ao enviar mensagem");
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1>Teste de Chat</h1>

      <div style={{ marginBottom: "12px" }}>
        <input
          type="text"
          placeholder="Match ID"
          value={matchId}
          onChange={(e) => setMatchId(e.target.value)}
          style={{ display: "block", marginBottom: "8px", width: "400px" }}
        />

        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ display: "block", marginBottom: "8px", width: "400px" }}
        />

        <button onClick={joinRoom} style={{ marginRight: "8px" }}>
          Entrar na sala
        </button>

        <button onClick={loadMessages}>
          Carregar histórico
        </button>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <input
          type="text"
          placeholder="Digite a mensagem"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: "400px", marginRight: "8px" }}
        />

        <button onClick={sendMessage}>Enviar</button>
      </div>

      <div>
        <h2>Mensagens</h2>
        <ul>
          {messages.map((msg) => (
            <li key={msg._id}>
              <strong>{msg.senderId?.name || msg.senderId}:</strong> {msg.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}