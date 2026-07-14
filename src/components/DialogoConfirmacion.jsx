import Modal from "./Modal";
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
  return (
    <Modal isOpen={isOpen} title={title} onClose={onCancel}>
      <p className="confirm-message">{mensaje}</p>

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
          {procesando ? "Procesando..." : "Confirmar"}
        </button>
      </div>
    </Modal>
  );
}

export default DialogoConfirmacion;
