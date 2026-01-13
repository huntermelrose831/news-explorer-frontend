import "./Header.css";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";

function Header({ onSearch, showSearch = true }) {
  const headerClass = `header ${showSearch ? "" : "header--compact"}`;

  return (
    <header className={headerClass}>
      <Navigation />
      {showSearch && <SearchForm onSearch={onSearch} />}
    </header>
  );
}

export default Header;
