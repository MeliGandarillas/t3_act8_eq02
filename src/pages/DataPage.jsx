import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/layout.css";

function DataPage({ usuarioActivo, onLogout }) {
  const [opcionActiva, setOpcionActiva] = useState("panel");

  return (
    <div>
      <Navbar usuarioActivo={usuarioActivo} onLogout={onLogout} />
      <div className="app-layout">
        <Sidebar opcionActiva={opcionActiva} onCambiarOpcion={setOpcionActiva} />
        <div className="app-content">
          {opcionActiva === "panel" && <h1>Bienvenido!</h1>}
          {opcionActiva === "artesanos" && <p>Aquí va la tabla (DataTable, DataFilters, Pagination)</p>}
        </div>
      </div>
    </div>
  );
}

export default DataPage;