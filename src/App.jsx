import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import DataPage from "./pages/DataPage";

function obtenerUsuarioGuardado() {
  try {
    const usuarioGuardado =
      localStorage.getItem("usuarioActivo");

    return usuarioGuardado
      ? JSON.parse(usuarioGuardado)
      : null;
  } catch {
    localStorage.removeItem("usuarioActivo");
    return null;
  }
}

function App() {
  const [usuarioActivo, setUsuarioActivo] =
    useState(obtenerUsuarioGuardado);

  function handleLoginSuccess(userData) {
    localStorage.setItem(
      "usuarioActivo",
      JSON.stringify(userData)
    );

    setUsuarioActivo(userData);
  }

  function handleLogout() {
    localStorage.removeItem("usuarioActivo");
    setUsuarioActivo(null);
  }

  if (!usuarioActivo) {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  return (
    <DataPage
      usuarioActivo={usuarioActivo}
      onLogout={handleLogout}
    />
  );
}

export default App;