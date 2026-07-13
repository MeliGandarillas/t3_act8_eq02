import { useState } from "react";
import { loginUser } from "../services/authService";
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
      localStorage.setItem("usuarioActivo", JSON.stringify(userData));
      onLoginSuccess(userData);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-header">
          <p className="login-title">Manos de Oaxaca</p>
          <p className="login-subtitle">Conecta con artesanos y sus talleres</p>
        </div>

        <label className="login-label">Nombre de usuario:</label>
        <input
          type="text"
          className="login-input"
          placeholder="Usuario"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label className="login-label">Contraseña:</label>
        <input
          type="password"
          className="login-input"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {errorMessage && <p className="login-error">{errorMessage}</p>}

        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;