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
  onSubmit,
  isSubmitting,
  showSubmit = true,
  isSuccessModal = false,
}) {
  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Close modal when clicking on overlay
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCloseClick = () => {
    onClose();
  };

  // Don't render anything if modal is closed
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal" onClick={handleBackdropClick}>
      <div
        className={`modal__container ${
          isRegister ? "modal__container_register" : ""
        } ${isSuccessModal ? "modal__container_success" : ""}`}
      >
        {/* Close button */}
        <button
          className="modal__close-button"
          onClick={handleCloseClick}
          type="button"
          aria-label="Close modal"
        >
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>

        {/* Modal title (hidden for success-only modals) */}
        {!isSuccessModal && <h2 className="modal__title">{title}</h2>}

        {/* Content area: either a form with submit or simple content (used for success messages) */}
        {showSubmit ? (
          <form onSubmit={onSubmit} noValidate>
            {children}

            <button
              type="submit"
              className={`modal__submit-button ${
                isSubmitting ? "modal__submit-button_submitting" : ""
              }`}
              disabled={isSubmitting}
            >
              {buttonText}
            </button>
          </form>
        ) : (
          <div className="modal__content">{children}</div>
        )}

        {/* Link text (for switching between login/register) */}
        {linkText && <div className="modal__link-container">{linkText}</div>}
      </div>
    </div>
  );
}

export default ModalWithForm;

// TODO: Add focus management for accessibility
// TODO: Consider adding animation/transition effects
// TODO: Maybe add loading spinner inside submit button when submitting
