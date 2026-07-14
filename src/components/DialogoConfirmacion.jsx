import "../styles/modal.css";

function DialogoConfirmacion({
  isOpen,
  title,
  mensaje,
  onConfirm,
  onCancel,
  esPeligroso = false,
  procesando = false,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onMouseDown={onCancel}
    >
      <div
        className="modal-content modal-confirmacion"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-confirmacion"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2
            id="titulo-confirmacion"
            className="modal-title"
          >
            {title}
          </h2>

          <button
            type="button"
            className="modal-close"
            onClick={onCancel}
            disabled={procesando}
            aria-label="Cerrar confirmación"
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-message">
            {mensaje}
          </p>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className="modal-btn modal-btn-cancelar"
            onClick={onCancel}
            disabled={procesando}
          >
            Cancelar
          </button>

          <button
            type="button"
            className={
              esPeligroso
                ? "modal-btn modal-btn-peligro"
                : "modal-btn modal-btn-confirmar"
            }
            onClick={onConfirm}
            disabled={procesando}
          >
            {procesando
              ? "Procesando..."
              : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DialogoConfirmacion;