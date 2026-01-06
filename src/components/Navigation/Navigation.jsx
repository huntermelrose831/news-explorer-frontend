import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import logoutwhite from "../../assets/logout.svg";
import logoutblack from "../../assets/Unionblack.svg";
import closeIcon from "../../assets/close.svg";
import menuIcon from "../../assets/menu.svg";
import { useAuth } from "../../contexts/AuthContext";
import "./Navigation.css";

function Navigation() {
  const location = useLocation();
  const { isLoggedIn, currentUser, handleLogout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Switch from login to register modal
  const switchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  // Switch from register to login modal
  const switchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  // Close all modals
  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Get user display name - prefer username over email
  const getUserDisplayName = () => {
    if (currentUser?.username) {
      return currentUser.username;
    } else if (currentUser?.email) {
      return currentUser.email;
    }
    return "User"; // fallback
  };

  // Check if current path is active
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const handleSignInClick = () => {
    setIsLoginModalOpen(true);
    closeMobileMenu();
  };

  return (
    <>
      <nav className="navigation">
        <Link to="/" className="navigation__logo">
          NewsExplorer
        </Link>

        {/* Hamburger menu button for mobile */}
        <button
          className={`navigation__hamburger ${
            isMobileMenuOpen ? "navigation__hamburger_active" : ""
          } ${
            isLoginModalOpen || isRegisterModalOpen
              ? "navigation__hamburger_hidden"
              : ""
          }`}
          onClick={toggleMobileMenu}
          type="button"
          aria-label="Toggle menu"
        >
          <img
            src={menuIcon}
            alt="Menu"
            className="navigation__hamburger-icon"
          />
        </button>

        <ul
          className={`navigation__menu ${
            isMobileMenuOpen ? "navigation__menu_active" : ""
          }`}
        >
          {/* Mobile menu header - only visible on mobile */}
          <div className="navigation__mobile-header">
            <Link
              to="/"
              className="navigation__mobile-logo"
              onClick={closeMobileMenu}
            >
              NewsExplorer
            </Link>
            <button
              className="navigation__close-button"
              onClick={closeMobileMenu}
              type="button"
              aria-label="Close menu"
            >
              <img
                src={closeIcon}
                alt="close"
                className="navigation__close-icon"
              />
            </button>
          </div>

          {/* Home link - always visible */}
          <li>
            <Link
              to="/"
              className={`navigation__link ${
                isActiveLink("/") ? "navigation__link_active" : ""
              }`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
          </li>

          {/* Saved articles - only show when logged in */}
          {isLoggedIn && (
            <li>
              <Link
                to="/saved-news"
                className={`navigation__link ${
                  isActiveLink("/saved-news") ? "navigation__link_active" : ""
                }`}
                onClick={closeMobileMenu}
              >
                Saved articles
              </Link>
            </li>
          )}

          {/* Auth button */}
          <li>
            {isLoggedIn ? (
              <button
                className="navigation__button navigation__button_logged-in"
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                type="button"
              >
                <span className="navigation__username">
                  {getUserDisplayName()}
                </span>
                <span className="navigation__logout-icon">
                  <img
                    src={logoutwhite}
                    alt="logout icon"
                    className="navigation__icon-white"
                  />
                  <img
                    src={logoutblack}
                    alt="logout icon"
                    className="navigation__icon-black"
                  />
                </span>
              </button>
            ) : (
              <button
                className="navigation__button"
                onClick={handleSignInClick}
                type="button"
              >
                Sign in
              </button>
            )}
          </li>
        </ul>
      </nav>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeModals}
        onSwitchToRegister={switchToRegister}
      />

      {/* Register Modal */}
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeModals}
        onSwitchToLogin={switchToLogin}
      />
    </>
  );
}

export default Navigation;

// TODO: Add mobile menu functionality
// TODO: Consider adding keyboard navigation support
