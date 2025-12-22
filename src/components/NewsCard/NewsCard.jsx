import { useState, useEffect } from "react";
import "./NewsCard.css";

import BookMark from "../../assets/bookmark.png";
import BookMarkBlue from "../../assets/bookmarkblue.png";
import Trash from "../../assets/trash.png";

import { useAuth } from "../../contexts/AuthContext";
import { saveArticle, deleteArticle } from "../../utils/api";

function NewsCard({
  article,
  isSaved: initialIsSaved,
  onSave,
  onDelete,
  showTrash = false,
}) {
  const { isLoggedIn } = useAuth();

  const [isSaved, setIsSaved] = useState(initialIsSaved || false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [articleId, setArticleId] = useState(article?._id);

  // Keep internal state synced with parent props
  useEffect(() => {
    setIsSaved(Boolean(initialIsSaved));
    setArticleId(article?._id);
  }, [initialIsSaved, article?._id]);

  const { title, description, publishedAt, source, url, urlToImage } =
    article || {};

  // Support both object-style source ({ name }) and string-style source ("Source Name")
  const sourceName = typeof source === "string" ? source : source?.name;

  // Format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Decide which icon to show
  const getSaveIcon = () => {
    if (!isSaved) return BookMark;
    return showTrash ? Trash : BookMarkBlue;
  };

  // Decide tooltip text
  const getTooltipText = () => {
    if (!isLoggedIn) return "Sign in to save articles";
    if (!isSaved) return "Save article";
    return showTrash ? "Remove from saved" : "Saved";
  };

  // Save or unsave article
  const handleSaveClick = async () => {
    if (!isLoggedIn) return;

    try {
      if (isSaved) {
        await deleteArticle(articleId);
        setIsSaved(false);
        onDelete?.(articleId);
        return;
      }

      const articleToSave = {
        title,
        description,
        publishedAt,
        source: source?.name,
        url,
        urlToImage,
        // Pass the search keyword along so the mock backend stores it
        searchKeyword: article?.searchKeyword,
      };

      const saved = await saveArticle(articleToSave);
      setIsSaved(true);
      setArticleId(saved._id);
      onSave?.(saved);
    } catch (err) {
      console.error("Error saving/deleting article:", err);
    }
  };

  const openArticle = () => {
    if (url) window.open(url, "_blank", "noopener");
  };

  return (
    <article
      className="news__card"
      onClick={openArticle}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && openArticle()}
    >
      <div className="news__card_image-container">
        <img
          src={urlToImage || "https://placehold.co/400x272"}
          alt={title}
          className="news__card_image"
        />

        {/* Keyword badge (only shown on saved articles / saved page via showTrash) */}
        {showTrash && article?.keywords && article.keywords.length > 0 && (
          <div className="news__card_keyword">{article.keywords[0]}</div>
        )}

        <div
          className="news__card_save-button-container"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <button
            className={`news__card_save-button ${
              isSaved ? "news__card_save-button_active" : ""
            }`}
            aria-label={getTooltipText()}
            onClick={(e) => {
              e.stopPropagation();
              handleSaveClick();
            }}
          >
            <img
              src={getSaveIcon()}
              alt={getTooltipText()}
              className="news__card_save-image"
            />
          </button>

          {showTooltip && (
            <div className="news__card_tooltip">{getTooltipText()}</div>
          )}
        </div>
      </div>

      <div className="news__card-content">
        <p className="news__card_date">{formatDate(publishedAt)}</p>
        <h3 className="news__card_title">{title || "No title available"}</h3>
        <p className="news__card_text">
          {description || "No description available"}
        </p>
        <p className="news__card_source">{sourceName || "Unknown source"}</p>
      </div>
    </article>
  );
}

export default NewsCard;
