import { useEffect, useState } from "react";
import "./Matches.css";

function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

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
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const getOtherUser = (match, currentUserId) => {
    if (String(match.ownerId?._id) === String(currentUserId)) {
      return match.interestedUserId;
    }
    return match.ownerId;
  };

  if (loading) {
    return <div className="matches-loading">Carregando matches...</div>;
  }

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <main className="matches-container">
      <div className="matches-header">
        <h1>Matches</h1>
        <p>Usuários com interesse mútuo em troca de peças.</p>
      </div>

      {matches.length === 0 ? (
        <div className="matches-empty">
          <p>Ainda não há matches.</p>
        </div>
      ) : (
        <div className="matches-grid">
          {matches.map((match) => {
            const otherUser = getOtherUser(match, user?._id);

            return (
              <article key={match._id} className="match-card">
                <div className="match-user">
                  <h2>{otherUser?.name || "Usuário"}</h2>
                  <p>{otherUser?.email || "Email não disponível"}</p>
                </div>

                <div className="match-items" style={{ gridTemplateColumns: "1fr" }}>
                  <div className="match-item">
                    <h3>Match ativo</h3>
                    <span>ID do match: {match._id}</span>
                    <br />
                    <span>Status: {match.status}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default Matches;