import "../styles/modal.css";

function Modal({ isOpen, title, children, onClose }) {
  if (!isOpen) {
    return null;
  }

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            {title}
          </h2>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <div className="modal-body">{children}</div>
      </section>
    </div>
  );
}

export default Modal;
