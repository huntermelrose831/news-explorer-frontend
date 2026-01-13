import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false); // Track if search is in progress

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation - make sure user actually entered something
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) {
      setError("Please enter a keyword");
      return;
    }

    // Additional validation - maybe check for minimum length
    if (trimmedKeyword.length < 2) {
      setError("Keyword must be at least 2 characters long");
      return;
    }

    // Clear any existing error and start search
    setError("");
    setIsSearching(true);

    // Call the search function passed from parent
    onSearch(trimmedKeyword);

    // Reset searching state after a bit - could be improved with proper loading handling
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setKeyword(inputValue);

    // Clear error message when user starts typing again
    if (error) {
      setError("");
    }
  };

  return (
    <form className="search__form" onSubmit={handleSubmit}>
      <h1 className="search__form_title">What's going on in the world?</h1>
      <p className="search__form_subtitle">
        Find the latest news on any topic and save them in your personal
        account.
      </p>

      <div className="search__form_input-container">
        <input
          type="text"
          className={`search__form_input ${
            error ? "search__form_input_error" : ""
          }`}
          placeholder="Enter topic"
          value={keyword}
          onChange={handleInputChange}
          disabled={isSearching} // Disable input while searching
        />
        <button
          type="submit"
          className="search__form_button"
          disabled={isSearching || !keyword.trim()} // Disable if searching or empty input
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <span className="search__form_error">{error}</span>}
    </form>
  );
}

export default SearchForm;

// TODO: Add debounced search suggestions
// TODO: Maybe add search history functionality later
