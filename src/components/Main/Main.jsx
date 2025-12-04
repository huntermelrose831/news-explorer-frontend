import { useState } from "react";
import "./Main.css";
import NewsCard from "../NewsCard/NewsCard";
import About from "../About/About";
import { mockNewsData } from "../../utils/constants";
import Header from "../Header/Header";

function Main() {
  const [hasSearched, setHasSearched] = useState(false);
  const [newsResults, setNewsResults] = useState([]);

  // This will be triggered when search is performed
  const handleSearch = () => {
    setHasSearched(true);
    setNewsResults(mockNewsData);
  };

  return (
    <main className="main">
      <Header onSearch={handleSearch} />
      {hasSearched && newsResults.length > 0 && (
        <section className="news__cards">
          <h2 className="news__cards_title">Search results</h2>
          <div className="news__cards_list">
            {newsResults.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
          <button className="news__cards_show-more">Show more</button>
        </section>
      )}
      <About />
    </main>
  );
}

export default Main;
