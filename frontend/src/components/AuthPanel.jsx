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

        const payload = JSON.parse(
          atob(data.token.split(".")[1])
        );

        localStorage.setItem("role", payload.role);

        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: payload.id,
            email: payload.email,
            role: payload.role,
          })
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

        setMessage(
          "Usuário cadastrado com sucesso. Agora faça login."
        );

        setIsLoginMode(true);

        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError(
        err.message ||
          "Ocorreu um erro na autenticação."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-panel">
      {/* ESQUERDA */}
      <div className="auth-left">
        <img
          src="/logo_sem_fundo.png"
          alt="ReVeste Kids"
          className="auth-logo"
        />

        <div className="auth-left-content">
          {/* IMAGEM */}
          <div className="auth-preview-image">
            <img
              src="/card-login.png"
              alt="Preview ReVeste Kids"
            />
          </div>

          {/* TEXTO */}
          <h1 className="auth-title-big">
            <span className="line">Novas</span>

            <span className="line">
              fases da
            </span>

            <span className="line highlight">
              infância
            </span>

            <span className="line">
              <span className="highlight">
                circulando
              </span>

              <span className="dot">.</span>
            </span>
          </h1>
        </div>
      </div>

      {/* DIREITA */}
      <div className="auth-right">
        <div className="auth-card">
          <h2 className="auth-title">
            {isLoginMode
              ? "Entrar no ReVeste Kids"
              : "Criar conta"}
          </h2>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            {!isLoginMode && (
              <input
                type="text"
                placeholder="Nome completo"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />
            )}

            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Processando..."
                : isLoginMode
                ? "Entrar"
                : "Cadastrar"}
            </button>
          </form>

          {isLoginMode && (
            <button
              type="button"
              className="forgot-password"
            >
              Esqueceu a senha?
            </button>
          )}

          {message && (
            <p className="auth-message success">
              {message}
            </p>
          )}

          {error && (
            <p className="auth-message error">
              {error}
            </p>
          )}

          <div className="auth-toggle">
            <button
              type="button"
              className="toggle-btn"
              onClick={() => {
                resetMessages();
                setIsLoginMode(!isLoginMode);
              }}
            >
              {isLoginMode
                ? "Criar nova conta"
                : "Já tenho uma conta"}
            </button>
          </div>

          <div className="auth-brand">
            <img
              src="/ralky-white.png"
              alt="Ralky"
              className="brand-logo"
            />

            <span>Ralky</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthPanel;