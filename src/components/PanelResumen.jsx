import Loading from "./Loading";

function PanelResumen({ talleres, artesanos, especialidades, cargando, error }) {
  if (cargando) {
    return (
      <Loading mensaje="Consultando el resumen de talleres artesanales..." />
    );
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <section className="dashboard-page">
      <div className="dashboard-heading">
        <h1>¡Bienvenido!</h1>
        <p>Resumen del catálogo artesanal de Manos de Oaxaca.</p>
      </div>

      <div className="summary-cards">
        <article className="summary-card">
          <span className="summary-label">Talleres registrados</span>
          <strong className="summary-number">{talleres.length}</strong>
          <span className="summary-description">
            Talleres disponibles en el catálogo
          </span>
        </article>

        <article className="summary-card">
          <span className="summary-label">Artesanos registrados</span>
          <strong className="summary-number">{artesanos.length}</strong>
          <span className="summary-description">
            Responsables únicos de los talleres
          </span>
        </article>

        <article className="summary-card">
          <span className="summary-label">Especialidades</span>
          <strong className="summary-number">{especialidades.length}</strong>
          <span className="summary-description">
            Categorías artesanales diferentes
          </span>
        </article>
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <h2>Categorías y especialidades</h2>
            <p>Cantidad de talleres registrados en cada especialidad.</p>
          </div>
        </div>

        {especialidades.length === 0 ? (
          <p className="dashboard-empty">
            No hay especialidades registradas.
          </p>
        ) : (
          <div className="specialty-list">
            {especialidades.map((especialidad) => (
              <article
                className="specialty-item"
                key={especialidad.nombre}
              >
                <div>
                  <h3>{especialidad.nombre}</h3>
                  <p>
                    {especialidad.total === 1
                      ? "1 taller registrado"
                      : `${especialidad.total} talleres registrados`}
                  </p>
                </div>

                <span className="specialty-count">
                  {especialidad.total}
                </span>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default PanelResumen;
