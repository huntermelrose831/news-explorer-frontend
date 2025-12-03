import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import "./Navigation.css";
function Navigation() {
  const location = useLocation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
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
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}

export default Navigation;
