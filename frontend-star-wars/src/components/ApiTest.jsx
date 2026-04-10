import { useState } from "react";
import { fetchData } from "../services/api";

function ApiTest() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleTest = async () => {
    try {
      setError("");
      const data = await fetchData("/persons");
      setResult(data);
    } catch (err) {
      setError("Erro: " + err.message);
      setResult(null);
    }
  };

  return (
    <section style={{ padding: "40px", textAlign: "center", color: "white" }}>
      <h2 style={{ color: "#ffe81f", marginBottom: "20px" }}>Teste da API</h2>

      <button
        onClick={handleTest}
        style={{
          background: "#ffe81f",
          color: "#000",
          border: "none",
          padding: "12px 24px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Testar conexão
      </button>

      {error && <p style={{ marginTop: "20px", color: "red" }}>{error}</p>}

      {result && (
        <pre
          style={{
            marginTop: "20px",
            background: "#111",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "left",
            maxWidth: "800px",
            marginInline: "auto",
            overflowX: "auto",
          }}
        >
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </section>
  );
}

export default ApiTest;
