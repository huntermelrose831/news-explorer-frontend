import { useState, useEffect } from "react";
import "./SavedNews.css";
import NewsCard from "../NewsCard/NewsCard";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
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

  // Handle article deletion
  const handleDeleteArticle = (articleId) => {
    // Optimistically update UI - remove article immediately
    const updatedArticles = savedArticles.filter(
      (article) => article._id !== articleId
    );
    setSavedArticles(updatedArticles);

    // TODO: Also call deleteArticle API here to remove from backend
  };

  // Get unique keywords from saved articles - might be useful for categorization
  const extractKeywords = () => {
    if (!savedArticles || savedArticles.length === 0) return [];

    const keywordList = savedArticles
      .map((article) => article.keyword || "General") // Default to "General" if no keyword
      .filter((keyword, index, array) => array.indexOf(keyword) === index); // Remove duplicates

    return keywordList.slice(0, 3); // Show only first 3 keywords
  };

  const keywords = extractKeywords();
  const additionalKeywordsCount = keywords.length > 3 ? keywords.length - 3 : 0;

  return (
    <>
      <Header />
      <main className="saved-news">
        <section className="saved-news__header">
          <p className="saved-news__subtitle">Saved articles</p>
          <h1 className="saved-news__title">
            {isLoading
              ? "Loading your saved articles..."
              : error
              ? "Error loading articles"
              : `You have ${savedArticles.length} saved article${
                  savedArticles.length !== 1 ? "s" : ""
                }`}
          </h1>

          {/* Show keywords summary if we have saved articles */}
          {!isLoading && !error && keywords.length > 0 && (
            <p className="saved-news__keywords">
              By keywords:{" "}
              <span className="saved-news__keywords-bold">
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
          <div className="saved-news__error">
            <p className="saved-news__error-text">{error}</p>
          </div>
        )}

        {/* Display saved articles if we have any */}
        {!isLoading && !error && savedArticles.length > 0 && (
          <section className="news-cards">
            <div className="news-cards__list">
              {savedArticles.map((article, idx) => (
                <NewsCard
                  key={article._id || `saved-article-${idx}`} // Fallback key just in case
                  article={article}
                  isSaved={true}
                  onDelete={handleDeleteArticle}
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty state when no articles are saved */}
        {!isLoading && !error && savedArticles.length === 0 && (
          <div className="saved-news__empty">
            <p className="saved-news__empty-text">
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
