import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";
import { signIn } from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext.jsx";

function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
  // ================== Local State ==================
  // These keep track of what the user types and how the form behaves
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pull in the login handler from our global auth context
  const { handleLogin } = useAuth();

  // ================== Validation Helpers ==================
  // Simple checks to make sure the user gives us valid input
  const validateEmail = (value) => {
    if (!value) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Invalid email address";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    return "";
  };

  // ================== Form Submission ==================
  const handleSubmit = (e) => {
    e.preventDefault();

    // Run validation before doing anything else
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (emailErr || passwordErr) return;

    setIsSubmitting(true);

    // Try to log the user in
    signIn(email, password)
      .then(({ user, token }) => {
        handleLogin(user, token);

        onClose();
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.error("Login error:", err);
        setPasswordError("Login failed. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // ================== Input Handlers ==================
  // Clear errors as soon as the user starts fixing them
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError("");
  };

  // ================== Render ==================
  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign in"
      buttonText={isSubmitting ? "Signing in..." : "Sign in"}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      linkText={
        <p className="modal__link-text">
          or{" "}
          <button
            type="button"
            className="modal__link"
            onClick={onSwitchToRegister}
            disabled={isSubmitting}
          >
            Sign up
          </button>
        </p>
      }
    >
      <div className="modal__form">
        {/* Email field */}
        <label className="modal__label">
          <span className="modal__label-text">Email</span>
          <input
            type="email"
            className={`modal__input ${emailError ? "modal__input_error" : ""}`}
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
            disabled={isSubmitting}
            required
          />
          {emailError && <span className="modal__error">{emailError}</span>}
        </label>

        {/* Password field */}
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
            disabled={isSubmitting}
            required
          />
          {passwordError && (
            <span className="modal__error">{passwordError}</span>
          )}
        </label>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
