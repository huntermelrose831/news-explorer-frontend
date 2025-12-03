import "./NewsCard.css";

function NewsCard() {
  return (
    <article className="news-card">
      <img
        src="https://via.placeholder.com/400x200"
        alt="News"
        className="news-card__image"
      />
      <div className="news-card__content">
        <p className="news-card__date">November 4, 2020</p>
        <h3 className="news-card__title">
          Everyone Needs a Special 'Sit Spot' in Nature
        </h3>
        <p className="news-card__text">
          Ever since I read Richard Louv's influential book...
        </p>
        <p className="news-card__source">Treehugger</p>
      </div>
      <button className="news-card__save-button">Save</button>
    </article>
  );
}

export default NewsCard;
