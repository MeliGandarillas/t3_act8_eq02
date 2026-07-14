import Loading from "./Loading";

function ListaArtesanos({ artesanos, cargando, error }) {
  if (cargando) {
    return (
      <Loading mensaje="Consultando la lista de artesanos registrados..." />
    );
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <section className="artisans-page">
      <div className="artisans-heading">
        <div>
          <h1>Artesanos registrados</h1>
          <p>
            Responsables encontrados en el catálogo de talleres de Oaxaca.
          </p>
        </div>

        <span className="artisans-total">
          {artesanos.length} {artesanos.length === 1 ? "artesano" : "artesanos"}
        </span>
      </div>

      {artesanos.length === 0 ? (
        <p className="dashboard-empty">
          No hay artesanos registrados.
        </p>
      ) : (
        <div className="artisans-table-container">
          <table className="artisans-table">
            <thead>
              <tr>
                <th>N.º</th>
                <th>Artesano responsable</th>
                <th>Talleres</th>
                <th>Especialidades</th>
                <th>Ubicaciones</th>
              </tr>
            </thead>

            <tbody>
              {artesanos.map((artesano, indice) => (
                <tr key={artesano.clave}>
                  <td className="artisan-index">
                    {String(indice + 1).padStart(2, "0")}
                  </td>

                  <td>
                    <strong className="artisan-name">
                      {artesano.nombre}
                    </strong>
                  </td>

                  <td>
                    <span className="artisan-workshop-count">
                      {artesano.totalTalleres}
                    </span>
                  </td>

                  <td>
                    <div className="artisan-tags">
                      {artesano.especialidades.map((especialidad) => (
                        <span
                          className="artisan-tag"
                          key={`${artesano.clave}-${especialidad}`}
                        >
                          {especialidad}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td>{artesano.ubicaciones.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ListaArtesanos;
