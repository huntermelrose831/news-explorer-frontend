import { useState, useEffect } from "react";
import "./SavedNews.css";
import NewsCard from "../NewsCard/NewsCard";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { getSavedArticles } from "../../utils/api";

function SavedNews() {
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Added error handling

  // Load saved articles when component mounts
  useEffect(() => {
    const loadSavedArticles = async () => {
      try {
        setIsLoading(true);
        const articles = await getSavedArticles();
        setSavedArticles(articles);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Failed to load saved articles:", err);
        setError("Failed to load saved articles. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedArticles();
  }, []);

  // Listen for savedArticlesChanged events so this page updates when saves happen elsewhere
  useEffect(() => {
    const handler = async () => {
      try {
        const articles = await getSavedArticles();
        setSavedArticles(articles);
      } catch (err) {
        console.error("Failed to refresh saved articles:", err);
      }
    };
    window.addEventListener("savedArticlesChanged", handler);
    return () => window.removeEventListener("savedArticlesChanged", handler);
  }, []);

  // Handle article deletion
  const handleDeleteArticle = (articleId) => {
    const updatedArticles = savedArticles.filter(
      (article) => article._id !== articleId
    );
    setSavedArticles(updatedArticles);

    // Actual deletion is handled by the NewsCard which calls deleteArticle.
    // We listen for 'savedArticlesChanged' events to keep the UI in sync across views.
  };

  // Extract unique keywords from saved articles (keywords array stored per saved article)
  const allKeywords = Array.from(
    new Set(savedArticles.flatMap((article) => article.keywords || []))
  );

  const keywords = allKeywords.slice(0, 3);
  const additionalKeywordsCount = Math.max(0, allKeywords.length - 3);

  // Get current user from auth context so we can show their name in the title
  const { currentUser } = useAuth();
  const displayName = currentUser?.username || currentUser?.email || null;

  return (
    <>
      <Header showSearch={false} />
      <main className="saved__news">
        <section className="saved__news_header">
          <p className="saved__news_subtitle">Saved articles</p>
          <h1 className="saved__news_title">
            {isLoading
              ? "Loading your saved articles..."
              : error
              ? "Error loading articles"
              : `${displayName ? `${displayName}, ` : ""}you have ${
                  savedArticles.length
                } saved article${savedArticles.length !== 1 ? "s" : ""}`}
          </h1>

          {/* Show keywords summary if we have saved articles */}
          {!isLoading && !error && keywords.length > 0 && (
            <p className="saved__news_keywords">
              By keywords:{" "}
              <span className="saved__news_keywords-bold">
                {keywords.join(", ")}
                {additionalKeywordsCount > 0 &&
                  `, and ${additionalKeywordsCount} other${
                    additionalKeywordsCount > 1 ? "s" : ""
                  }`}
              </span>
            </p>
          )}
        </section>

        {/* Show error message if there's an error */}
        {error && (
          <div className="saved__news_error">
            <p className="saved__news_error-text">{error}</p>
          </div>
        )}

        {/* Display saved articles if we have any */}
        {!isLoading && !error && savedArticles.length > 0 && (
          <section className="saved__news_cards">
            <div className="saved__news_cards-list">
              {savedArticles.map((article, idx) => (
                <NewsCard
                  key={article._id || `saved-article-${idx}`} // Fallback key just in case
                  article={article}
                  isSaved={true}
                  onDelete={handleDeleteArticle}
                  showTrash={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty state when no articles are saved */}
        {!isLoading && !error && savedArticles.length === 0 && (
          <div className="saved__news_empty">
            <p className="saved__news_empty-text">
              You haven't saved any articles yet. Start exploring and save
              interesting articles!
            </p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default SavedNews;

// Note: Consider adding a refresh button for when there are errors
// Note: Maybe add sorting options for saved articles (by date, keyword, etc.)
