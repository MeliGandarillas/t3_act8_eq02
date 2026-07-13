function Pagination({
  paginaActual,
  totalPaginas,
  limite,
  onCambiarPagina,
  onCambiarLimite,
}) {
  const paginas = Array.from(
    { length: totalPaginas },
    (_, index) => index + 1
  );

  return (
    <div className="pagination-container">
      <div className="pagination-navigation">
        <button
          type="button"
          className="pagination-arrow"
          disabled={paginaActual === 1}
          onClick={() => onCambiarPagina(paginaActual - 1)}
        >
          ←
        </button>

        <button
          type="button"
          className="pagination-arrow"
          disabled={paginaActual === totalPaginas}
          onClick={() => onCambiarPagina(paginaActual + 1)}
        >
          →
        </button>
      </div>

      <div className="pagination-controls">
        <select
          className="pagination-limit"
          value={limite}
          onChange={(event) =>
            onCambiarLimite(Number(event.target.value))
          }
        >
          <option value="10">10/pág</option>
          <option value="20">20/pág</option>
          <option value="40">40/pág</option>
          <option value="50">50/pág</option>
        </select>

        <div className="pagination-pages">
          {paginas.map((pagina) => (
            <button
              key={pagina}
              type="button"
              className={
                pagina === paginaActual
                  ? "page-button active"
                  : "page-button"
              }
              onClick={() => onCambiarPagina(pagina)}
            >
              {pagina}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pagination;