
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
    <div className="sidebar">
      {opcionesMenu.map((opcion) => (
        <div
          key={opcion.id}
          className={opcion.id === opcionActiva ? "sidebar-item activo" : "sidebar-item"}
          onClick={() => onCambiarOpcion(opcion.id)}
        >
          {opcion.texto}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;