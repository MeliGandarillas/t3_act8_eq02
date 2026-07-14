
import Modal from './Modal';
import '../styles/modal.css';

const ConfirmDialog = ({ isOpen, title, mensaje, onConfirm, onCancel, esPeligroso = false }) => {
  return (
    <Modal isOpen={isOpen} title={title} onClose={onCancel}>
      <p className="confirm-message">{mensaje}</p>
      <div className="modal-actions">
        <button className="modal-btn modal-btn-cancelar" onClick={onCancel}>
          Cancelar
        </button>
        <button
          className={esPeligroso ? "modal-btn modal-btn-peligro" : "modal-btn modal-btn-confirmar"}
          onClick={onConfirm}
        >
          Confirmar
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;