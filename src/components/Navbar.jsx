import "../styles/layout.css";

function Navbar({usuarioActivo, onLogout }) {
  return (
    <div className="navbar">
      <div className="navbar-brand">
        <span className="navbar-title">Manos de Oaxaca</span>
      </div>
      <div className="navbar-user">
        <span className="navbar-greeting">Hola, {usuarioActivo.firstName}!</span>
        <img
          src={usuarioActivo.image}
          alt="Foto de perfil"
          className="navbar-avatar"
        />
        <button className="navbar-logout" onClick={onLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default Navbar;