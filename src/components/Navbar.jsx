import icono from "../assets/icono.png";
import "../styles/layout.css";

function Navbar({ usuarioActivo, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img
          src={icono}
          alt="Logo de Manos de Oaxaca"
          className="navbar-logo"
        />

        <span className="navbar-title">
          Manos de Oaxaca
        </span>
      </div>

      <div className="navbar-user">
        <span className="navbar-greeting">
          Hola, {usuarioActivo.firstName}!
        </span>

        <img
          src={usuarioActivo.image}
          alt="Foto de perfil"
          className="navbar-avatar"
        />

        <button
          type="button"
          className="navbar-logout"
          onClick={onLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;