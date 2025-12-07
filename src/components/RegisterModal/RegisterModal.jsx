import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign up"
      buttonText="Sign up"
      linkText={
        <p className="modal__link-text">
          or{" "}
          <button
            type="button"
            className="modal__link"
            onClick={onSwitchToLogin}
          >
            Sign in
          </button>
        </p>
      }
      isRegister={true}
    >
      <form className="modal__form">
        <label className="modal__label">
          <span className="modal__label-text">Email</span>
          <input
            type="email"
            className="modal__input"
            placeholder="Enter email"
            required
          />
        </label>
        <label className="modal__label">
          <span className="modal__label-text">Password</span>
          <input
            type="password"
            className="modal__input"
            placeholder="Enter password"
            required
          />
        </label>
        <label className="modal__label">
          <span className="modal__label-text">Username</span>
          <input
            type="text"
            className="modal__input"
            placeholder="Enter your username"
            required
          />
        </label>
      </form>
    </ModalWithForm>
  );
}

export default RegisterModal;
