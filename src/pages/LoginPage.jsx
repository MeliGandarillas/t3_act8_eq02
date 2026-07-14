import { useState } from "react";
import alebrijeLogo from "../assets/icono.png";
import { loginUser } from "../services/authService";
import "../styles/login.css";
import "../styles/password-toggle.css";

function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
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

  function alternarPassword() {
    setMostrarPassword((valorActual) => !valorActual);
  }

  return (
    <div className="login-container">
      <form
        className="login-card"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="login-header">
          <img
            src={alebrijeLogo}
            alt="Alebrije de Manos de Oaxaca"
            className="login-logo-image"
          />

          <p className="login-title">
            Manos de Oaxaca
          </p>

          <p className="login-subtitle">
            Conecta con artesanos y sus talleres
          </p>
        </div>

        <label
          className="login-label"
          htmlFor="username"
        >
          Nombre de usuario
        </label>

        <input
          id="username"
          name="username"
          type="text"
          className="login-input"
          placeholder="Usuario"
          value={username}
          onChange={(event) =>
            setUsername(event.target.value)
          }
          autoComplete="username"
        />

        <label
          className="login-label"
          htmlFor="password"
        >
          Contraseña
        </label>

        <div className="login-password-wrapper">
          <input
            id="password"
            name="password"
            type={mostrarPassword ? "text" : "password"}
            className="login-input login-password-input"
            placeholder="••••••••"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            autoComplete="current-password"
          />

          <button
            type="button"
            className="login-password-toggle"
            onClick={alternarPassword}
            aria-label={
              mostrarPassword
                ? "Ocultar contraseña"
                : "Mostrar contraseña"
            }
            title={
              mostrarPassword
                ? "Ocultar contraseña"
                : "Mostrar contraseña"
            }
          >
            {mostrarPassword ? (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M3 3 21 21M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 4.2A10.8 10.8 0 0 1 12 4c5.2 0 9 4.7 9 8a7.6 7.6 0 0 1-2 3.9M6.6 6.7C4.3 8.1 3 10.3 3 12c0 3.3 3.8 8 9 8a9.7 9.7 0 0 0 4.1-.9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M3 12c0-3.3 3.8-8 9-8s9 4.7 9 8-3.8 8-9 8-9-4.7-9-8Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
            )}
          </button>
        </div>

        {errorMessage && (
          <p
            className="login-error"
            role="alert"
          >
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </button>

        <p className="login-register">
          Ingresa tus credenciales para acceder al sistema.
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
