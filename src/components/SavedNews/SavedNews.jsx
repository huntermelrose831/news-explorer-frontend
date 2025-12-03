import "./SavedNews.css";
import NewsCard from "../NewsCard/NewsCard";

function SavedNews() {
  return (
    <main className="saved-news">
      <section className="saved-news__header">
        <p className="saved-news__subtitle">Saved articles</p>
        <h1 className="saved-news__title">You have 5 saved articles</h1>
        <p className="saved-news__keywords">
          By keywords: Nature, Yellowstone, and 2 other
        </p>
      </section>
      <section className="news-cards">
        <div className="news-cards__list">
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </div>
      </section>
    </main>
  );
}

export default SavedNews;
