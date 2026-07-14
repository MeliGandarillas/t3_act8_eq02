import { useState } from "react";
import { loginUser } from "../services/authService";
import icono from "../assets/icono.png";
import "../styles/login.css";

function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("Llena todos los campos");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      const userData = await loginUser(username, password);
      onLoginSuccess(userData);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <header className="login-header">
          <img
            src={icono}
            alt="Logo de Manos de Oaxaca"
            className="login-logo"
          />

          <h1 className="login-title">Manos de Oaxaca</h1>

          <p className="login-subtitle">
            Conecta con artesanos y sus talleres
          </p>
        </header>

        <div className="login-field">
          <label className="login-label" htmlFor="username">
            Nombre de usuario
          </label>

          <input
            id="username"
            type="text"
            className="login-input"
            placeholder="Usuario"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="login-field">
          <label className="login-label" htmlFor="password">
            Contraseña
          </label>

          <input
            id="password"
            type="password"
            className="login-input"
            placeholder="••••••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
        </div>

        {errorMessage && (
          <p className="login-error">{errorMessage}</p>
        )}

        <button
          type="submit"
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </button>

        <p className="login-help">
          Ingresa tus credenciales para acceder al sistema.
        </p>
      </form>
    </main>
  );
}

export default LoginPage;