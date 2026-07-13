import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DataFilters from "../components/DataFilters";
import DataTable from "../components/DataTable";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";

import { getTalleres } from "../services/api";

import "../styles/layout.css";
import "../styles/table.css";

function DataPage({ usuarioActivo, onLogout }) {
  const [opcionActiva, setOpcionActiva] =
    useState("panel");

  const [talleres, setTalleres] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [busqueda, setBusqueda] = useState("");
  const [especialidad, setEspecialidad] =
    useState("");
  const [ubicacion, setUbicacion] = useState("");

  const [searchParams, setSearchParams] =
    useSearchParams();

  const paginaParametro = Number(
    searchParams.get("page")
  );

  const limiteParametro = Number(
    searchParams.get("limit")
  );

  const paginaActual =
    Number.isInteger(paginaParametro) &&
    paginaParametro > 0
      ? paginaParametro
      : 1;

  const limitesPermitidos = [10, 20, 40, 50];

  const limite = limitesPermitidos.includes(
    limiteParametro
  )
    ? limiteParametro
    : 10;

useEffect(() => {
  if (opcionActiva !== "talleres") {
    return;
  }

  async function cargarTalleres() {
    try {
      setCargando(true);
      setError("");

      const datos = await getTalleres();

      // Solo permite apreciar el Loading durante la prueba
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      setTalleres(datos);
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  }

  cargarTalleres();
}, [opcionActiva]);

  useEffect(() => {
    if (
      !searchParams.has("page") ||
      !searchParams.has("limit")
    ) {
      setSearchParams({
        page: String(paginaActual),
        limit: String(limite),
      });
    }
  }, [
    searchParams,
    setSearchParams,
    paginaActual,
    limite,
  ]);

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
    const texto = busqueda.trim().toLowerCase();

    return talleres.filter((taller) => {
      const coincideBusqueda =
        texto === "" ||
        taller.nombreTaller
          ?.toLowerCase()
          .includes(texto) ||
        taller.responsable
          ?.toLowerCase()
          .includes(texto);

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
  }, [
    talleres,
    busqueda,
    especialidad,
    ubicacion,
  ]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(talleresFiltrados.length / limite)
  );

  const paginaSegura = Math.min(
    paginaActual,
    totalPaginas
  );

  const indiceInicial =
    (paginaSegura - 1) * limite;

  const indiceFinal = indiceInicial + limite;

  const talleresPaginados =
    talleresFiltrados.slice(
      indiceInicial,
      indiceFinal
    );

  useEffect(() => {
    if (paginaActual > totalPaginas) {
      const nuevosParametros =
        new URLSearchParams(searchParams);

      nuevosParametros.set(
        "page",
        String(totalPaginas)
      );

      nuevosParametros.set(
        "limit",
        String(limite)
      );

      setSearchParams(nuevosParametros);
    }
  }, [
    paginaActual,
    totalPaginas,
    limite,
    searchParams,
    setSearchParams,
  ]);

  function cambiarPagina(nuevaPagina) {
    if (
      nuevaPagina < 1 ||
      nuevaPagina > totalPaginas
    ) {
      return;
    }

    const nuevosParametros =
      new URLSearchParams(searchParams);

    nuevosParametros.set(
      "page",
      String(nuevaPagina)
    );

    nuevosParametros.set(
      "limit",
      String(limite)
    );

    setSearchParams(nuevosParametros);
  }

  function cambiarLimite(nuevoLimite) {
    const nuevosParametros =
      new URLSearchParams(searchParams);

    nuevosParametros.set("page", "1");
    nuevosParametros.set(
      "limit",
      String(nuevoLimite)
    );

    setSearchParams(nuevosParametros);
  }

  function reiniciarPagina() {
    const nuevosParametros =
      new URLSearchParams(searchParams);

    nuevosParametros.set("page", "1");
    nuevosParametros.set(
      "limit",
      String(limite)
    );

    setSearchParams(nuevosParametros);
  }

  function cambiarBusqueda(valor) {
    setBusqueda(valor);
    reiniciarPagina();
  }

  function cambiarEspecialidad(valor) {
    setEspecialidad(valor);
    reiniciarPagina();
  }

  function cambiarUbicacion(valor) {
    setUbicacion(valor);
    reiniciarPagina();
  }

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

              <p>
                Selecciona una opción del menú
                lateral.
              </p>
            </section>
          )}

          {opcionActiva === "artesanos" && (
            <section>
              <h1>Artesanos registrados</h1>
            </section>
          )}

          {opcionActiva === "talleres" && (
            <section className="data-page">
              <h1 className="data-title">
                Talleres artesanos registrados.
              </h1>

              <DataFilters
                busqueda={busqueda}
                onCambiarBusqueda={
                  cambiarBusqueda
                }
                especialidad={especialidad}
                onCambiarEspecialidad={
                  cambiarEspecialidad
                }
                ubicacion={ubicacion}
                onCambiarUbicacion={
                  cambiarUbicacion
                }
                especialidades={
                  especialidades
                }
                ubicaciones={ubicaciones}
              />

              {cargando && (
                <Loading mensaje="Conectando con los talleres comunitarios..." />
              )}

              {!cargando && error && (
                <p className="error-message">
                  {error}
                </p>
              )}

              {!cargando && !error && (
                <>
                  <DataTable
                    talleres={talleresPaginados}
                  />

                  <Pagination
                    paginaActual={paginaSegura}
                    totalPaginas={totalPaginas}
                    limite={limite}
                    onCambiarPagina={
                      cambiarPagina
                    }
                    onCambiarLimite={
                      cambiarLimite
                    }
                  />
                </>
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