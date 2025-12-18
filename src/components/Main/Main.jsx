import { useState } from "react";
import { searchNews } from "../../utils/api";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import NewsCard from "../NewsCard/NewsCard";
import About from "../About/About";
import "./Main.css";

function Main() {
  // ================== State ==================
  const [articles, setArticles] = useState([]);
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);

  // ================== Handlers ==================
  const handleSearch = (keyword) => {
    setIsLoading(true);
    setError("");
    setHasSearched(true);
    setVisibleCount(3);

    searchNews(keyword)
      .then((data) => {
        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles);
          setDisplayedArticles(data.articles.slice(0, 3));
        } else {
          setArticles([]);
          setDisplayedArticles([]);
        }
      })
      .catch((err) => {
        console.error("Search error:", err);
        setError(
          "Sorry, something went wrong during the request. Please try again later."
        );
        setArticles([]);
        setDisplayedArticles([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleShowMore = () => {
    const newCount = visibleCount + 3;
    setVisibleCount(newCount);
    setDisplayedArticles(articles.slice(0, newCount));
  };

  // ================== Render ==================
  return (
    <main className="main">
      <Header onSearch={handleSearch} />

      {/* Loading state */}
      {isLoading && <Preloader />}

      {/* Error state */}
      {!isLoading && hasSearched && error && (
        <div className="main__error">
          <p className="main__error-text">{error}</p>
        </div>
      )}

      {/* Nothing found state */}
      {!isLoading && hasSearched && !error && articles.length === 0 && (
        <div className="main__nothing-found">
          <svg className="main__nothing-found__icon" viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="30" fill="none" stroke="#c8cdd0" strokeWidth="2" />
            <path d="M22 38c2.667-3.333 6.667-5 12-5s9.333 1.667 12 5" stroke="#c8cdd0" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="24" cy="26" r="2" fill="#c8cdd0" />
            <circle cx="40" cy="26" r="2" fill="#c8cdd0" />
          </svg>
          <h2 className="main__nothing-found-title">Nothing found</h2>
          <p className="main__nothing-found-text">
            Sorry, but nothing matched your search terms.
          </p>
        </div>
      )}

      {/* Results */}
      {!isLoading && displayedArticles.length > 0 && (
        <section className="news-cards">
          <h2 className="news-cards__title">Search results</h2>
          <div className="news-cards__list">
            {displayedArticles.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>
          {visibleCount < articles.length && (
            <button
              className="news-cards__show-more"
              onClick={handleShowMore}
              type="button"
            >
              Show more
            </button>
          )}
        </section>
      )}

      <About />
    </main>
  );
}

export default Main;
