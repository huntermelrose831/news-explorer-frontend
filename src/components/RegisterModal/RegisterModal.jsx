import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose }) {
  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign up"
      buttonText="Sign up"
    >
      <form className="modal__form">
        <label className="modal__label">
          Email
          <input
            type="email"
            className="modal__input"
            placeholder="Enter email"
          />
        </label>
        <label className="modal__label">
          Password
          <input
            type="password"
            className="modal__input"
            placeholder="Enter password"
          />
        </label>
        <label className="modal__label">
          Username
          <input
            type="text"
            className="modal__input"
            placeholder="Enter your username"
          />
        </label>
        <p className="modal__link-text">
          or{" "}
          <button type="button" className="modal__link">
            Sign in
          </button>
        </p>
      </form>
    </ModalWithForm>
  );
}

export default RegisterModal;
