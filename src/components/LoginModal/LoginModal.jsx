import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (value) => {
    if (!value) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Invalid email address";
    }
    return "";
  };

  const validatePassword = (value) => {
    if (!value) {
      return "Password is required";
    }
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError("");
  };

  const handleEmailBlur = () => {
    setEmailError(validateEmail(email));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError("");
  };

  const handlePasswordBlur = () => {
    setPasswordError(validatePassword(password));
  };

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
            className={`modal__input ${emailError ? "modal__input_error" : ""}`}
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            required
          />
          {emailError && <span className="modal__error">{emailError}</span>}
        </label>
        <label className="modal__label">
          <span className="modal__label-text">Password</span>
          <input
            type="password"
            className={`modal__input ${
              passwordError ? "modal__input_error" : ""
            }`}
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            required
          />
          {passwordError && (
            <span className="modal__error">{passwordError}</span>
          )}
        </label>
      </form>
    </ModalWithForm>
  );
}

export default LoginModal;
