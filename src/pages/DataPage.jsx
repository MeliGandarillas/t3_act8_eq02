import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DataFilters from "../components/DataFilters";
import DataTable from "../components/DataTable";
import DataForm from "../components/DataForm";
import DialogoConfirmacion from "../components/DialogoConfirmacion";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import PanelResumen from "../components/PanelResumen";
import ListaArtesanos from "../components/ListaArtesanos";

import {
  createTaller,
  getTalleres,
  updateTaller,
} from "../services/api";

import "../styles/layout.css";
import "../styles/table.css";
import "../styles/dashboard.css";

const confirmacionInicial = {
  isOpen: false,
  tipo: "",
  taller: null,
};

function DataPage({ usuarioActivo, onLogout }) {
  const [opcionActiva, setOpcionActiva] = useState("panel");
  const [talleres, setTalleres] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const [busqueda, setBusqueda] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  const [modalFormularioAbierto, setModalFormularioAbierto] = useState(false);
  const [tallerSeleccionado, setTallerSeleccionado] = useState(null);
  const [confirmacion, setConfirmacion] = useState(confirmacionInicial);
  const [procesando, setProcesando] = useState(false);
  const [notificacion, setNotificacion] = useState(null);
  const [errorFormulario, setErrorFormulario] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const paginaParametro = Number(searchParams.get("page"));
  const limiteParametro = Number(searchParams.get("limit"));

  const paginaActual =
    Number.isInteger(paginaParametro) && paginaParametro > 0
      ? paginaParametro
      : 1;

  const limitesPermitidos = [10, 20, 40, 50];

  const limite = limitesPermitidos.includes(limiteParametro)
    ? limiteParametro
    : 10;

  useEffect(() => {
    async function cargarTalleres() {
      try {
        setCargando(true);
        setError("");
        const datos = await getTalleres();
        setTalleres(datos);
      } catch (errorCarga) {
        setError(errorCarga.message);
      } finally {
        setCargando(false);
      }
    }

    cargarTalleres();
  }, []);

  useEffect(() => {
    if (!searchParams.has("page") || !searchParams.has("limit")) {
      setSearchParams({
        page: String(paginaActual),
        limit: String(limite),
      });
    }
  }, [searchParams, setSearchParams, paginaActual, limite]);

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
        talleres.map((taller) => taller.ubicacion).filter(Boolean)
      ),
    ].sort();
  }, [talleres]);

  const resumenEspecialidades = useMemo(() => {
    const conteo = new Map();

    talleres.forEach((taller) => {
      const nombre = taller.especialidad?.trim() || "Sin especialidad";
      conteo.set(nombre, (conteo.get(nombre) ?? 0) + 1);
    });

    return [...conteo.entries()]
      .map(([nombre, total]) => ({ nombre, total }))
      .sort((a, b) =>
        b.total !== a.total
          ? b.total - a.total
          : a.nombre.localeCompare(b.nombre, "es")
      );
  }, [talleres]);

  const artesanos = useMemo(() => {
    const responsables = new Map();

    talleres.forEach((taller) => {
      const nombre = taller.responsable?.trim();

      if (!nombre) {
        return;
      }

      const clave = nombre.toLocaleLowerCase("es-MX");
      const artesanoActual = responsables.get(clave) ?? {
        clave,
        nombre,
        totalTalleres: 0,
        especialidades: new Set(),
        ubicaciones: new Set(),
      };

      artesanoActual.totalTalleres += 1;

      if (taller.especialidad?.trim()) {
        artesanoActual.especialidades.add(taller.especialidad.trim());
      }

      if (taller.ubicacion?.trim()) {
        artesanoActual.ubicaciones.add(taller.ubicacion.trim());
      }

      responsables.set(clave, artesanoActual);
    });

    return [...responsables.values()]
      .map((artesano) => ({
        ...artesano,
        especialidades: [...artesano.especialidades].sort((a, b) =>
          a.localeCompare(b, "es")
        ),
        ubicaciones: [...artesano.ubicaciones].sort((a, b) =>
          a.localeCompare(b, "es")
        ),
      }))
      .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
  }, [talleres]);

  const talleresFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return talleres.filter((taller) => {
      const coincideBusqueda =
        texto === "" ||
        taller.nombreTaller?.toLowerCase().includes(texto) ||
        taller.responsable?.toLowerCase().includes(texto);

      const coincideEspecialidad =
        especialidad === "" || taller.especialidad === especialidad;

      const coincideUbicacion =
        ubicacion === "" || taller.ubicacion === ubicacion;

      return (
        coincideBusqueda && coincideEspecialidad && coincideUbicacion
      );
    });
  }, [talleres, busqueda, especialidad, ubicacion]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(talleresFiltrados.length / limite)
  );

  const paginaSegura = Math.min(paginaActual, totalPaginas);
  const indiceInicial = (paginaSegura - 1) * limite;
  const indiceFinal = indiceInicial + limite;
  const talleresPaginados = talleresFiltrados.slice(
    indiceInicial,
    indiceFinal
  );

  useEffect(() => {
    if (paginaActual > totalPaginas) {
      const nuevosParametros = new URLSearchParams(searchParams);
      nuevosParametros.set("page", String(totalPaginas));
      nuevosParametros.set("limit", String(limite));
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
    if (nuevaPagina < 1 || nuevaPagina > totalPaginas) {
      return;
    }

    const nuevosParametros = new URLSearchParams(searchParams);
    nuevosParametros.set("page", String(nuevaPagina));
    nuevosParametros.set("limit", String(limite));
    setSearchParams(nuevosParametros);
  }

  function cambiarLimite(nuevoLimite) {
    const nuevosParametros = new URLSearchParams(searchParams);
    nuevosParametros.set("page", "1");
    nuevosParametros.set("limit", String(nuevoLimite));
    setSearchParams(nuevosParametros);
  }

  function reiniciarPagina() {
    const nuevosParametros = new URLSearchParams(searchParams);
    nuevosParametros.set("page", "1");
    nuevosParametros.set("limit", String(limite));
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

  function abrirFormularioNuevo() {
    setTallerSeleccionado(null);
    setNotificacion(null);
    setErrorFormulario("");
    setModalFormularioAbierto(true);
  }

  function cerrarFormulario() {
    if (procesando) {
      return;
    }

    setModalFormularioAbierto(false);
    setTallerSeleccionado(null);
    setErrorFormulario("");
  }

  function solicitarEdicion(taller) {
    setNotificacion(null);
    setConfirmacion({
      isOpen: true,
      tipo: "editar",
      taller,
    });
  }

  function solicitarEliminacion(taller) {
    setNotificacion(null);
    setConfirmacion({
      isOpen: true,
      tipo: "eliminar",
      taller,
    });
  }

  function cancelarConfirmacion() {
    if (!procesando) {
      setConfirmacion(confirmacionInicial);
    }
  }

  function confirmarAccion() {
    if (!confirmacion.taller) {
      return;
    }

    if (confirmacion.tipo === "editar") {
      setTallerSeleccionado(confirmacion.taller);
      setErrorFormulario("");
      setConfirmacion(confirmacionInicial);
      setModalFormularioAbierto(true);
      return;
    }

    if (confirmacion.tipo === "eliminar") {
      const idTallerEliminado = confirmacion.taller.id;

      setTalleres((talleresActuales) =>
        talleresActuales.filter(
          (taller) => String(taller.id) !== String(idTallerEliminado)
        )
      );

      setNotificacion({
        tipo: "exito",
        texto:
          "Taller eliminado temporalmente. Volverá a aparecer al recargar la página.",
      });

      setConfirmacion(confirmacionInicial);
    }
  }

  async function guardarTaller(datosFormulario) {
    try {
      setProcesando(true);
      setNotificacion(null);
      setErrorFormulario("");

      if (tallerSeleccionado) {
        const tallerActualizado = await updateTaller(
          tallerSeleccionado.id,
          datosFormulario
        );

        setTalleres((talleresActuales) =>
          talleresActuales.map((taller) =>
            String(taller.id) === String(tallerSeleccionado.id)
              ? tallerActualizado
              : taller
          )
        );

        setNotificacion({
          tipo: "exito",
          texto: "Taller actualizado correctamente.",
        });
      } else {
        const tallerCreado = await createTaller(datosFormulario);

        setTalleres((talleresActuales) => [
          tallerCreado,
          ...talleresActuales,
        ]);

        reiniciarPagina();
        setNotificacion({
          tipo: "exito",
          texto: "Taller agregado correctamente.",
        });
      }

      setModalFormularioAbierto(false);
      setTallerSeleccionado(null);
    } catch (errorGuardado) {
      setErrorFormulario(errorGuardado.message);
    } finally {
      setProcesando(false);
    }
  }

  const tituloConfirmacion =
    confirmacion.tipo === "eliminar"
      ? "Confirmar eliminación"
      : "Confirmar edición";

  const mensajeConfirmacion =
    confirmacion.tipo === "eliminar"
      ? `¿Seguro que deseas eliminar el taller “${
          confirmacion.taller?.nombreTaller ?? ""
        }”?`
      : `¿Deseas editar el taller “${
          confirmacion.taller?.nombreTaller ?? ""
        }”?`;

  return (
    <div>
      <Navbar usuarioActivo={usuarioActivo} onLogout={onLogout} />

      <div className="app-layout">
        <Sidebar
          opcionActiva={opcionActiva}
          onCambiarOpcion={setOpcionActiva}
        />

        <main className="app-content">
          {opcionActiva === "panel" && (
            <PanelResumen
              talleres={talleres}
              artesanos={artesanos}
              especialidades={resumenEspecialidades}
              cargando={cargando}
              error={error}
            />
          )}

          {opcionActiva === "artesanos" && (
            <ListaArtesanos
              artesanos={artesanos}
              cargando={cargando}
              error={error}
            />
          )}

          {opcionActiva === "talleres" && (
            <section className="data-page">
              <div className="data-header">
                <h1 className="data-title">
                  Talleres artesanos registrados
                </h1>

                <button
                  type="button"
                  className="add-button"
                  onClick={abrirFormularioNuevo}
                >
                  + Agregar taller
                </button>
              </div>

              {notificacion && (
                <p
                  className={
                    notificacion.tipo === "exito"
                      ? "status-message success-message"
                      : "status-message action-error-message"
                  }
                >
                  {notificacion.texto}
                </p>
              )}

              <DataFilters
                busqueda={busqueda}
                onCambiarBusqueda={cambiarBusqueda}
                especialidad={especialidad}
                onCambiarEspecialidad={cambiarEspecialidad}
                ubicacion={ubicacion}
                onCambiarUbicacion={cambiarUbicacion}
                especialidades={especialidades}
                ubicaciones={ubicaciones}
              />

              {cargando && (
                <Loading mensaje="Conectando con los talleres comunitarios..." />
              )}

              {!cargando && error && (
                <p className="error-message">{error}</p>
              )}

              {!cargando && !error && (
                <>
                  <DataTable
                    talleres={talleresPaginados}
                    onEdit={solicitarEdicion}
                    onDelete={solicitarEliminacion}
                  />

                  <Pagination
                    paginaActual={paginaSegura}
                    totalPaginas={totalPaginas}
                    limite={limite}
                    onCambiarPagina={cambiarPagina}
                    onCambiarLimite={cambiarLimite}
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

      <Modal
        isOpen={modalFormularioAbierto}
        title={tallerSeleccionado ? "Editar taller" : "Agregar taller"}
        onClose={cerrarFormulario}
      >
        <DataForm
          key={tallerSeleccionado?.id ?? "nuevo"}
          taller={tallerSeleccionado}
          onGuardar={guardarTaller}
          onCancelar={cerrarFormulario}
          guardando={procesando}
          errorEnvio={errorFormulario}
        />
      </Modal>

      <DialogoConfirmacion
        isOpen={confirmacion.isOpen}
        title={tituloConfirmacion}
        mensaje={mensajeConfirmacion}
        onConfirm={confirmarAccion}
        onCancel={cancelarConfirmacion}
        esPeligroso={confirmacion.tipo === "eliminar"}
        procesando={procesando}
      />
    </div>
  );
}

export default DataPage;