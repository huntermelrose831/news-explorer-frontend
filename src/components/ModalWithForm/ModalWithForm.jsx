import { useEffect } from 'react';
import './ModalWithForm.css';

function ModalWithForm({ isOpen, onClose, title, children, buttonText }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
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
      <div className="modal__container">
        <button className="modal__close-button" onClick={onClose}>✕</button>
        <h2 className="modal__title">{title}</h2>
        {children}
        <button className="modal__submit-button">{buttonText}</button>
      </div>
    </div>
  );
}

export default ModalWithForm;
