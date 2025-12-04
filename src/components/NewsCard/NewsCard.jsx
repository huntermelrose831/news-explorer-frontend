import "./NewsCard.css";
import BookMark from "../../assets/bookmark.svg";
function NewsCard({ article }) {
  const { title, text, date, source, url, image } = article || {};

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <article className="news__card">
      <div className="news__card_image-container">
        <img
          src={image || "https://via.placeholder.com/400x272"}
          alt={title}
          className="news__card_image"
        />
        <button className="news__card_save-button" aria-label="Save article">
          <img
            src={BookMark}
            alt="save card button"
            className="news__card_save-image"
          />
        </button>
      </div>
      <div className="news__card-content">
        <p className="news__card_date">
          {date ? formatDate(date) : "November 4, 2020"}
        </p>
        <h3 className="news__card_title">
          {title || "Everyone Needs a Special 'Sit Spot' in Nature"}
        </h3>
        <p className="news__card_text">
          {text || "Ever since I read Richard Louv's influential book..."}
        </p>
        <p className="news__card_source">{source || "Treehugger"}</p>
      </div>
    </article>
  );
}

export default NewsCard;
