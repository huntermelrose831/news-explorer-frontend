import { useState, useEffect } from "react";
import { searchNews, getSavedArticles } from "../../utils/api";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import NewsCard from "../NewsCard/NewsCard";
import About from "../About/About";
import Footer from "../Footer/Footer";
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
  const handleSearch = async (keyword) => {
    setIsLoading(true);
    setError("");
    setHasSearched(true);
    setVisibleCount(3);

    try {
      const data = await searchNews(keyword);
      if (data.articles && data.articles.length > 0) {
        // Annotate articles with saved info from local storage and include the search keyword
        const saved = await getSavedArticles();
        const annotated = data.articles.map((a) => {
          const match = saved.find((s) => s.url === a.url);
          // include the keyword used for this search so it can be saved along with the article
          const base = { ...a, searchKeyword: keyword };
          return match
            ? {
                ...base,
                _id: match._id,
                isSaved: true,
                keywords: match.keywords || [],
              }
            : base;
        });
        setArticles(annotated);
        setDisplayedArticles(annotated.slice(0, 3));
      } else {
        setArticles([]);
        setDisplayedArticles([]);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError(
        "Sorry, something went wrong during the request. Please try again later."
      );
      setArticles([]);
      setDisplayedArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowMore = () => {
    const newCount = visibleCount + 3;
    setVisibleCount(newCount);
    setDisplayedArticles(articles.slice(0, newCount));
  };

  // listen for savedArticlesChanged events so searches update automatically
  useEffect(() => {
    const handler = async () => {
      const saved = await getSavedArticles();
      setArticles((prev) =>
        prev.map((a) => {
          const match = saved.find((s) => s.url === a.url);
          return match
            ? { ...a, _id: match._id, isSaved: true }
            : { ...a, isSaved: false };
        })
      );
      setDisplayedArticles((prev) =>
        prev.map((a) => {
          const match = saved.find((s) => s.url === a.url);
          return match
            ? { ...a, _id: match._id, isSaved: true }
            : { ...a, isSaved: false };
        })
      );
    };

    window.addEventListener("savedArticlesChanged", handler);
    return () => window.removeEventListener("savedArticlesChanged", handler);
  }, []);

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
          <svg
            className="main__nothing-found__icon"
            viewBox="0 0 64 64"
            aria-hidden="true"
          >
            <circle
              cx="32"
              cy="32"
              r="30"
              fill="none"
              stroke="#c8cdd0"
              strokeWidth="2"
            />
            <path
              d="M22 38c2.667-3.333 6.667-5 12-5s9.333 1.667 12 5"
              stroke="#c8cdd0"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
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
              <NewsCard
                key={index}
                article={article}
                isSaved={article.isSaved}
                onSave={(savedArticle) => {
                  // update articles to mark this article as saved
                  setArticles((prev) =>
                    prev.map((p) =>
                      p.url === savedArticle.url
                        ? { ...p, _id: savedArticle._id, isSaved: true }
                        : p
                    )
                  );
                  setDisplayedArticles((prev) =>
                    prev.map((p) =>
                      p.url === savedArticle.url
                        ? { ...p, _id: savedArticle._id, isSaved: true }
                        : p
                    )
                  );
                }}
                onDelete={(articleId) => {
                  // update articles to unmark the saved article
                  setArticles((prev) =>
                    prev.map((p) =>
                      p._id === articleId
                        ? { ...p, isSaved: false, _id: undefined }
                        : p
                    )
                  );
                  setDisplayedArticles((prev) =>
                    prev.map((p) =>
                      p._id === articleId
                        ? { ...p, isSaved: false, _id: undefined }
                        : p
                    )
                  );
                }}
              />
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
      <Footer />
    </main>
  );
}

export default Main;
