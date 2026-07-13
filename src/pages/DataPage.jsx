import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DataFilters from "../components/DataFilters";
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

  const [busqueda, setBusqueda] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [ubicacion, setUbicacion] = useState("");

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

  const especialidades = useMemo(() => {
    return [
      ...new Set(
        talleres
          .map((taller) => taller.especialidad)
          .filter(Boolean)
      ),
    ].sort();
  }, [talleres]);

  const ubicaciones = useMemo(() => {
    return [
      ...new Set(
        talleres
          .map((taller) => taller.ubicacion)
          .filter(Boolean)
      ),
    ].sort();
  }, [talleres]);

  const talleresFiltrados = useMemo(() => {
    const textoBusqueda = busqueda.trim().toLowerCase();

    return talleres.filter((taller) => {
      const coincideBusqueda =
        textoBusqueda === "" ||
        taller.nombreTaller
          ?.toLowerCase()
          .includes(textoBusqueda) ||
        taller.responsable
          ?.toLowerCase()
          .includes(textoBusqueda);

      const coincideEspecialidad =
        especialidad === "" ||
        taller.especialidad === especialidad;

      const coincideUbicacion =
        ubicacion === "" ||
        taller.ubicacion === ubicacion;

      return (
        coincideBusqueda &&
        coincideEspecialidad &&
        coincideUbicacion
      );
    });
  }, [talleres, busqueda, especialidad, ubicacion]);

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

        <main className="app-content">
          {opcionActiva === "panel" && (
            <section>
              <h1>¡Bienvenido!</h1>
              <p>Selecciona una opción del menú lateral.</p>
            </section>
          )}

          {opcionActiva === "artesanos" && (
            <section>
              <h1>Artesanos registrados</h1>
              <p>
                Aquí irá la información de los artesanos.
              </p>
            </section>
          )}

          {opcionActiva === "talleres" && (
            <section className="data-page">
              <h1 className="data-title">
                Talleres artesanos registrados.
              </h1>

              <DataFilters
                busqueda={busqueda}
                onCambiarBusqueda={setBusqueda}
                especialidad={especialidad}
                onCambiarEspecialidad={setEspecialidad}
                ubicacion={ubicacion}
                onCambiarUbicacion={setUbicacion}
                especialidades={especialidades}
                ubicaciones={ubicaciones}
              />

              {cargando && <Loading />}

              {!cargando && error && (
                <p className="error-message">
                  {error}
                </p>
              )}

              {!cargando && !error && (
                <DataTable
                  talleres={talleresFiltrados}
                />
              )}
            </section>
          )}

          {opcionActiva === "resenas" && (
            <section>
              <h1>Reseñas</h1>
            </section>
          )}

          {opcionActiva === "ajustes" && (
            <section>
              <h1>Ajustes</h1>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default DataPage;