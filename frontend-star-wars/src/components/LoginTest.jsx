import { useState } from "react";
import { loginUser, fetchData } from "../services/api";

function LoginTest() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");
      const data = await loginUser(email, password);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      alert("Login realizado com sucesso");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGetPersons = async () => {
    try {
      setError("");
      const savedToken = localStorage.getItem("token");

      const data = await fetchData("/persons", {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });

      setResult(data);
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <section style={{ padding: "40px", textAlign: "center", color: "white" }}>
      <h2 style={{ color: "#ffe81f", marginBottom: "20px" }}>Teste de Login</h2>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="email"
          placeholder="Digite o e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", marginRight: "10px", width: "220px" }}
        />

        <input
          type="password"
          placeholder="Digite a senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", width: "220px" }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
        <button
          onClick={handleLogin}
          style={{
            background: "#ffe81f",
            color: "#000",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Fazer login
        </button>

        <button
          onClick={handleGetPersons}
          style={{
            background: "#ffe81f",
            color: "#000",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Buscar persons
        </button>
      </div>

      {token && (
        <p style={{ color: "#90ee90", marginBottom: "20px" }}>
          Token salvo com sucesso.
        </p>
      )}

      {error && <p style={{ color: "red", marginBottom: "20px" }}>Erro: {error}</p>}

      {result && (
        <pre
          style={{
            marginTop: "20px",
            background: "#111",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "left",
            maxWidth: "900px",
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

export default LoginTest;