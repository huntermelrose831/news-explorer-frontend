import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import { signUp } from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext.jsx";

function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validation function - could probably make this more robust
  const validateForm = () => {
    const validationErrors = {};

    // Email validation
    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = "Invalid email address";
    }

    // Password validation - maybe add more requirements later
    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    // Username validation
    if (!username.trim()) {
      validationErrors.username = "Username is required";
    } else if (username.length < 2) {
      validationErrors.username = "Username must be at least 2 characters";
    }

    return validationErrors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields first
    const validationErrors = validateForm();
    setErrors(validationErrors);

    // Don't submit if there are validation errors
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await signUp(email, password, username);

      // If signup successful, show success message (don't auto-login)
      resetForm();
      setIsSuccess(true);
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ submit: "Registration failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to reset form fields
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setErrors({});
  };

  // Clear specific field error when user starts typing
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      const updatedErrors = { ...errors };
      delete updatedErrors.email;
      setErrors(updatedErrors);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      const updatedErrors = { ...errors };
      delete updatedErrors.password;
      setErrors(updatedErrors);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (errors.username) {
      const updatedErrors = { ...errors };
      delete updatedErrors.username;
      setErrors(updatedErrors);
    }
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign up"
      buttonText={isSubmitting ? "Creating account..." : "Sign up"}
      isRegister={true}
      isSuccessModal={isSuccess}
      onSubmit={handleFormSubmit}
      isSubmitting={isSubmitting}
      showSubmit={!isSuccess}
    >
      {isSuccess ? (
        <div className="register-success">
          <h3 className="register-success__title">
            Registration successfully completed!
          </h3>
          <button
            type="button"
            className="modal__link register-success__link"
            onClick={() => {
              onClose();
              onSwitchToLogin();
            }}
          >
            Sign in
          </button>
        </div>
      ) : (
        <div className="modal__form">
          {/* Email field */}
          <label className="modal__label">
            <span className="modal__label-text">Email</span>
            <input
              type="email"
              className={`modal__input ${
                errors.email ? "modal__input_error" : ""
              }`}
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
              disabled={isSubmitting}
              required
            />
            {errors.email && (
              <span className="modal__error">{errors.email}</span>
            )}
          </label>

          {/* Password field */}
          <label className="modal__label">
            <span className="modal__label-text">Password</span>
            <input
              type="password"
              className={`modal__input ${
                errors.password ? "modal__input_error" : ""
              }`}
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
              disabled={isSubmitting}
              required
              minLength="6"
            />
            {errors.password && (
              <span className="modal__error">{errors.password}</span>
            )}
          </label>

          {/* Username field */}
          <label className="modal__label">
            <span className="modal__label-text">Username</span>
            <input
              type="text"
              className={`modal__input ${
                errors.username ? "modal__input_error" : ""
              }`}
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
              disabled={isSubmitting}
              required
            />
            {errors.username && (
              <span className="modal__error">{errors.username}</span>
            )}
          </label>

          {/* Show general error message if registration fails */}
          {errors.submit && (
            <div className="modal__submit-error">
              <span className="modal__error">{errors.submit}</span>
            </div>
          )}
        </div>
      )}
    </ModalWithForm>
  );
}

export default RegisterModal;

// TODO: Add password confirmation field
// TODO: Add show/hide password functionality
// TODO: Maybe add username availability check
