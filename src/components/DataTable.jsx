function DataTable({ talleres, onEdit, onDelete }) {
  if (talleres.length === 0) {
    return (
      <p className="empty-message">
        No se encontraron talleres.
      </p>
    );
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Taller negocio</th>
            <th>Responsable</th>
            <th>Especialidad</th>
            <th>Ubicación</th>
            <th>Reseña</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {talleres.map((taller) => (
            <tr key={taller.id}>
              <td className="id-cell">
                {String(taller.id).padStart(3, "0")}
              </td>

              <td>
                <span className="table-chip">
                  {taller.nombreTaller}
                </span>
              </td>

              <td>{taller.responsable}</td>

              <td>
                <span className="table-chip">
                  {taller.especialidad}
                </span>
              </td>

              <td>{taller.ubicacion}</td>

              <td className="rating-cell">
                ★ {Number(taller.resenia).toFixed(1)}
              </td>

              <td>
                <div className="action-buttons">
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => onEdit?.(taller)}
                    title="Editar taller"
                  >
                    ✎
                  </button>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => onDelete?.(taller)}
                    title="Eliminar taller"
                  >
                    🗑
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;