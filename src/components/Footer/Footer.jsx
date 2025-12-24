import { Link } from "react-router-dom";
import "./Footer.css";
import LinkedIn from "../../assets/LinkedIn.png";
import GitHub from "../../assets/github.png";
function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © 2025 Hunter Melrose, Powered by News API
      </p>
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
          TripleTen
        </a>
        <a
          href="https://github.com/huntermelrose831"
          className="footer__social"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github"
        >
          <img src={GitHub} alt="GitHub" className="footer__icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/huntermelrose831/"
          className="footer__social"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <img src={LinkedIn} alt="LinkedIn" className="footer__icon" />
        </a>
      </nav>
    </footer>
  );
}

export default Footer;
