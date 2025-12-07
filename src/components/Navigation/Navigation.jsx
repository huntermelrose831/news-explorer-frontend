import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import "./Navigation.css";
function Navigation() {
  const location = useLocation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleSwitchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };
  return (
    <>
      <nav className="navigation">
        <Link to="/" className="navigation__logo">
          NewsExplorer
        </Link>
        <ul className="navigation__menu">
          <li>
            <Link to="/" className="navigation__link">
              Home
            </Link>
          </li>

          <li>
            <button
              className="navigation__button"
              onClick={() => setIsLoginOpen(true)}
            >
              Sign in
            </button>
          </li>
        </ul>
      </nav>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
}

export default Navigation;
