function DataFilters({
  busqueda,
  onCambiarBusqueda,
  especialidad,
  onCambiarEspecialidad,
  ubicacion,
  onCambiarUbicacion,
  especialidades,
  ubicaciones,
}) {
  return (
    <div className="filters-container">
      <input
        type="text"
        className="search-input"
        placeholder="Buscar por taller..."
        value={busqueda}
        onChange={(event) => onCambiarBusqueda(event.target.value)}
      />

      <div className="select-filters">
        <select
          className="filter-select"
          value={especialidad}
          onChange={(event) =>
            onCambiarEspecialidad(event.target.value)
          }
        >
          <option value="">
            Filtrar por especialidad: todos
          </option>

          {especialidades.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>

        <select
          className="filter-select"
          value={ubicacion}
          onChange={(event) =>
            onCambiarUbicacion(event.target.value)
          }
        >
          <option value="">
            Filtrar por ubicación: todos
          </option>

          {ubicaciones.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default DataFilters;