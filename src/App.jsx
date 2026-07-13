import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import DataPage from "./pages/DataPage";

function App() {
  const [usuarioActivo, setUsuarioActivo] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuarioActivo");
    if (usuarioGuardado) {
      setUsuarioActivo(JSON.parse(usuarioGuardado));
    }
  }, []);

  function handleLoginSuccess(userData) {
    setUsuarioActivo(userData);
  }

  function handleLogout() {
    localStorage.removeItem("usuarioActivo");
    setUsuarioActivo(null);
  }

  if (!usuarioActivo) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return <DataPage usuarioActivo={usuarioActivo} onLogout={handleLogout} />;
}

export default App;