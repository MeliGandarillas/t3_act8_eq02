import { useState } from "react";

const datosIniciales = {
  nombreTaller: "",
  responsable: "",
  especialidad: "",
  ubicacion: "",
  resenia: "",
};

function DataForm({
  taller,
  onGuardar,
  onCancelar,
  guardando,
  errorEnvio,
}) {
  const [formulario, setFormulario] = useState(
    taller
      ? {
          nombreTaller: taller.nombreTaller ?? "",
          responsable: taller.responsable ?? "",
          especialidad: taller.especialidad ?? "",
          ubicacion: taller.ubicacion ?? "",
          resenia: taller.resenia ?? "",
        }
      : datosIniciales
  );

  const [errores, setErrores] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setFormulario((datosActuales) => ({
      ...datosActuales,
      [name]: value,
    }));

    setErrores((erroresActuales) => ({
      ...erroresActuales,
      [name]: "",
    }));
  }

  function validarFormulario() {
    const nuevosErrores = {};
    const reseniaNumerica =
      Number(formulario.resenia);

    if (!formulario.nombreTaller.trim()) {
      nuevosErrores.nombreTaller =
        "Escribe el nombre del taller.";
    }

    if (!formulario.responsable.trim()) {
      nuevosErrores.responsable =
        "Escribe el nombre del responsable.";
    }

    if (!formulario.especialidad.trim()) {
      nuevosErrores.especialidad =
        "Escribe la especialidad.";
    }

    if (!formulario.ubicacion.trim()) {
      nuevosErrores.ubicacion =
        "Escribe la ubicación.";
    }

    if (formulario.resenia === "") {
      nuevosErrores.resenia =
        "Escribe una reseña del 1 al 5.";
    } else if (
      Number.isNaN(reseniaNumerica) ||
      reseniaNumerica < 1 ||
      reseniaNumerica > 5
    ) {
      nuevosErrores.resenia =
        "La reseña debe estar entre 1 y 5.";
    }

    setErrores(nuevosErrores);

    return (
      Object.keys(nuevosErrores).length === 0
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    onGuardar({
      nombreTaller:
        formulario.nombreTaller.trim(),
      responsable:
        formulario.responsable.trim(),
      especialidad:
        formulario.especialidad.trim(),
      ubicacion: formulario.ubicacion.trim(),
      resenia: Number(formulario.resenia),
    });
  }

  return (
    <form
      className="data-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="form-grid">
        <div className="form-group form-group-full">
          <label
            className="form-label"
            htmlFor="nombreTaller"
          >
            Nombre del taller
          </label>

          <input
            id="nombreTaller"
            name="nombreTaller"
            className="form-input"
            value={formulario.nombreTaller}
            onChange={handleChange}
            disabled={guardando}
          />

          {errores.nombreTaller && (
            <span className="form-error">
              {errores.nombreTaller}
            </span>
          )}
        </div>

        <div className="form-group form-group-full">
          <label
            className="form-label"
            htmlFor="responsable"
          >
            Responsable
          </label>

          <input
            id="responsable"
            name="responsable"
            className="form-input"
            value={formulario.responsable}
            onChange={handleChange}
            disabled={guardando}
          />

          {errores.responsable && (
            <span className="form-error">
              {errores.responsable}
            </span>
          )}
        </div>

        <div className="form-group">
          <label
            className="form-label"
            htmlFor="especialidad"
          >
            Especialidad
          </label>

          <input
            id="especialidad"
            name="especialidad"
            className="form-input"
            value={formulario.especialidad}
            onChange={handleChange}
            disabled={guardando}
          />

          {errores.especialidad && (
            <span className="form-error">
              {errores.especialidad}
            </span>
          )}
        </div>

        <div className="form-group">
          <label
            className="form-label"
            htmlFor="ubicacion"
          >
            Ubicación
          </label>

          <input
            id="ubicacion"
            name="ubicacion"
            className="form-input"
            value={formulario.ubicacion}
            onChange={handleChange}
            disabled={guardando}
          />

          {errores.ubicacion && (
            <span className="form-error">
              {errores.ubicacion}
            </span>
          )}
        </div>

        <div className="form-group">
          <label
            className="form-label"
            htmlFor="resenia"
          >
            Reseña
          </label>

          <input
            id="resenia"
            name="resenia"
            type="number"
            min="1"
            max="5"
            step="0.1"
            className="form-input"
            value={formulario.resenia}
            onChange={handleChange}
            disabled={guardando}
          />

          {errores.resenia && (
            <span className="form-error">
              {errores.resenia}
            </span>
          )}
        </div>
      </div>

      {errorEnvio && (
        <p className="form-submit-error">
          {errorEnvio}
        </p>
      )}

      <div className="form-actions">
        <button
          type="button"
          className="form-button form-button-cancelar"
          onClick={onCancelar}
          disabled={guardando}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="form-button form-button-guardar"
          disabled={guardando}
        >
          {guardando
            ? "Guardando..."
            : "Guardar taller"}
        </button>
      </div>
    </form>
  );
}

export default DataForm;