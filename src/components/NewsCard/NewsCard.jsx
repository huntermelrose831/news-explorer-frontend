import { useState } from "react";
import "./NewsCard.css";
import BookMark from "../../assets/bookmark.svg";
import { useAuth } from "../../contexts/AuthContext";
import { saveArticle, deleteArticle } from "../../utils/api";

function NewsCard({ article, isSaved: initialIsSaved, onSave, onDelete }) {
  const { isLoggedIn } = useAuth();
  const [isSaved, setIsSaved] = useState(initialIsSaved || false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [articleId, setArticleId] = useState(article?._id);

  const { title, description, publishedAt, source, url, urlToImage } =
    article || {};

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleSaveClick = () => {
    if (!isLoggedIn) {
      return; // Tooltip will show on hover
    }

    if (isSaved) {
      // Unsave the article
      deleteArticle(articleId)
        .then(() => {
          setIsSaved(false);
          if (onDelete) onDelete(articleId);
        })
        .catch((err) => console.error("Error deleting article:", err));
    } else {
      // Save the article
      const articleToSave = {
        title,
        description,
        publishedAt,
        source: source?.name,
        url,
        urlToImage,
      };

      saveArticle(articleToSave)
        .then((savedArticle) => {
          setIsSaved(true);
          setArticleId(savedArticle._id);
          if (onSave) onSave(savedArticle);
        })
        .catch((err) => console.error("Error saving article:", err));
    }
  };

  const openArticle = () => {
    if (!url) return;
    window.open(url, "_blank", "noopener");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") openArticle();
  };

  return (
    <article
      className="news__card"
      onClick={openArticle}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="news__card_image-container">
        <img
          src={urlToImage || "https://placehold.co/400x272"}
          alt={title}
          className="news__card_image"
        />

        <div
          className="news__card_save-button-container"
          onMouseEnter={() => !isLoggedIn && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <button
            className={`news__card_save-button ${
              isSaved ? "news__card_save-button_active" : ""
            }`}
            aria-label="Save article"
            onClick={(e) => {
              e.stopPropagation();
              handleSaveClick();
            }}
          >
            <img
              src={BookMark}
              alt="save card button"
              className="news__card_save-image"
            />
          </button>

          {showTooltip && (
            <div className="news__card_tooltip">Sign in to save articles</div>
          )}
        </div>
      </div>

      <div className="news__card-content">
        <p className="news__card_date">
          {publishedAt ? formatDate(publishedAt) : "November 4, 2020"}
        </p>
        <h3 className="news__card_title">
          {title || "Everyone Needs a Special 'Sit Spot' in Nature"}
        </h3>
        <p className="news__card_text">
          {description ||
            "Ever since I read Richard Louv's influential book..."}
        </p>
        <p className="news__card_source">{source?.name || "Treehugger"}</p>
      </div>
    </article>
  );
}

export default NewsCard;
