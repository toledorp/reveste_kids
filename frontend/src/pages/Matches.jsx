import { useEffect, useState } from "react";
import "./Matches.css";

function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:4000/api/matches", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMatches(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="matches-loading">Carregando matches...</div>;
  }

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
          {matches.map((match, index) => {
            const myLikedImage =
              match.myLikedClothing?.images?.[0] ||
              match.myLikedClothing?.image ||
              "";

            const likedMyImage =
              match.likedMyClothing?.images?.[0] ||
              match.likedMyClothing?.image ||
              "";

            return (
              <article key={index} className="match-card">
                <div className="match-user">
                  <h2>{match.user?.name || "Usuário"}</h2>
                  <p>{match.user?.email}</p>
                </div>

                <div className="match-items">
                  <div className="match-item">
                    {myLikedImage ? (
                      <img src={myLikedImage} alt={match.myLikedClothing?.title} />
                    ) : (
                      <div className="match-placeholder">Sem imagem</div>
                    )}
                    <h3>{match.myLikedClothing?.title}</h3>
                    <span>Peça que você curtiu</span>
                  </div>

                  <div className="match-versus">↔</div>

                  <div className="match-item">
                    {likedMyImage ? (
                      <img src={likedMyImage} alt={match.likedMyClothing?.title} />
                    ) : (
                      <div className="match-placeholder">Sem imagem</div>
                    )}
                    <h3>{match.likedMyClothing?.title}</h3>
                    <span>Peça que curtiu você</span>
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