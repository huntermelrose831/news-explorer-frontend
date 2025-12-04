import "./Header.css";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";

function Header({ onSearch }) {
  return (
    <header className="header">
      <Navigation />
      <SearchForm onSearch={onSearch} />
    </header>
  );
}

export default Header;
