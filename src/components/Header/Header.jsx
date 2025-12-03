import "./Header.css";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
function Header() {
  return (
    <header className="header">
      <Navigation /> <SearchForm />
    </header>
  );
}

export default Header;
