import { useEffect } from "react";
import "./ModalWithForm.css";
import closeIcon from "../../assets/close.svg";

function ModalWithForm({
  isOpen,
  onClose,
  title,
  children,
  buttonText,
  linkText,
  isRegister,
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div
        className={`modal__container ${
          isRegister ? "modal__container_register" : ""
        }`}
      >
        <button className="modal__close-button" onClick={onClose}>
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <h2 className="modal__title">{title}</h2>
        {children}
        <button className="modal__submit-button">{buttonText}</button>
        {linkText && <div className="modal__link-container">{linkText}</div>}
      </div>
    </div>
  );
}

export default ModalWithForm;
