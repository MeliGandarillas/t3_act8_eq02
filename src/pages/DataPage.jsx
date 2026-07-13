import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import Loading from "../components/Loading";
import { getTalleres } from "../services/api";
import "../styles/layout.css";
import "../styles/table.css";

function DataPage({ usuarioActivo, onLogout }) {
  const [opcionActiva, setOpcionActiva] = useState("panel");

  const [talleres, setTalleres] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarTalleres() {
      try {
        setCargando(true);
        setError("");

        const datos = await getTalleres();
        setTalleres(datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    }

    cargarTalleres();
  }, []);

  return (
    <div>
      <Navbar
        usuarioActivo={usuarioActivo}
        onLogout={onLogout}
      />

      <div className="app-layout">
        <Sidebar
          opcionActiva={opcionActiva}
          onCambiarOpcion={setOpcionActiva}
        />

        <div className="app-content">
          {opcionActiva === "panel" && (
            <h1>¡Bienvenido!</h1>
          )}

          {opcionActiva === "artesanos" && (
            <section>
              <h1>Artesanos registrados</h1>
              <p>Aquí irá la información de los artesanos.</p>
            </section>
          )}

          {opcionActiva === "talleres" && (
            <section className="data-page">
              <h1 className="data-title">
                Talleres artesanos registrados.
              </h1>

              {cargando && <Loading />}

              {!cargando && error && (
                <p className="error-message">{error}</p>
              )}

              {!cargando && !error && (
                <DataTable talleres={talleres} />
              )}
            </section>
          )}

          {opcionActiva === "resenas" && (
            <h1>Reseñas</h1>
          )}

          {opcionActiva === "ajustes" && (
            <h1>Ajustes</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default DataPage;