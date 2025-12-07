import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign in"
      buttonText="Sign in"
      linkText={
        <p className="modal__link-text">
          or{" "}
          <button
            type="button"
            className="modal__link"
            onClick={onSwitchToRegister}
          >
            Sign up
          </button>
        </p>
      }
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
      </form>
    </ModalWithForm>
  );
}

export default LoginModal;
