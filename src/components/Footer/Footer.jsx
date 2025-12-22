import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2025 Hunter Melrose, Powered by News API</p>
      <nav className="footer__links">
        <Link to="/" className="footer__link">
          Home
        </Link>
        <a
          href="https://tripleten.com"
          className="footer__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Practicum by Yandex
        </a>
      </nav>
    </footer>
  );
}

export default Footer;
