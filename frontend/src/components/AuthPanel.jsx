import { useState } from "react";
import { fetchData, loginUser } from "../services/api";
import "./AuthPanel.css";

function AuthPanel({ onAuthSuccess }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetMessages = () => {
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetMessages();
    setLoading(true);

    try {
      if (isLoginMode) {
        const data = await loginUser(email, password);

        localStorage.setItem("token", data.token);

        const payload = JSON.parse(atob(data.token.split(".")[1]));

        localStorage.setItem("role", payload.role);

        // NOVO
        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: payload.id,
            email: payload.email,
            role: payload.role,
          }),
        );

        setMessage("Login realizado com sucesso.");

        setTimeout(() => {
          onAuthSuccess();
        }, 700);
      } else {
        await fetchData("/user", {
          method: "POST",
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });

        setMessage("Usuário cadastrado com sucesso. Agora faça login.");
        setIsLoginMode(true);
        setName("");
        setPassword("");
      }
    } catch (err) {
      setError(err.message || "Ocorreu um erro na autenticação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-panel">
      <div className="auth-card">
        <h2 className="auth-title">{isLoginMode ? "Login" : "Cadastro"}</h2>

        <p className="auth-subtitle">
          {isLoginMode
            ? "Entre para acessar seu perfil e começar a trocar roupas."
            : "Crie sua conta para publicar peças e encontrar novas trocas."}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLoginMode && (
            <input
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Processando..." : isLoginMode ? "Entrar" : "Cadastrar"}
          </button>
        </form>

        {message && <p className="auth-message success">{message}</p>}
        {error && <p className="auth-message error">{error}</p>}

        <div className="auth-toggle">
          <span>
            {isLoginMode ? "Ainda não tem conta?" : "Já possui uma conta?"}
          </span>

          <button
            type="button"
            className="toggle-btn"
            onClick={() => {
              resetMessages();
              setIsLoginMode(!isLoginMode);
            }}
          >
            {isLoginMode ? "Cadastre-se" : "Fazer login"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default AuthPanel;
