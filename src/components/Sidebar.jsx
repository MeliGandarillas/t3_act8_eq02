import "../styles/layout.css";

const opcionesMenu = [
  { id: "panel", texto: "Panel" },
  { id: "artesanos", texto: "Artesanos" },
  { id: "talleres", texto: "Talleres" },
  { id: "resenas", texto: "Reseñas" },
  { id: "ajustes", texto: "Ajustes" },
];

function Sidebar({ opcionActiva, onCambiarOpcion }) {
  return (
    <nav className="sidebar" aria-label="Menú principal">
      {opcionesMenu.map((opcion) => (
        <button
          type="button"
          key={opcion.id}
          className={
            opcion.id === opcionActiva
              ? "sidebar-item activo"
              : "sidebar-item"
          }
          onClick={() => onCambiarOpcion(opcion.id)}
        >
          {opcion.texto}
        </button>
      ))}
    </nav>
  );
}

export default Sidebar;
